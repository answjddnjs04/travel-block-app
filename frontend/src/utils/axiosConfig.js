import axios from 'axios';

// 실제 백엔드 서버 URL
const backendURL = 'https://crispy-space-pancake-pj9r5vpvxr4jc9w76-5001.app.github.dev';

const api = axios.create({
  baseURL: backendURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export default api;
