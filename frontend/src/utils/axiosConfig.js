import axios from 'axios';

// 개발 환경에서 proxy 설정 활용
const api = axios.create({
  baseURL: '', // 비워두면 package.json의 proxy 설정 사용
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // CORS 이슈 해결을 위해 true로 설정
});

export default api;
