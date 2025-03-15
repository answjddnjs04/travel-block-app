const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

// CORS 설정 수정 - 더 구체적인 설정으로 변경
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-production-domain.com'], // 실제 도메인으로 바꿔주세요
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
}));

app.use(express.json());

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/travel-block-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB 연결 성공'))
.catch(err => console.error('MongoDB 연결 실패:', err));

// 라우트 가져오기
const blockRoutes = require('./routes/blockRoutes');
const planRoutes = require('./routes/planRoutes');

// 라우트 설정
app.use('/api/blocks', blockRoutes);
app.use('/api/plans', planRoutes);

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});
