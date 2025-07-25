//#1 IMPORTS
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/components/App';
import './src/index.css';

//#2 RENDER MAIN APP INTO ROOT
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
