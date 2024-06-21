const express =require('express');
const router = express.Router();
const controller = require('../controller/userController');

//회원가입
router.post('/register', controller.register);

//로그인
router.post('/login',controller.login);

//로그아웃
router.get('/logout',controller.logout);

//회원탈퇴
router.delete('/quit',controller.quit);
