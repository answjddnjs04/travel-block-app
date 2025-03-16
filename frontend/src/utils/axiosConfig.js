import axios from 'axios';

// frontend/src/utils/axiosConfig.js
const api = {
  get: async (url) => {
    console.log('Mock GET:', url);
    
    // 블록 목록 요청 처리
    if (url.includes('/api/blocks')) {
      return { 
        data: [
          { 
            _id: 'dummy-id-1', 
            name: '서울 남산타워',
            description: '서울의 중심에 위치한 남산서울타워',
            location: '서울 용산구',
            tags: ['서울', '관광', '전망대'],
            imageUrl: 'https://via.placeholder.com/400x200?text=남산타워',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          // 추가 데이터...
        ] 
      };
    }
    
    // 단일 블록 상세 요청 처리
    if (url.includes('/api/blocks/') && !url.includes('/tag/')) {
      return {
        data: {
          _id: 'dummy-id-1', 
          name: '서울 남산타워',
          description: '서울의 중심에 위치한 남산서울타워는 대한민국을 대표하는 관광지입니다.',
          location: '서울 용산구 남산공원길 105',
          tags: ['서울', '관광', '전망대'],
          imageUrl: 'https://via.placeholder.com/400x200?text=남산타워',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      };
    }
    
    return { data: {} };
  },
  post: async (url, data) => {
    console.log('Mock POST:', url, data);
    return { data: { ...data, _id: 'mock-id-' + Date.now() } };
  },
  put: async (url, data) => {
    console.log('Mock PUT:', url, data);
    return { data };
  },
  delete: async (url) => {
    console.log('Mock DELETE:', url);
    return { data: { message: '성공적으로 삭제되었습니다' } };
  }
};

export default api;
