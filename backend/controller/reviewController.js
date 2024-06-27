const {Review, User, Product, Comment} = require('../models');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');

//이미지 업로드 구현을 위한 설정 불러오기
dotenv.config();

//AWS 루트 계정 로그인.
aws.config.update({
  accessKeyId: process.env.AWS_S3_KEY_ID,
  secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

const s3 = new aws.S3();

//이미지 업로드 multer 설정하기
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    acl: 'public-read', // 파일 접근 권한 설정(공개)
    key: function(req, file, cb) {
      cb(null, 'reviews/' + Date.now() + '-' + file.originalname); // 파일 이름 설정
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 } // 파일 크기 제한 (10MB)
}).fields([{ name: 'rev_img', maxCount: 3 }, { name: 'rev_authImg', maxCount: 3 }]);

//reviews 게시판 페이지. 리뷰 조회, 리뷰 검색 등의 기능을 수행한다.
exports.main = async (req,res,next) => {
  //reviews 테이블의 rev_idx(리뷰 인덱스), rev_date(작성일), rev_title(리뷰 제목), rev_isAuth(인증 여부),
  //reviews 테이블의 user_idx에 해당하는 users 테이블의 user_ID(유저 아이디),
  //reviews 테이블의 prod_idx에 해당하는 products 테이블의 prod_name(제품명)
  try{
    //리뷰 제목 검색하기. default 값은 all
    const title = req.query.title || 'all';

    //검색 조건
    const condition = title==='all'?{}:{rev_title : title};

    //리뷰 목록 가져오기
    const reviews = await Review.findAll({
      where: condition,
      attributes:['rev_idx', 'rev_createdAt', 'rev_title', 'rev_isAuth'],
      include: [
        {
          model: User,
          attributes: ['user_ID'],
          required: true // user_idx에 해당하는 user가 없는 경우 제외
        },
        {
          model: Product,
          attributes: ['prod_name'],
        }
      ]
    })
    // 요청이 성공한 경우
    res.json({
      code: 200,
      message: '리뷰 목록을 성공적으로 가져왔습니다.',
      data: {
        reviews: reviews
      }
    });
  }catch(err){
    next(err);
  }
}

// 리뷰 작성하기
exports.writeReview = (req, res, next) => {
  upload(req, res, async function (err) {
    if (err) {
      return next(err); // 오류가 발생한 경우, 다음 미들웨어로 전달합니다.
    }

    try {
      const user_idx = req.session.passport.user;
      if(!user_idx){
        return res.status(403).json({
          code: 403,
          message: '리뷰 작성 권한이 없습니다. 로그인해주세요!',
          data: {}
        });
      }
      const { rev_title, prod_idx, rev_text, rev_rating } = req.body;
      console.log(rev_title, rev_text, prod_idx, rev_rating);
      // 필수 데이터 검사
      if (!rev_title || !prod_idx || !rev_text || !rev_rating) {
        return res.status(400).json({
          code: 400,
          message: '필수 필드를 모두 입력해 주세요.',
          data: {}
        });
      }

      // 업로드된 이미지의 URL 가져오기
      const rev_img_urls = req.files['rev_img'] ? req.files['rev_img'].map(file => file.location) : [];
      const rev_authImg_urls = req.files['rev_authImg'] ? req.files['rev_authImg'].map(file => file.location) : [];

      // 쉼표로 구분된 문자열로 결합
      const rev_img = rev_img_urls.join(',');
      const rev_authImg = rev_authImg_urls.join(',');

      // 새로운 리뷰 생성
      const newReview = await Review.create({
        rev_title,
        user_idx,
        prod_idx,
        rev_isAuth: false, // 기본값
        rev_text,
        rev_createdAt: new Date(), // 현재 날짜 시간
        rev_img, // 선택적 필드
        rev_authImg, // 필수 필드
        rev_rating
      });

      // 요청 성공
      res.json({
        code: 200,
        message: '리뷰가 성공적으로 작성되었습니다.',
        data: {
          review: newReview
        }
      });
    } catch (err) {
      console.error('새로운 리뷰 생성 에러', err);
      next(err); // 오류가 발생한 경우, 다음 미들웨어로 전달합니다.
    }
  });
};

//review 글 삭제하기
exports.deleteReview = async(req, res, next) =>{
  try{
    //req.params를 통해 어떤 rev_idx인지 받아온다.
    //reviews 테이블 삭제(req에서 받아온 rev_idx 사용)
    const user_idx = req.session.passport.user;
    const rev_idx = req.params.rev_idx;

    //해당 리뷰를 작성한 사람이 현재 로그인된 사람인지 확인한다.

    //해당 리뷰가 있는지 확인한다.
    const review = await Review.findByPk(rev_idx);
    if(!review){
      return res.status(404).json({
        code:404,
        message:'리뷰를 찾을 수 없습니다.',
        data : {}
      })
    }
  //해당 리뷰를 작성한 사람이 현재 로그인된 사람인지 확인한다.
    if (review.user_idx !== user_idx) {
      return res.status(403).json({
        code: 403,
        message: '리뷰를 삭제할 권한이 없습니다.',
        data: {}
      });
    }

    // AWS S3에서 리뷰 이미지 삭제
    if (review.rev_img) {
      const revImgUrls = review.rev_img.split(',');
      for (const imgUrl of revImgUrls) {
        const key = imgUrl.split('.com/')[1]; // S3의 객체 키 추출
        await s3.deleteObject({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: key
        }).promise();
      }
    }

    if (review.rev_authImg) {
      const revAuthImgUrls = review.rev_authImg.split(',');
      for (const authImgUrl of revAuthImgUrls) {
        const key = authImgUrl.split('.com/')[1]; // S3의 객체 키 추출
        await s3.deleteObject({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: key
        }).promise();
      }
    }

    //comments 테이블의 rev_idx 값이 현재 rev_idx값과 같은 행 모두 삭제
    await Comment.destroy({
      where: {
        rev_idx: rev_idx
      }
    });

    // reviews 테이블에서 해당 리뷰 삭제
    await Review.destroy({
      where: {
        rev_idx: rev_idx
      }
    });
    // 요청이 성공한 경우
    res.json({
      code: 200,
      message: '리뷰가 성공적으로 삭제되었습니다.',
      data: {}
    });
  }catch(err){
    next(err);
  }
}

