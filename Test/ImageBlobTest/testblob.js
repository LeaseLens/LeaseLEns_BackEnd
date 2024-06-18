const mysql = require('mysql2');
const fs = require('fs');

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
    CREATE TABLE IF NOT EXISTS test_blob (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      data LONGBLOB
    )
  `;

  connection.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log('Table created or already exists.');

    // 이미지 파일을 읽어 BLOB으로 저장
    const imagePath = 'example_image.png';
    fs.readFile(imagePath, (err, data) => {
      if (err) throw err;

      const insertQuery = 'INSERT INTO test_blob (name, data) VALUES (?, ?)';
      connection.query(insertQuery, ['example_image', data], (err, result) => {
        if (err) throw err;
        console.log('Image saved to database.');

        // 저장된 이미지 읽기
        const selectQuery = 'SELECT data FROM test_blob WHERE name = ?';
        connection.query(selectQuery, ['example_image'], (err, results) => {
          if (err) throw err;

          // 읽어온 데이터를 파일로 저장
          fs.writeFile('output_image.png', results[0].data, (err) => {
            if (err) throw err;
            console.log('Image retrieved from database and saved as output_image.png');
            connection.end();
          });
        });
      });
    });
  });
});
