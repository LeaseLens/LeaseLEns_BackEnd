const express =require('express');
const router = express.Router();

const controller = require('../controller/reviewController');

//reviews 모아보기
router.get('/',controller.main);

//review 작성하기(제출)
router.post('/',controller.writeReview);

//review 검색하기
router.get('/',controller.searchReview);

//review 글 삭제하기
router.delete('/:rev_idx', controller.deleteReview);

//리뷰 상세 페이지
router.get('/:rev_idx',controller.reviewDetails);

//리뷰 댓글 작성하기
router.post('/:rev_idx/comments/:com_idx', controller.writeComments);

//리뷰 댓글 수정하기
router.patch('/:rev_idx/comments/:com_idx', controller.updateComments);

//리뷰 댓글 삭제하기
router.delete('/:rev_idx/comments/:com_idx', controller.deleteComments);

module.exports = router;