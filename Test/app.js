const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT  = 8080;
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const userInfo = {id:'joony', pw:'1234'};
let isLoggedIn = false;

app.get('/', (req,res)=>{
  res.render('hello', {isLoggedIn:isLoggedIn})
})
app.post('/login',(req,res)=>{
  const {userId, userPw} = req.body;
  
  if(userId === userInfo.id && userPw === userInfo.pw) isLoggedIn = true;
  res.render('hello',{isLoggedIn : isLoggedIn});
})

app.listen(PORT,()=>{
  console.log(`${PORT}번 포트에서 서버 실행중. . .`)
});