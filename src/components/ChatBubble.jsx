import React from 'react';

const MessageBubble = ({ role, content }) => {
  const isUser = role === 'user';

  return (
    <div
      className={`w-fit max-w-[80%] p-3 rounded-lg shadow-md text-sm md:text-base break-words ${
        isUser
          ? 'ml-auto bg-purple-100 text-right'
          : 'mr-auto bg-gray-100 text-left'
      }`}
    >
      {content}
    </div>
  );
};

export default MessageBubble;
