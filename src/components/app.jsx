import React, { useState } from 'react';
import ChatWindow from './ChatWindow';  // ✅ FIXED

const App = () => {
  const [selectedPersona] = useState('leila');

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src="/avatars/leila.jpg" alt="Leila" />
        Chatting with {selectedPersona}
      </div>
      <ChatWindow persona={selectedPersona} />
    </div>
  );
};

export default App;