//리뷰 상세 페이지
exports.reviewDetails = async (req,res,next) =>{
  try{
    //파라미터로 리뷰의 인덱스를 받는다.
    const rev_idx = req.params.rev_idx;
    //rev_idx에 해당하는 리뷰의 rev_isAuth, rev_text,rev_img,rev_title,rev_rating 조회
    //rev_idx의 테이블에 attribute로 있는 prod_idx에 해당하는 product 테이블의 prod_name 조회
    //comment 테이블에 rev_idx가 현재 rev_idx와 같은 모든 행의 com_text, com_date, user_idx에 해당하는 user 테이블의 user_ID 조회.
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
        },
        {
          model: User, // Review를 작성한 사용자의 user_ID 가져오기
          attributes: ['user_ID'],
          required: true
        }
      ]
    });
    // 해당 리뷰가 없을 경우
    if (!review) {
      return res.status(404).json({
        code: 404,
        message: '리뷰를 찾을 수 없습니다.',
        data: {}
      });
    }    
    // 요청 성공
    res.json({
      code: 200,
      message: '리뷰 상세 정보를 성공적으로 가져왔습니다.',
      data: {
        review
      }
    });    
    
  }catch(err){
    next(err);
  }
}

//리뷰 댓글 작성하기
exports.writeComments = async(req,res,next)=>{
  try {
    //comments 테이블에 req.body로 넘어온 데이터를 삽입한다.
    //user id는 session에서 받아온다.
    const user_idx = req.session.passport.user;

    //review index는 req.params에 적혀있다.
    const rev_idx = req.params.rev_idx;

    const {com_text} = req.body;

    // 필수 데이터 확인
    if (!com_text) {
      return res.status(400).json({
        code: 400,
        message: '댓글 내용을 입력해 주세요.',
        data: {}
      });
    }

    // 새로운 댓글 생성
    const newComment = await Comment.create({
      rev_idx,
      user_idx,
      com_text,
      com_createdAt: new Date() // 현재 날짜 시간
    });
    //요청 성공
    res.json({
      code:200,
      message:'댓글이 성공적으로 작성되었습니다.',
      data:{
        comment : newComment
      }
    })
  } catch (err) {
    next(err);
  }
}

//리뷰 댓글 수정하기
exports.updateComments = async (req,res,next)=>{
  try{
    const user_idx = req.session.passport.user; //로그인된 사용자가 작성한 댓글이 맞는지 확인해줄 것.
    const rev_idx = req.params.rev_idx;
    const com_idx = req.params.com_idx;
    const { com_text } = req.body;  

    // 필수 데이터 확인
    if (!com_text) {
      return res.status(400).json({
        code: 400,
        message: '댓글 내용을 입력해 주세요.',
        data: {}
      });
    }

    // 댓글 업데이트
    const updatedComment = await Comment.findOne({
      where: {
        com_idx,
        rev_idx,
        user_idx
      }
    });    

    // 해당하는 댓글이 없는 경우
    if (!updatedComment) {
      return res.status(404).json({
        code: 404,
        message: '해당하는 리뷰 댓글을 찾을 수 없습니다.',
        data: {}
      });
    }    

    // 댓글 내용 업데이트
    updatedComment.com_text = com_text;
    await updatedComment.save();    

    // 요청 성공
    res.json({
      code: 200,
      message: '댓글이 성공적으로 수정되었습니다.',
      data: {
        comment: updatedComment
      }
    });    

  }catch(err){
    next(err);
  }
}

//리뷰 댓글 삭제하기
exports.deleteComments = async(req,res,next)=>{
  try{
    const user_idx = req.session.passport.user;
    const com_idx = req.params.com_idx;
    const rev_idx = req.params.rev_idx;  

        // 댓글을 찾습니다.
    const comment = await Comment.findOne({
      where: {
        com_idx,
        rev_idx
      }
    });

    // 해당 댓글이 존재하지 않는 경우
    if (!comment) {
      return res.status(404).json({
        code: 404,
        message: '댓글을 찾을 수 없습니다.',
        data: {}
      });
    }    

    // 댓글 작성자가 현재 로그인된 사용자와 일치하는지 확인합니다.
    if (comment.user_idx !== user_idx) {
      return res.status(403).json({
        code: 403,
        message: '댓글을 삭제할 권한이 없습니다.',
        data: {}
      });
    }

    // 댓글을 삭제합니다.
    await Comment.destroy({
      where: {
        com_idx,
        rev_idx,
        user_idx
      }
    });

    // 요청이 성공한 경우
    res.json({
      code: 200,
      message: '댓글이 성공적으로 삭제되었습니다.',
      data: {}
    });
  }catch(err){
    next(err);
  }
}