import axios from 'axios';

// API 기본 URL 설정 (한 번만 선언)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// axios 인스턴스 설정
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10초 타임아웃
});

// 요청 인터셉터 - 오류 디버깅에 도움됨
axiosInstance.interceptors.request.use(
  config => {
    console.log(`API 요청: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  error => {
    console.error('API 요청 오류:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 오류 디버깅에 도움됨
axiosInstance.interceptors.response.use(
  response => {
    console.log(`API 응답 성공: ${response.config.method.toUpperCase()} ${response.config.url}`);
    return response;
  },
  error => {
    console.error('API 응답 오류:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

// API 서비스 객체
const api = {
  // 블록 관련 API
  getBlocks: () => axiosInstance.get('/blocks'),
  getBlock: (id) => axiosInstance.get(`/blocks/${id}`),
  createBlock: (blockData) => axiosInstance.post('/blocks', blockData),
  updateBlock: (id, blockData) => axiosInstance.put(`/blocks/${id}`, blockData),
  deleteBlock: (id) => axiosInstance.delete(`/blocks/${id}`),
  
  // 플랜 관련 API
  getPlans: () => axiosInstance.get('/plans'),
  getPlan: (id) => axiosInstance.get(`/plans/${id}`),
  createPlan: (planData) => axiosInstance.post('/plans', planData),
  updatePlan: (id, planData) => axiosInstance.put(`/plans/${id}`, planData),
  deletePlan: (id) => axiosInstance.delete(`/plans/${id}`),
  addBlockToPlan: (planId, blockData) => axiosInstance.post(`/plans/${planId}/blocks`, blockData),
  removeBlockFromPlan: (planId, blockId) => axiosInstance.delete(`/plans/${planId}/blocks/${blockId}`)
};

export default api;