const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5001;

// CORS 설정 - 개발 환경을 위한 더 유연한 설정
app.use(cors({
  origin: true, // 모든 출처 허용
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// MongoDB 연결 설정
// MongoDB 연결 부분을 Atlas 연결 문자열로 교체
mongoose.connect('mongodb+srv://infinitefoever:2004Moon0820!@cluster0.ohiex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB 연결 성공'))
.catch(err => {
  console.error('MongoDB 연결 실패:', err);
  // 몽고DB 연결 실패시 대체 로직 - 개발용 더미 응답 제공
  app.use('/api/blocks', (req, res) => {
    res.json([{ 
      _id: 'dummy-id', 
      name: '테스트 블록', 
      description: '테스트 설명', 
      location: '서울', 
      tags: ['테스트'],
      imageUrl: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  });
});

// 라우트 가져오기
const blockRoutes = require('./routes/blockRoutes');
const planRoutes = require('./routes/planRoutes');

// 라우트 설정
app.use('/api/blocks', blockRoutes);
app.use('/api/plans', planRoutes);

// 정적 파일 제공 (프로덕션 환경에서)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});
