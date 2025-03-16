const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5001;

// CORS 설정 - 이 부분만 남기고 아래 app.use(cors()); 부분은 제거
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://crispy-space-pancake-pj9r5vpvxr4jc9w76-3001.app.github.dev',
    'https://crispy-space-pancake-pj9r5vpvxr4jc9w76-3002.app.github.dev'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));


// CORS 설정
app.use(cors());
app.use(express.json());

// MongoDB 연결
//mongoose.connect('mongodb://localhost:27017/travel-block-app', {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
//})
//.then(() => console.log('MongoDB 연결 성공'))
//.catch(err => console.error('MongoDB 연결 실패:', err));

// 블록 모델 및 라우트 가져오기
const Block = require('./models/blockModel');
const blockRoutes = require('./routes/blockRoutes');
const planRoutes = require('./routes/planRoutes');

// API 라우트 설정
app.use('/api/blocks', blockRoutes);
app.use('/api/plans', planRoutes);

// 개발 모드 확인
if (process.env.NODE_ENV === 'production') {
  // 프로덕션 환경에서는 프론트엔드 빌드 파일 제공
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
} else {
  // 기본 라우트
  app.get('/', (req, res) => {
    res.send('API가 실행 중입니다');
  });
}

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다`);
});
