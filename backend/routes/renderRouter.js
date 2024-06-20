const express =require('express');
const router = express.Router();
const controller = require('../controller/renderController');

//메인 페이지 렌더링
router.get('/main', controller.main);

//마이 페이지 렌더링
router.get('/mypage', controller.mypage);

module.exports = router;