import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/theme.css';
import './styles/accessibility.css';
import './styles/performance.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

