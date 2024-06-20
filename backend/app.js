const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const db =require('./models');

const {userRouter, productRouter,renderRouter,reviewRouter}= require('./routes');

const PORT = 8080;

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(()=>{
    console.log('db 연결 성공');
  })
  .catch(console.error);
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

app.listen(PORT,()=>{
  console.log(`${PORT}번 포트에서 서버 실행중 . . . `)
})