const { Review, User, Product, Comment } = require('../models');
const aws = require('aws-sdk');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

aws.config.update({
  accessKeyId: process.env.AWS_S3_KEY_ID,
  secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

const s3 = new aws.S3();

const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/reviews');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: localStorage,
  limits: { fileSize: 10 * 1024 * 1024 }
}).fields([{ name: 'rev_img', maxCount: 3 }, { name: 'rev_authImg', maxCount: 3 }]);

exports.uploadImages = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const imageUrls = req.files.map(file => `http://localhost:8080/uploads/reviews/${file.filename}`);
    console.log(imageUrls, file.filename);
    res.json({ urls: imageUrls });
  });
};


exports.main = async (req, res, next) => {
  try {
    const title = req.query.title || 'all';
    const condition = title === 'all' ? {} : { rev_title: title };

    const reviews = await Review.findAll({
      where: condition,
      attributes: ['rev_idx', 'rev_createdAt', 'rev_title', 'rev_isAuth'],
      include: [
        {
          model: User,
          attributes: ['user_ID'],
          required: true
        },
        {
          model: Product,
          attributes: ['prod_name'],
        }
      ]
    });

    res.json({
      code: 200,
      message: '리뷰 목록을 성공적으로 가져왔습니다.',
      data: {
        reviews: reviews
      }
    });
  } catch (err) {
    next(err);
  }
};
exports.writeReview = (req, res, next) => {
  upload(req, res, async function (err) {
    if (err) {
      return next(err); // Handle upload errors
    }

    const { rev_title, prod_idx, rev_text, rev_rating } = req.body;
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    if (!rev_title || !prod_idx || !rev_text || !rev_rating) {
      // Delete local files if required fields are missing
      const filesToDelete = [...(req.files['rev_img'] || []), ...(req.files['rev_authImg'] || [])];
      filesToDelete.forEach(file => fs.unlinkSync(file.path));

      return res.status(400).json({
        code: 400,
        message: '필수 필드를 모두 입력해 주세요.',
        data: {}
      });
    }

    try {
      const user_idx = req.session.passport.user;
      if (!user_idx) {
        const filesToDelete = [...(req.files['rev_img'] || []), ...(req.files['rev_authImg'] || [])];
        filesToDelete.forEach(file => fs.unlinkSync(file.path));

        return res.status(403).json({
          code: 403,
          message: '리뷰 작성 권한이 없습니다. 로그인해주세요!',
          data: {}
        });
      }

      const rev_img_files = req.files['rev_img'] || [];
      const rev_authImg_files = req.files['rev_authImg'] || [];

      const uploadToS3 = (file) => {
        return new Promise((resolve, reject) => {
          const fileContent = fs.readFileSync(file.path);
          const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `reviews/${path.basename(file.path)}`,
            Body: fileContent,
            ACL: 'public-read'
          };

          s3.upload(params, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data.Location);
            }
          });
        });
      };

      const rev_img_urls = await Promise.all(rev_img_files.map(file => uploadToS3(file)));
      const rev_authImg_urls = await Promise.all(rev_authImg_files.map(file => uploadToS3(file)));

      // Delete local files after uploading to S3
      [...rev_img_files, ...rev_authImg_files].forEach(file => fs.unlinkSync(file.path));

      const rev_img = rev_img_urls.join(',');
      const rev_authImg = rev_authImg_urls.join(',');

      const newReview = await Review.create({
        rev_title,
        user_idx,
        prod_idx,
        rev_isAuth: false,
        rev_text,
        rev_createdAt: new Date(),
        rev_img,
        rev_authImg,
        rev_rating
      });

      res.json({
        code: 200,
        message: '리뷰가 성공적으로 작성되었습니다.',
        data: {
          review: newReview
        }
      });
    } catch (err) {
      console.error('새로운 리뷰 생성 에러', err);
      next(err);
    }
  });
};
exports.deleteReview = async (req, res, next) => {
 
  try {
    const user_idx = req.session.passport.user;
    const rev_idx = req.params.rev_idx;

    const review = await Review.findByPk(rev_idx);
    if (!review) {
      return res.status(404).json({
        code: 404,
        message: '리뷰를 찾을 수 없습니다.',
        data: {}
      });
    }

    if (review.user_idx !== user_idx) {
      return res.status(403).json({
        code: 403,
        message: '리뷰를 삭제할 권한이 없습니다.',
        data: {}
      });
    }

    if (review.rev_img) {
      const revImgUrls = review.rev_img.split(',');
      for (const imgUrl of revImgUrls) {
        const key = imgUrl.split('.com/')[1];
        await s3.deleteObject({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: key
        }).promise();
      }
    }

    if (review.rev_authImg) {
      const revAuthImgUrls = review.rev_authImg.split(',');
      for (const authImgUrl of revAuthImgUrls) {
        const key = authImgUrl.split('.com/')[1];
        await s3.deleteObject({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: key
        }).promise();
      }
    }

    await Comment.destroy({
      where: {
        rev_idx: rev_idx
      }
    });

    await Review.destroy({
      where: {
        rev_idx: rev_idx
      }
    });

    res.json({
      code: 200,
      message: '리뷰가 성공적으로 삭제되었습니다.',
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

exports.reviewDetails = async (req, res, next) => {
  try {
    const rev_idx = req.params.rev_idx;

    const review = await Review.findOne({
      where: { rev_idx },
      attributes: ['rev_isAuth', 'rev_text', 'rev_img', 'rev_title', 'rev_rating'],
      include: [
        {
          model: Product,
          attributes: ['prod_name'],
          required: true
        },
        {
          model: Comment,
          attributes: ['com_text', 'createdAt'],
          include: [
            {
              model: User,
              attributes: ['user_ID'],
              required: true
            }
          ]
        }
      ]
    });

    if (!review) {
      return res.status(404).json({
        code: 404,
        message: '리뷰를 찾을 수 없습니다.',
        data: {}
      });
    }

    res.json({
      code: 200,
      message: '리뷰 상세 정보를 성공적으로 가져왔습니다.',
      data: {
        review
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.writeComments = async (req, res, next) => {
  try {
    const user_idx = req.session.passport.user;
    const rev_idx = req.params.rev_idx;
    const { com_text } = req.body;

    if (!com_text) {
      return res.status(400).json({
        code: 400,
        message: '댓글 내용을 입력해 주세요.',
        data: {}
      });
    }

    const newComment = await Comment.create({
      rev_idx,
      user_idx,
      com_text,
      com_createdAt: new Date()
    });

    res.json({
      code: 200,
      message: '댓글이 성공적으로 작성되었습니다.',
      data: {
        comment: newComment
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateComments = async (req, res, next) => {
  try {
    const user_idx = req.session.passport.user;
    const rev_idx = req.params.rev_idx;
    const com_idx = req.params.com_idx;
    const { com_text } = req.body;

    if (!com_text) {
      return res.status(400).json({
        code: 400,
        message: '댓글 내용을 입력해 주세요.',
        data: {}
      });
    }

    const updatedComment = await Comment.findOne({
      where: {
        com_idx,
        rev_idx,
        user_idx
      }
    });

    if (!updatedComment) {
      return res.status(404).json({
        code: 404,
        message: '해당하는 리뷰 댓글을 찾을 수 없습니다.',
        data: {}
      });
    }

    updatedComment.com_text = com_text;
    await updatedComment.save();

    res.json({
      code: 200,
      message: '댓글이 성공적으로 수정되었습니다.',
      data: {
        comment: updatedComment
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteComments = async (req, res, next) => {
  try {
    const user_idx = req.session.passport.user;
    const com_idx = req.params.com_idx;
    const rev_idx = req.params.rev_idx;

    const comment = await Comment.findOne({
      where: {
        com_idx,
        rev_idx
      }
    });

    if (!comment) {
      return res.status(404).json({
        code: 404,
        message: '댓글을 찾을 수 없습니다.',
        data: {}
      });
    }

    if (comment.user_idx !== user_idx) {
      return res.status(403).json({
        code: 403,
        message: '댓글을 삭제할 권한이 없습니다.',
        data: {}
      });
    }

    await Comment.destroy({
      where: {
        com_idx,
        rev_idx,
        user_idx
      }
    });

    res.json({
      code: 200,
      message: '댓글이 성공적으로 삭제되었습니다.',
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
