const {Review, User, Product} = require('../models');

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
exports.writeReview = (req,res) =>{
  res.send('write');
}

//review 글 삭제하기
exports.deleteReview = (req,res) =>{
  res.send('delete');
}

//리뷰 상세 페이지
exports.reviewDetails = (req,res) =>{
  res.send('details');
}

//리뷰 댓글 작성하기
exports.writeComments = (req,res)=>{
  res.send('writeComments');
}

//리뷰 댓글 수정하기
exports.updateComments = (req,res)=>{
  res.send('updateComments');
}

//리뷰 댓글 삭제하기
exports.deleteComments = (req,res)=>{
  res.send('dleteComments');
}