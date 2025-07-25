// #1 IMPORTS
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/components/app';     // ✅ FIXED: lowercase "app"
import './src/index.css';                   // ✅ matches your folder

// #2 RENDER MAIN APP INTO ROOT
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
