import React, { useEffect, useState } from 'react';
import { fetchMessages, sendMessage } from '../api/messages';
import './Chat.css';

const Chat = ({ chatPartnerId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await fetchMessages(chatPartnerId);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchChatMessages();
  }, [chatPartnerId]);

  const handleSendMessage = async () => {
    try {
      await sendMessage(chatPartnerId, newMessage);
      setMessages([...messages, { content: newMessage, sender: 'you' }]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'you' ? 'sent' : 'received'}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input 
          type="text" 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
