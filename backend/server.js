const express = require('express');
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

// GitHub Codespaces용 CORS 추가 설정
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && origin.includes('.app.github.dev')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  }
  next();
});

app.use(express.json());

// MongoDB 연결 시도를 제거하고 더미 데이터를 사용
console.log('개발 모드: MongoDB 없이 더미 데이터 사용');

// 블록 API 엔드포인트 - 더미 데이터 사용
// GET /api/blocks - 모든 블록 가져오기
app.get('/api/blocks', (req, res) => {
  res.json([{ 
    _id: 'dummy-id-1', 
    name: '서울 남산타워', 
    description: '서울의 중심에 위치한 남산서울타워는 대한민국을 대표하는 관광지입니다. 서울의 아름다운 전망을 볼 수 있습니다.', 
    location: '서울 용산구', 
    tags: ['서울', '관광', '전망대'],
    imageUrl: 'https://via.placeholder.com/400x200?text=남산타워',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { 
    _id: 'dummy-id-2', 
    name: '부산 해운대 해변', 
    description: '부산의 대표적인 해변으로, 아름다운 해안선과 화려한 도시 경관을 함께 즐길 수 있습니다.', 
    location: '부산 해운대구', 
    tags: ['부산', '해변', '여름'],
    imageUrl: 'https://via.placeholder.com/400x200?text=해운대해변',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  { 
    _id: 'dummy-id-3', 
    name: '제주 성산일출봉', 
    description: '유네스코 세계자연유산에 등재된 제주도의 대표 명소입니다. 아름다운 일출을 감상할 수 있습니다.', 
    location: '제주 서귀포시', 
    tags: ['제주', '자연', '일출'],
    imageUrl: 'https://via.placeholder.com/400x200?text=성산일출봉',
    createdAt: new Date(),
    updatedAt: new Date()
  }]);
});

// GET /api/blocks/:id - 단일 블록 가져오기
app.get('/api/blocks/:id', (req, res) => {
  const dummyBlocks = {
    'dummy-id-1': { 
      _id: 'dummy-id-1', 
      name: '서울 남산타워', 
      description: '서울의 중심에 위치한 남산서울타워는 대한민국을 대표하는 관광지입니다. 서울의 아름다운 전망을 볼 수 있으며, 각종 문화 행사와 레스토랑 등이 있어 즐길거리가 풍부합니다.', 
      location: '서울 용산구 남산공원길 105', 
      tags: ['서울', '관광', '전망대', '데이트'],
      imageUrl: 'https://via.placeholder.com/800x400?text=남산타워',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    'dummy-id-2': { 
      _id: 'dummy-id-2', 
      name: '부산 해운대 해변', 
      description: '부산의 대표적인 해변으로, 아름다운 해안선과 화려한 도시 경관을 함께 즐길 수 있습니다. 여름에는 해수욕장으로, 다른 계절에는 산책하기 좋은 명소입니다.', 
      location: '부산 해운대구 해운대해변로 264', 
      tags: ['부산', '해변', '여름', '바다'],
      imageUrl: 'https://via.placeholder.com/800x400?text=해운대해변',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    'dummy-id-3': { 
      _id: 'dummy-id-3', 
      name: '제주 성산일출봉', 
      description: '유네스코 세계자연유산에 등재된 제주도의 대표 명소입니다. 아름다운 일출을 감상할 수 있으며, 주변에 다양한 관광지와 맛집이 있어 제주 여행 필수 코스입니다.', 
      location: '제주 서귀포시 성산읍 일출로 284-12', 
      tags: ['제주', '자연', '일출', '하이킹'],
      imageUrl: 'https://via.placeholder.com/800x400?text=성산일출봉',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  };
  
  const block = dummyBlocks[req.params.id] || {
    _id: req.params.id, 
    name: '테스트 블록 상세', 
    description: '이것은 블록 상세 페이지를 위한 테스트 설명입니다.', 
    location: '대한민국 어딘가', 
    tags: ['테스트', '샘플'],
    imageUrl: 'https://via.placeholder.com/800x400?text=테스트+블록',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  res.json(block);
});

// POST /api/blocks - 블록 생성
app.post('/api/blocks', (req, res) => {
  // 요청 바디의 데이터에 ID 추가하여 반환
  const newBlock = {
    _id: 'new-dummy-id-' + Date.now(),
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  res.status(201).json(newBlock);
});

// PUT /api/blocks/:id - 블록 업데이트
app.put('/api/blocks/:id', (req, res) => {
  const updatedBlock = {
    _id: req.params.id,
    ...req.body,
    updatedAt: new Date()
  };
  res.json(updatedBlock);
});

// DELETE /api/blocks/:id - 블록 삭제
app.delete('/api/blocks/:id', (req, res) => {
  res.json({ 
    message: '블록이 성공적으로 삭제되었습니다', 
    id: req.params.id 
  });
});

// GET /api/blocks/tag/:tag - 태그로 블록 검색
app.get('/api/blocks/tag/:tag', (req, res) => {
  const tagToSearch = req.params.tag.toLowerCase();
  const taggedBlocks = [
    { 
      _id: 'dummy-id-1', 
      name: '서울 남산타워', 
      description: '서울의 중심에 위치한 남산서울타워', 
      location: '서울 용산구', 
      tags: ['서울', '관광', '전망대'],
      imageUrl: 'https://via.placeholder.com/400x200?text=남산타워',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ].filter(block => 
    block.tags.map(tag => tag.toLowerCase()).includes(tagToSearch)
  );
  
  res.json(taggedBlocks);
});

// 여행 계획 API 더미 응답
// GET /api/plans - 모든 여행 계획 가져오기
app.get('/api/plans', (req, res) => {
  res.json([{
    _id: 'plan-dummy-1',
    title: '서울 3일 여행',
    description: '서울의 주요 관광지를 3일간 둘러보는 여행 계획',
    startDate: new Date(2025, 3, 1),
    endDate: new Date(2025, 3, 3),
    blocks: [
      {
        block: 'dummy-id-1',
        order: 1,
        day: 1,
        note: '오전에 방문하기 좋아요'
      }
    ],
    tags: ['서울', '주말여행', '도시여행'],
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'plan-dummy-2',
    title: '제주 일주 여행',
    description: '제주도를 일주하는 5일 여행 코스',
    startDate: new Date(2025, 5, 10),
    endDate: new Date(2025, 5, 14),
    blocks: [
      {
        block: 'dummy-id-3',
        order: 1,
        day: 1,
        note: '일출 보기 좋은 장소'
      }
    ],
    tags: ['제주', '자연', '휴양'],
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }]);
});

// GET /api/plans/:id - 단일 여행 계획 가져오기
app.get('/api/plans/:id', (req, res) => {
  const dummyPlans = {
    'plan-dummy-1': {
      _id: 'plan-dummy-1',
      title: '서울 3일 여행',
      description: '서울의 주요 관광지를 3일간 둘러보는 여행 계획',
      startDate: new Date(2025, 3, 1),
      endDate: new Date(2025, 3, 3),
      blocks: [
        {
          _id: 'plan-block-1',
          block: {
            _id: 'dummy-id-1',
            name: '서울 남산타워',
            location: '서울 용산구',
            imageUrl: 'https://via.placeholder.com/400x200?text=남산타워'
          },
          order: 1,
          day: 1,
          note: '오전에 방문하기 좋아요'
        },
        {
          _id: 'plan-block-2',
          block: {
            _id: 'dummy-id-2',
            name: '동대문 디자인 플라자',
            location: '서울 중구',
            imageUrl: 'https://via.placeholder.com/400x200?text=DDP'
          },
          order: 2,
          day: 1,
          note: '야경이 아름다워요'
        }
      ],
      tags: ['서울', '주말여행', '도시여행'],
      isPublic: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    'plan-dummy-2': {
      _id: 'plan-dummy-2',
      title: '제주 일주 여행',
      description: '제주도를 일주하는 5일 여행 코스',
      startDate: new Date(2025, 5, 10),
      endDate: new Date(2025, 5, 14),
      blocks: [
        {
          _id: 'plan-block-3',
          block: {
            _id: 'dummy-id-3',
            name: '제주 성산일출봉',
            location: '제주 서귀포시',
            imageUrl: 'https://via.placeholder.com/400x200?text=성산일출봉'
          },
          order: 1,
          day: 1,
          note: '일출 보기 좋은 장소'
        }
      ],
      tags: ['제주', '자연', '휴양'],
      isPublic: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  };
  
  const plan = dummyPlans[req.params.id] || {
    _id: req.params.id,
    title: '테스트 여행 계획',
    description: '테스트용 여행 계획입니다',
    startDate: new Date(),
    endDate: new Date(Date.now() + 3*24*60*60*1000),
    blocks: [],
    tags: ['테스트'],
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  res.json(plan);
});

// POST /api/plans - 여행 계획 생성
app.post('/api/plans', (req, res) => {
  const newPlan = {
    _id: 'new-plan-' + Date.now(),
    ...req.body,
    blocks: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  res.status(201).json(newPlan);
});

// PUT /api/plans/:id - 여행 계획 업데이트
app.put('/api/plans/:id', (req, res) => {
  // 기존 계획 복사 (실제로는 더미 데이터)
  const dummyPlan = {
    _id: req.params.id,
    title: '테스트 여행 계획',
    description: '테스트용 여행 계획입니다',
    startDate: new Date(),
    endDate: new Date(Date.now() + 3*24*60*60*1000),
    blocks: [],
    tags: ['테스트'],
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  const updatedPlan = {
    ...dummyPlan,
    ...req.body,
    _id: req.params.id, // ID는 변경 불가
    updatedAt: new Date(),
    // blocks는 유지 (req.body에 blocks가 없을 경우)
    blocks: req.body.blocks || dummyPlan.blocks
  };
  
  res.json(updatedPlan);
});

// DELETE /api/plans/:id - 여행 계획 삭제
app.delete('/api/plans/:id', (req, res) => {
  res.json({
    message: '여행 계획이 성공적으로 삭제되었습니다',
    id: req.params.id
  });
});

// POST /api/plans/:id/blocks - 블록을 여행 계획에 추가
app.post('/api/plans/:id/blocks', (req, res) => {
  const { blockId, order, day, note } = req.body;
  
  // 더미 블록 데이터
  const dummyBlock = {
    _id: 'dummy-id-' + blockId,
    name: '추가된 블록',
    location: '추가된 위치',
    imageUrl: 'https://via.placeholder.com/400x200?text=추가된+블록'
  };
  
  // 더미 계획 데이터에 블록 추가 (실제로는 응답만)
  const dummyPlan = {
    _id: req.params.id,
    title: '테스트 여행 계획',
    description: '업데이트된 테스트용 여행 계획',
    startDate: new Date(),
    endDate: new Date(Date.now() + 3*24*60*60*1000),
    blocks: [
      {
        _id: 'plan-block-' + Date.now(),
        block: dummyBlock,
        order: order || 1,
        day: day || 1,
        note: note || ''
      }
    ],
    tags: ['테스트', '업데이트'],
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  res.json(dummyPlan);
});

// DELETE /api/plans/:id/blocks/:blockIndex - 계획에서 블록 제거
app.delete('/api/plans/:id/blocks/:blockIndex', (req, res) => {
  res.json({
    _id: req.params.id,
    title: '테스트 여행 계획',
    description: '블록이 제거된 테스트용 여행 계획',
    blocks: [], // 모든 블록이 제거된 것처럼
    tags: ['테스트'],
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date()
  });
});

// PUT /api/plans/:id/blocks/reorder - 블록 순서 업데이트
app.put('/api/plans/:id/blocks/reorder', (req, res) => {
  res.json({
    _id: req.params.id,
    title: '테스트 여행 계획',
    description: '블록 순서가 변경된 테스트용 여행 계획',
    blocks: [
      {
        _id: 'plan-block-1',
        block: {
          _id: 'dummy-id-1',
          name: '서울 남산타워',
          location: '서울 용산구',
          imageUrl: 'https://via.placeholder.com/400x200?text=남산타워'
        },
        order: 2, // 순서가 변경됨
        day: 1,
        note: '오전에 방문하기 좋아요'
      },
      {
        _id: 'plan-block-2',
        block: {
          _id: 'dummy-id-2',
          name: '동대문 디자인 플라자',
          location: '서울 중구',
          imageUrl: 'https://via.placeholder.com/400x200?text=DDP'
        },
        order: 1, // 순서가 변경됨
        day: 1,
        note: '야경이 아름다워요'
      }
    ],
    tags: ['테스트'],
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date()
  });
});

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
