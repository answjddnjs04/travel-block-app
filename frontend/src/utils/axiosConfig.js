import axios from 'axios';

// 이 모듈이 모든 axios 요청을 가로채서 더미 데이터로 응답합니다
const api = {
  get: async (url) => {
    console.log('Mock GET:', url);
    
    // 블록 목록 요청
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
          // 추가 더미 데이터...
        ] 
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
