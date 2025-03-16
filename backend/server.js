const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose'); // 이 라인 추가
const app = express();
const PORT = process.env.PORT || 5001;

// CORS 설정 - 더 세부적인 설정
app.use(cors({
  origin: ['http://localhost:3000', 'https://crispy-space-pancake-pj9r5vpvxr4jc9w76-3001.app.github.dev'], // 프론트엔드 출처 명시
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true // 인증 정보 허용
}));

app.use(express.json());


// MongoDB 연결
//mongoose.connect('mongodb://localhost:27017/travel-block-app', {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
//})
//.then(() => console.log('MongoDB 연결 성공'))
//.catch(err => console.error('MongoDB 연결 실패:', err));

// 라우트 가져오기
const blockRoutes = require('./routes/blockRoutes');

// 라우트 설정
app.use('/api/blocks', blockRoutes);

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});
