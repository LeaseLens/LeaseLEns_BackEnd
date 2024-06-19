const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const sequelize = require('./sequelize');
require('dotenv').config();

const app = express();
// const PORT = process.env.PORT || 3000;
const PORT=3000;

// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 라우트 설정
app.use('/auth', authRoutes);

// MySQL 연결 및 서버 시작
sequelize.sync()
    .then(() => {
        console.log('Connected to MySQL');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('MySQL connection error:', error);
    });
