const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const passport= require('passport')

const db =require('./models');
const error404 = require('./Middlewares/error404');
const handleError = require('./Middlewares/handleError');
const passportConfig=require('./passport');
const insertProducts = require('./seeders/insertProducts'); // 시더 파일을 가져옵니다.
const MySQLStore = require('express-mysql-session')(session);
const {userRouter, productRouter,renderRouter,reviewRouter, adminReviewRouter}= require('./routes');
const AdminSetup = require('./config/adminSetup');

const PORT = 8080;

dotenv.config();

const env = process.env.NODE_ENV || 'yerim';
const config = require('./config/config')[env];

const app = express();

//cookie parser를 활용하여 쿠키 해석하기
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.use(session({
  secret:process.env.COOKIE_SECRET,
  resave:false,
  saveUninitialized:true, //MySQL database 연결할 때 database 이름 바꿔주기
  cookie:{ 
    maxAge:3600000,
    secure:false,
  },          //HTTPS 사용할 때 값을 true로 바꿔주기
    store: new MySQLStore({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database
    }),
}),
);
app.use(passport.initialize());
app.use(passport.session());

passportConfig(); //passport config 초기화


app.use('/users', userRouter);
app.use('/reviews',reviewRouter);
app.use('/products', productRouter);
app.use('/admin/reviews', adminReviewRouter);
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
    if(process.env.CREATE_ADMIN === 'true'){
      const adminSetup = new AdminSetup();
      adminSetup.createAdmin();                 //Create admin account on server start
    }
    });
  }).catch(err=>{
    console.error('db 연결 실패', err);
  });