// #1 IMPORTS
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';     // ✅ FIXED: No "/src" here
import './index.css';                   // ✅ Global styles from src

// #2 RENDER MAIN APP INTO ROOT
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
