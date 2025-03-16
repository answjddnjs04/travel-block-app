import React from 'react';
<<<<<<< HEAD
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const root = createRoot(document.getElementById('root'));
=======
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
>>>>>>> 4b2f932f19fd349450138e06ebba8c09a25b578e
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
<<<<<<< HEAD
);
=======
);

// 성능 측정을 위한 함수 (선택적)
reportWebVitals();
>>>>>>> 4b2f932f19fd349450138e06ebba8c09a25b578e
