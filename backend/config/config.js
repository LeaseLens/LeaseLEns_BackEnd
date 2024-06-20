const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development:{
    username:'root',
    password:process.env.DB_PASSWORD,
    database:'lease_lens',
    host:'127.0.0.1',
    dialect:'mysql',
  },
  test:{
    username:'root',
    password:process.env.DB_PASSWORD,
    database:'lease_lens',
    host:'127.0.0.1',
    dialect:'mysql',
  },
  production:{
    username:'root',
    password:process.env.DB_PASSWORD,
    database:'lease_lens',
    host:'127.0.0.1',
    dialect:'mysql',
  },
  yerim:{
    username:'root',
    password:'1234',
    database:'kdt',
    host:'localhost',
    dialect:'mysql'
  }
  
}


