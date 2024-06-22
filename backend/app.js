const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const passport= require('passport')
const db =require('./models');
const error404 = require('./Middlewares/error404');
const handleError = require('./Middlewares/handleError');
const passportConfig=require('./passport');
const config = require('./config/config');
const path= require('path')
const MySQLStore = require('express-mysql-session')(session)


const {userRouter, productRouter,renderRouter,reviewRouter}= require('./routes');

const PORT = 8080;

dotenv.config();
require('dotenv').config();
const app = express();

passportConfig(); //passport config 초기화

//cookie parser를 활용하여 쿠키 해석하기
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.use(session({
  secret:process.env.COOKIE_SECRET,
  resave:false,
  cookie:{ secure:false },          //HTTPS 사용할 때 값을 true로 바꿔주기
  saveUninitialized:true,           //MySQL database 연결할 때 database 이름 바꿔주기
    store: new MySQLStore({
      host: config.yerim.host,
      user: config.yerim.username,
      password: config.yerim.password,
      database: config.yerim.database
    }),
}),
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', userRouter); 
app.use('/reviews',reviewRouter);
app.use('/products', productRouter);
app.use('/', renderRouter);

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
    console.error('db 연결 실패', err);
  });