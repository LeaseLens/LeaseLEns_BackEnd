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
exports.writeReview = async(req,res,next) =>{
  try{ 
  //review table에 입력 데이터가 추가된다.
  // 입력받을 데이터는 review table의 rev_title, user_index, prod_index, rev_isAuth(default로 false값), 
  //rev_text, rev_createdAt(default로 현재 dateTime), rev_img(있을수도 없을수도 있음), rev_authImg(필수), rev_rating

  const {rev_title, user_index, prod_index, rev_text, rev_img, rev_authImg, rev_rating} = req.body;

    // 필수 데이터 검사
    if (!rev_title || !user_index || !prod_index || !rev_text || !rev_authImg || !rev_rating) {
      return res.status(400).json({
        code: 400,
        message: '필수 필드를 모두 입력해 주세요.',
        data: {}
      });
    }

    // 새로운 리뷰 생성
    const newReview = await Review.create({
      rev_title,
      user_index,
      prod_index,
      rev_isAuth: false, // 기본값
      rev_text,
      rev_createdAt: new Date(), // 현재 날짜 시간
      rev_img: rev_img || null, // 선택적 필드
      rev_authImg,
      rev_rating
    });

  //res 데이터 : 성공한 상태코드, 메시지. 데이터는 빈 객체를 보낼 것.
    res.json({
      code: 200,
      message: '리뷰가 성공적으로 작성되었습니다.',
      data: {}
    });
  }catch(err){
    next(err);
  }

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