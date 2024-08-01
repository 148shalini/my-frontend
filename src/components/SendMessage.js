// src/components/SendMessage.js
import React, { useState } from 'react';
import API from '../Api';
import './SendMessage.css';

const SendMessage = ({ receiverId }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/messages/', { receiverId, message });
      alert('Message sent!');
      setMessage('');
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <div className="send-message-container">
      <h4>Send a message</h4>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          rows="4"
        ></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default SendMessage;
