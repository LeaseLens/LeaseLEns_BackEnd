const express =require('express');
const router = express.Router();
const controller = require('../controller/productController')

//제품 페이지 렌더링
router.get('/', controller.main);

//제품 상세 페이지
router.get('/:prod_idx',controller.details);

//제품 검색하기
router.get('/search',controller.search);

//제품 찜하기
router.post('/:prod_idx/like',controller.like);
module.exports = router;