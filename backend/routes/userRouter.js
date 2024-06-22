const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');
const isLoggedIn = require('../Middlewares/isLoggedIn');
const isNotLoggedIn = require('../Middlewares/isNotLoggedIn');


//test 유저 페이지
router.get('/', (req,res)=>{
    res.render('index');
})

//test 회원가입 페이지 
router.get('/register',isNotLoggedIn, (req,res)=>{
    res.render('register');
} )

//test 로그인 페이지
router.get('/login', isNotLoggedIn, (req,res, next)=>{
    res.render('login');
})

//test 로그아웃 페이지
router.get('/logout',isLoggedIn, (req,res)=>{
    res.render('logout');
}) 
//test 회원 탈퇴
router.get('/quit',isLoggedIn,(req,res)=>{
    res.render('quit');
})
~
// 회원가입
router.post('/register', isNotLoggedIn, controller.register);

// 로그인
router.post('/login', isNotLoggedIn, controller.login);

// 로그아웃
router.get('/logout', isLoggedIn, controller.logout);

// 회원탈퇴
router.delete('/quit', isLoggedIn, controller.quit);

module.exports = router;
