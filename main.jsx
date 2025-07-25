//#1 IMPORTS
import React from 'react';
import ReactDOM from 'react-dom/client';
import MemoryQuizRunner from './src/components/MemoryQuizRunner';

//#2 DYNAMICALLY SET PERSONA (you can replace 'leila' later)
const selectedPersona = 'leila';

//#3 DOM-READY CHECK + RENDER
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<MemoryQuizRunner selectedPersona={selectedPersona} />);
  }
});
