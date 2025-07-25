//# main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import MemoryQuizRunner from './src/components/MemoryQuizRunner';

const selectedPersona = 'leila'; // or fetch this dynamically

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MemoryQuizRunner selectedPersona={selectedPersona} />);
