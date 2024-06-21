const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const db =require('./models');
const error404 = require('./Middlewares/error404');
const handleError = require('./Middlewares/handleError');

const {userRouter, productRouter,renderRouter,reviewRouter}= require('./routes');

const PORT = 8080;

dotenv.config();
const app = express();

//cookie parser를 활용하여 쿠키 해석하기
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/users', userRouter);
app.use('/reviews',reviewRouter);
app.use('/products', productRouter);
app.use('/', renderRouter);

//express-session 미들웨어를 사용하여 세션 관리
app.use(session({
  secret: 'mysecret', // 세션 암호화에 사용될 키
  resave:false,
  saveUninitialized:true
}))

//404 에러처리 미들웨어
app.use(error404);

//기타 에러처리 미들웨어
app.use(handleError);

db.sequelize
  .sync()
  .then(()=>{
    console.log('db 연결 성공');
    app.listen(PORT,()=>{
      console.log(`${PORT}번 포트에서 서버 실행중 . . . `);
    });
  }).catch(err=>{
    console.error('DB 연결 실패', err);
  });

