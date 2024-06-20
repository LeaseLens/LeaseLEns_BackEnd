const {Op} = require('sequelize');
const {comment, product, review, user} = require('./models');
//제품 페이지 렌더링
exports.main = async(req,res) => {
  try{
    //제품 목록
    const products = product.findAll();
  }
  //요청이 성공한 경우
  res.json(products);
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