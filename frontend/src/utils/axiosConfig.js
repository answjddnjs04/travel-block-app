import axios from 'axios';

// API 기본 URL 설정
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// 실제 API 호출 함수
const apiService = {
  // 여행 블록 관련 API
  getBlocks: () => axios.get(`${API_URL}/blocks`),
  getBlock: (id) => axios.get(`${API_URL}/blocks/${id}`),
  createBlock: (blockData) => axios.post(`${API_URL}/blocks`, blockData),
  updateBlock: (id, blockData) => axios.put(`${API_URL}/blocks/${id}`, blockData),
  deleteBlock: (id) => axios.delete(`${API_URL}/blocks/${id}`),
  getBlocksByTag: (tag) => axios.get(`${API_URL}/blocks/tag/${tag}`),
  
  // 여행 계획 관련 API
  getPlans: () => axios.get(`${API_URL}/plans`),
  getPlan: (id) => axios.get(`${API_URL}/plans/${id}`),
  createPlan: (planData) => axios.post(`${API_URL}/plans`, planData),
  updatePlan: (id, planData) => axios.put(`${API_URL}/plans/${id}`, planData),
  deletePlan: (id) => axios.delete(`${API_URL}/plans/${id}`),
  addBlockToPlan: (planId, blockData) => axios.post(`${API_URL}/plans/${planId}/blocks`, blockData),
  removeBlockFromPlan: (planId, blockId) => axios.delete(`${API_URL}/plans/${planId}/blocks/${blockId}`),
  getPlansByTag: (tag) => axios.get(`${API_URL}/plans/tag/${tag}`)
};

// 개발 모드에서 사용할 더미 데이터
const dummyData = {
  blocks: [
    { 
      _id: 'dummy-id-1', 
      name: '서울 남산타워', 
      description: '서울의 중심에 위치한 남산서울타워는 대한민국을 대표하는 관광지입니다.', 
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
    }
  ],
  plans: [
    {
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
        }
      ],
      tags: ['서울', '주말여행', '도시여행'],
      isPublic: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
};

// 개발 모드용 모의 API - MongoDB 연결 없이 테스트 가능
// 실제 프로덕션에서는 apiService를 사용하세요
const mockApi = {
  // 블록 관련 API
  getBlocks: () => Promise.resolve({ data: dummyData.blocks }),
  getBlock: (id) => {
    const block = dummyData.blocks.find(b => b._id === id) || dummyData.blocks[0];
    return Promise.resolve({ data: block });
  },
  createBlock: (blockData) => {
    const newBlock = { 
      ...blockData, 
      _id: `new-dummy-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    dummyData.blocks.push(newBlock);
    return Promise.resolve({ data: newBlock });
  },
  updateBlock: (id, blockData) => {
    const index = dummyData.blocks.findIndex(b => b._id === id);
    if (index !== -1) {
      const updatedBlock = { 
        ...dummyData.blocks[index],
        ...blockData,
        updatedAt: new Date()
      };
      dummyData.blocks[index] = updatedBlock;
      return Promise.resolve({ data: updatedBlock });
    }
    return Promise.reject({ response: { status: 404, data: { message: '블록을 찾을 수 없습니다' } } });
  },
  deleteBlock: (id) => {
    const index = dummyData.blocks.findIndex(b => b._id === id);
    if (index !== -1) {
      dummyData.blocks.splice(index, 1);
      return Promise.resolve({ data: { message: '블록이 삭제되었습니다', id } });
    }
    return Promise.reject({ response: { status: 404, data: { message: '블록을 찾을 수 없습니다' } } });
  },
  getBlocksByTag: (tag) => {
    const filteredBlocks = dummyData.blocks.filter(b => b.tags.includes(tag));
    return Promise.resolve({ data: filteredBlocks });
  },
  
  // 여행 계획 관련 API
  getPlans: () => Promise.resolve({ data: dummyData.plans }),
  getPlan: (id) => {
    const plan = dummyData.plans.find(p => p._id === id) || dummyData.plans[0];
    return Promise.resolve({ data: plan });
  },
  createPlan: (planData) => {
    const newPlan = { 
      ...planData, 
      _id: `plan-dummy-${Date.now()}`,
      blocks: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    dummyData.plans.push(newPlan);
    return Promise.resolve({ data: newPlan });
  },
  updatePlan: (id, planData) => {
    const index = dummyData.plans.findIndex(p => p._id === id);
    if (index !== -1) {
      const updatedPlan = { 
        ...dummyData.plans[index],
        ...planData,
        updatedAt: new Date()
      };
      dummyData.plans[index] = updatedPlan;
      return Promise.resolve({ data: updatedPlan });
    }
    return Promise.reject({ response: { status: 404, data: { message: '여행 계획을 찾을 수 없습니다' } } });
  },
  deletePlan: (id) => {
    const index = dummyData.plans.findIndex(p => p._id === id);
    if (index !== -1) {
      dummyData.plans.splice(index, 1);
      return Promise.resolve({ data: { message: '여행 계획이 삭제되었습니다', id } });
    }
    return Promise.reject({ response: { status: 404, data: { message: '여행 계획을 찾을 수 없습니다' } } });
  },
  addBlockToPlan: (planId, blockData) => {
    const planIndex = dummyData.plans.findIndex(p => p._id === planId);
    if (planIndex !== -1) {
      const blockToAdd = {
        _id: `plan-block-${Date.now()}`,
        ...blockData
      };
      dummyData.plans[planIndex].blocks.push(blockToAdd);
      return Promise.resolve({ data: dummyData.plans[planIndex] });
    }
    return Promise.reject({ response: { status: 404, data: { message: '여행 계획을 찾을 수 없습니다' } } });
  },
  removeBlockFromPlan: (planId, blockId) => {
    const planIndex = dummyData.plans.findIndex(p => p._id === planId);
    if (planIndex !== -1) {
      dummyData.plans[planIndex].blocks = dummyData.plans[planIndex].blocks.filter(b => b._id !== blockId);
      return Promise.resolve({ data: dummyData.plans[planIndex] });
    }
    return Promise.reject({ response: { status: 404, data: { message: '여행 계획을 찾을 수 없습니다' } } });
  },
  getPlansByTag: (tag) => {
    const filteredPlans = dummyData.plans.filter(p => p.tags.includes(tag));
    return Promise.resolve({ data: filteredPlans });
  }
};

// 개발 모드에서는 mockApi를, 프로덕션에서는 apiService를 사용
const api = process.env.NODE_ENV === 'production' ? apiService : mockApi;

export default api;
