import axios from 'axios';

// API 기본 URL 설정
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// 실제 API 서비스
const apiService = {
  getBlocks: () => axios.get(`${API_URL}/blocks`, { withCredentials: true }),
  getBlock: (id) => axios.get(`${API_URL}/blocks/${id}`, { withCredentials: true }),
  createBlock: (blockData) => axios.post(`${API_URL}/blocks`, blockData, { withCredentials: true }),
  updateBlock: (id, blockData) => axios.put(`${API_URL}/blocks/${id}`, blockData, { withCredentials: true }),
  deleteBlock: (id) => axios.delete(`${API_URL}/blocks/${id}`, { withCredentials: true }),
  // 다른 API 호출...
};

// 개발 환경용 더미 데이터
const dummyBlocks = [
  // 기존 더미 데이터
];

// 개발 모드에서는 더미 데이터 사용, 프로덕션에서는 실제 API 사용
const api = process.env.NODE_ENV === 'production' ? apiService : {
  // 기존 더미 API 코드
  getBlocks: () => Promise.resolve({ data: dummyBlocks }),
  // 나머지 함수들...
};

export default api;
