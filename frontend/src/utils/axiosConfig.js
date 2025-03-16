import axios from 'axios';

// 직접 더미 데이터를 반환하는 mock axios 인스턴스 생성
const api = {
  get: (url) => {
    console.log('Mock API GET 호출:', url);
    return Promise.resolve({ data: {} });
  },
  post: (url, data) => {
    console.log('Mock API POST 호출:', url, data);
    return Promise.resolve({ data: { ...data, _id: 'mock-id-' + Date.now() } });
  },
  put: (url, data) => {
    console.log('Mock API PUT 호출:', url, data);
    return Promise.resolve({ data });
  },
  delete: (url) => {
    console.log('Mock API DELETE 호출:', url);
    return Promise.resolve({ data: { message: '성공적으로 삭제되었습니다' } });
  }
};

export default api;
