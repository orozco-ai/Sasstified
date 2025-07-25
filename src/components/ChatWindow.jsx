//#1 - React & Hooks
import React, { useState, useEffect, useRef } from 'react';

//#2 - ChatBox Component
const ChatBox = ({ selectedPersona }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  //#3 - Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  //#4 - Handle Input Submission
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          persona: selectedPersona,
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();
      if (data && data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  //#5 - Handle Enter Key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  //#6 - JSX Output
  return (
    <div className="flex flex-col h-full bg-white shadow-md rounded-lg p-4 overflow-hidden">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-[75%] ${
              msg.role === 'user'
                ? 'ml-auto bg-blue-100 text-right'
                : 'mr-auto bg-gray-100 text-left'
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center border-t pt-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          rows={1}
          placeholder="Say something sexy, smart, or both..."
          className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="ml-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
