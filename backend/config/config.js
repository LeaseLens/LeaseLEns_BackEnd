const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development:{
    username:'root',
    password:'12345678',
    database:'lease_lens',
    host:'localhost',
    dialect:'mysql',
  },
  test:{
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    host:process.env.DB_HOST,
    dialect:'mysql',
  },
  production:{
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    host:process.env.DB_HOST,
    dialect:'mysql',
  },
  yerim:{
    username:'root',
    password:'1234',
    database:'test',
    host:'localhost',
    dialect:'mysql'
  }
  
}


