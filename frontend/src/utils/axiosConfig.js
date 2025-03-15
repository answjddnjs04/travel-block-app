import axios from 'axios';

// GitHub Codespaces에서의 백엔드 URL 설정
const BACKEND_URL = 'https://crispy-space-pancake-pj9r5vpvxr4jc9w76-5001.app.github.dev';

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false // CORS 설정에 맞게 변경
});

export default api;
