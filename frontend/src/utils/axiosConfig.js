import axios from 'axios';

// 개발 환경에서 백엔드 URL 설정
// GitHub Codespaces에서는 백엔드 서버의 전체 URL을 사용해야 함
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
