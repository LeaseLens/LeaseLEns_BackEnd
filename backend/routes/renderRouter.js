const express =require('express');
const router = express.Router();
const controller = require('../controller/renderController');
const isLoggedIn = require('../Middlewares/isLoggedIn');

//메인 페이지 렌더링
router.get('/main', controller.main);

router.get('/auth/check', controller.authCheck);

//마이 페이지 렌더링
router.get('/mypage', isLoggedIn, controller.mypage);

module.exports = router;