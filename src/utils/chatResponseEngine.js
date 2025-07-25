// 📁 src/components/ChatWindow.jsx

import React, { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";
import { loadPersona } from "../utils/memoryQuizEngine";
import { generateResponse } from "../utils/chatResponseEngine";

const ChatWindow = ({ persona }) => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [personaData, setPersonaData] = useState(null);

  // Load persona on change
  useEffect(() => {
    const fetchPersona = async () => {
      const data = await loadPersona(persona);
      setPersonaData(data);
      setChat([{ sender: "bot", text: data.intro || `Hi... I’m ${data.name}. You can say anything to me.` }]);
    };
    fetchPersona();
  }, [persona]);

  // Handle user message and AI response
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const updatedChat = [...chat, userMessage];
    setChat(updatedChat);
    setInput("");

    const botReply = await generateResponse(personaData, updatedChat);
    setChat([...updatedChat, { sender: "bot", text: botReply }]);
  };

  return (
    <div className="chat-box">
      <div className="chat-log">
        {chat.map((msg, index) => (
          <ChatBubble key={index} sender={msg.sender} text={msg.text} />
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
