import axios from 'axios';

// GitHub Codespaces나 다른 환경에서의 백엔드 URL 설정
const isCodespaces = !!process.env.CODESPACES;
const BACKEND_URL = isCodespaces 
  ? process.env.REACT_APP_BACKEND_URL || 'https://[your-backend-port-url].app.github.dev'
  : 'http://localhost:5001';

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false // CORS 설정에 맞게 변경
});

export default api;
