const {Review, Product} = require('../models');
//메인 페이지 렌더링
exports.main = async(req,res,next) => {
  //response에 
  //review 테이블의 모든 항목들의 rev_img, rev_text, rev_title, rev_rating만 모두 가져온다.
  //product 테이블의 모든 항목들의 prod_img, prod_name을 모두 가져온다.
  try{
    // review 테이블에서 필요한 데이터 가져오기
    const reviews = await Review.findAll({
      attributes: ['rev_img', 'rev_text', 'rev_title', 'rev_rating']
    });

    // product 테이블에서 필요한 데이터 가져오기
    const products = await Product.findAll({
      attributes: ['prod_img', 'prod_name']
    });

    // 응답 데이터 구성
    res.json({
      code: 200,
      message: '메인 페이지 데이터 조회 성공',
      data: {
        reviews,
        products
      }
    });  
  }catch(err){
    next(err);
  }
}
//마이 페이지 렌더링
exports.mypage = (req,res) =>{
  res.send('mypage');
}