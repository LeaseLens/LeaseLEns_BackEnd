

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

// MySQL 연결 설정
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'test'

  });
  
  // 데이터베이스에 연결
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
  
    // 테이블 생성 (존재하지 않을 경우)
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        data LONGBLOB
      )
    `;
    connection.query(createTableQuery, (err, result) => {
      if (err) throw err;
      console.log('Table created or already exists.');
  
      // 로컬 이미지 파일을 읽어 BLOB으로 저장
      const imagePath = path.join(__dirname, 'example_image.png');
      fs.readFile(imagePath, (err, data) => {
        if (err) throw err;
  
        const insertQuery = 'INSERT INTO images (name, data) VALUES (?, ?)';
        connection.query(insertQuery, ['example_image.png', data], (err, result) => {
          if (err) throw err;
          console.log('Image saved to database.');
        });
      });
    });
  });
  
  // 이미지 가져오기 라우트
  app.get('/images/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    const selectQuery = 'SELECT data FROM images WHERE id = ?';
    connection.query(selectQuery, [id], (err, results) => {
      if (err) throw err;
      res.send(results[0].data);
    });
  });
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  