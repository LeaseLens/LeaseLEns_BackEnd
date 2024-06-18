const express = require('express');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const PORT = 8080;

dotenv.config();
const app = express();

//cookie parser를 활용하여 쿠키 해석하기
app.use(cookieParser());

//express-session 미들웨어를 사용하여 세션 관리
app.use(session({
  secret: 'mysecret', // 세션 암호화에 사용될 키
  resave:false,
  saveUninitialized:true
}))

app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use()

app.listen(PORT,()=>{
  console.log(`${PORT}번 포트에서 서버 실행중 . . . `)
})