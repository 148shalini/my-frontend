import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

const Chat = ({ roomName }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    };

    ws.current.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      ws.current.close();
    };
  }, [roomName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      ws.current.send(JSON.stringify({ message }));
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

const ChatMessage = ({ message }) => (
  <div className="chat-message">
    <p>{message}</p>
  </div>
);

export default Chat;
