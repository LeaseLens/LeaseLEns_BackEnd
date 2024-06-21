const {Op} = require('sequelize');
const {Comment, Product, Review, User} = require('../models');
//제품 페이지 렌더링
exports.main = async (req,res, next) => {
  try{
    //category 쿼리 가져오기
    const category = req.query.category || 'all';

    //검색 조건 설정하기
    const condition = category === 'all' ? {} : {prod_category : category};

    //제품 목록 가져오기
    const products = await Product.findAll({
      where : condition,
      attributes: ['prod_index', 'prod_img', 'prod_name', 'prod_likes', 'prod_price'] // 필요한 필드 목록
    
    });

    //요청이 성공한 경우
  res.json(products);
  }catch(err){
    //요청이 실패한 경우 에러처리. 여기서 에러처리를 하지 말고, 에러처리 미들웨어에 전달해준다.
    next(err);
  } 
}

//제품 상세 페이지
exports.details = (req,res) =>{
  res.send('details');
}

//제품 검색하기
exports.search = (req,res)=>{
  res.send('search');
}

//제품 찜하기
exports.like = (req,res)=>{
  res.send('like');
}