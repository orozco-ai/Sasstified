import React, { useState } from 'react';
import ChatBubble from './ChatBubble';

const ChatWindow = ({ persona }) => {
  const [messages, setMessages] = useState([
    { from: 'avatar', text: `Hi... I’m ${persona}. You can say anything to me.` }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: 'user', text: input };
    const aiResponse = {
      from: 'avatar',
      text: generateAIResponse(input) // Placeholder
    };

    setMessages([...messages, userMsg, aiResponse]);
    setInput('');
  };

  const generateAIResponse = (input) => {
    const flirtyReplies = [
      "Mmm... I like how you talk to me.",
      "That made me smile...",
      "You always say the right things.",
      "I was hoping you'd say that.",
    ];
    const random = flirtyReplies[Math.floor(Math.random() * flirtyReplies.length)];
    return random;
  };

  return (
    <>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} from={msg.from} text={msg.text} />
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </>
  );
};

export default ChatWindow;
