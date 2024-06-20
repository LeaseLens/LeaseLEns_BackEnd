//reviews 모아보기
exports.main = (req,res) => {
  res.send('render reviews');
}

//review 작성하기(제출)
exports.writeReview = (req,res) =>{
  res.send('write');
}

//review 검색하기
exports.searchReview = (req,res) =>{
  res.send('search');
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