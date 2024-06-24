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
  })
});

//reviews 게시판 페이지. 리뷰 조회, 리뷰 검색 등의 기능을 수행한다.
exports.main = async (req,res,next) => {
  //reviews 테이블의 rev_index(리뷰 인덱스), rev_date(작성일), rev_title(리뷰 제목), rev_isAuth(인증 여부),
  //reviews 테이블의 user_index에 해당하는 users 테이블의 user_ID(유저 아이디),
  //reviews 테이블의 prod_index에 해당하는 products 테이블의 prod_name(제품명)
  try{
    //리뷰 제목 검색하기. default 값은 all
    const title = req.query.title || 'all';

    //검색 조건
    const condition = title==='all'?{}:{rev_title : title};

    //리뷰 목록 가져오기
    const reviews = await Review.findAll({
      where: condition,
      attributes:['rev_index', 'rev_createdAt', 'rev_title', 'rev_isAuth'],
      include: [
        {
          model: User,
          attributes: ['user_ID'],
          required: true // user_index에 해당하는 user가 없는 경우 제외
        },
        {
          model: Product,
          attributes: ['prod_name'],
          required: true // prod_index에 해당하는 product가 없는 경우 제외
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

//review 작성하기(제출)
// 리뷰 작성하기(제출)
exports.writeReview = (req, res, next) => {
  // 이미지 업로드 처리
  upload.fields([{ name: 'rev_img', maxCount: 3 }, { name: 'rev_authImg', maxCount: 3 }])(req, res, async function(err) {
    if (err) {
      console.error('Error uploading images:', err);
      return next(err);
    }

    try {
      const { rev_title, user_index, prod_index, rev_text, rev_rating } = req.body;

      // 필수 데이터 검사
      if (!rev_title || !user_index || !prod_index || !rev_text || !rev_rating) {
        return res.status(400).json({
          code: 400,
          message: '필수 필드를 모두 입력해 주세요.',
          data: {}
        });
      }

      // 업로드된 이미지의 URL 가져오기
      const rev_img_urls = req.files['rev_img'] ? req.files['rev_img'].map(file => file.location) : [];
      const rev_authImg_urls = req.files['rev_authImg'] ? req.files['rev_authImg'].map(file => file.location) : [];

      // 쉼표로 구분된 문자열로 결합.
      const rev_img = rev_img_urls.join(',');
      const rev_authImg = rev_authImg_urls.join(',');

      // 새로운 리뷰 생성
      const newReview = await Review.create({
        rev_title,
        user_index,
        prod_index,
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
      next(err);
    }
  });
};

//review 글 삭제하기
exports.deleteReview = async(req, res, next) =>{
  try{
    //req.params를 통해 어떤 rev_index인지 받아온다.
    //reviews 테이블 삭제(req에서 받아온 rev_index 사용)

    const rev_index = req.params.rev_index;

    //해당 리뷰가 있는지 확인한다.
    const review = await Review.findByPk(rev_index);
    if(!review){
      return res.status(404).json({
        code:404,
        message:'리뷰를 찾을 수 없습니다.',
        data : {}
      })
    }

    //comments 테이블의 rev_index 값이 현재 rev_index값과 같은 행 모두 삭제
    await Comment.destroy({
      where: {
        rev_index: rev_index
      }
    });

    // reviews 테이블에서 해당 리뷰 삭제
    await Review.destroy({
      where: {
        rev_index: rev_index
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
exports.reviewDetails = (req,res) =>{
  res.send('details');
}

//리뷰 댓글 작성하기
exports.writeComments = async(req,res,next)=>{
  try {
    //comments 테이블에 req.body로 넘어온 데이터를 삽입한다.
    //user id는 session에서 받아온다.
    const user_index = req.session.user_Id;
    if(!user_index){
      res.status(401).json({
        code:401,
        message : '로그인이 필요합니다.',
        data : {},
      });
    }
    //review index는 req.params에 적혀있다.
    const rev_index = req.params.rev_idx;

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
      rev_index,
      user_index,
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
exports.updateComments = (req,res)=>{
  res.send('updateComments');
}

//리뷰 댓글 삭제하기
exports.deleteComments = (req,res)=>{
  res.send('dleteComments');
}