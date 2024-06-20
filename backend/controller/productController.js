//제품 페이지 렌더링
exports.main = (req,res) => {
  res.send('main');
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