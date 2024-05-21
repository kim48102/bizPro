const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 5000;

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// POST 요청의 바디를 파싱하는 미들웨어 등록
app.use(bodyParser.json());

// 엑셀 파일 데이터를 적재하는 엔드포인트
app.post('/upload', (req, res) => {
  try {
    const data = req.body.data;
    // 엑셀 파일 데이터를 반복하며 MySQL에 저장
    data.forEach((item) => {
      const { column1, column2 } = item;
      const query = `INSERT INTO your_table_name (column1, column2) VALUES ('${column1}', '${column2}')`;
      connection.query(query, (err, result) => {
        if (err) throw err;
        console.log(`Inserted row with ID ${result.insertId}`);
      });
    });
    res.send('Data uploaded successfully');
  } catch (error) {
    console.error('Error uploading data:', error);
    res.status(500).send('Internal server error');
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});