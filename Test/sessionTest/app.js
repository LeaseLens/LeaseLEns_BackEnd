const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;

// MySQL 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: ''
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// 미들웨어 설정
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // 개발 환경에서는 false, 프로덕션에서는 true
}));

// 회원가입 엔드포인트
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('User registered!');
    });
});

// 로그인 엔드포인트
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            req.session.user = results[0];
            res.send('Logged in!');
        } else {
            res.status(401).send('Incorrect credentials!');
        }
    });
});

// 로그아웃 엔드포인트
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send(err);
        res.send('Logged out!');
    });
});

// 사용자 인증 상태 확인 엔드포인트
app.get('/auth', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});