import React from 'react';

const ChatBubble = ({ from, text }) => {
  return (
    <div
      className={`chat-bubble ${from === 'user' ? 'from-user' : 'from-avatar'}`}
    >
      {text}
    </div>
  );
};

export default ChatBubble;
