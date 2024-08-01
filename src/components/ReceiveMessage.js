import React, { useState, useEffect } from 'react';
import API from '../Api';
import MessageItem from './MessageItem';
import './ReceiveMessage.css';

const ReceivedMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await API.get('/received-messages/');
        setMessages(response.data);
      } catch (error) {
        console.error('Failed to fetch messages', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="received-messages-container">
      <h2>Received Messages</h2>
      <ul className="message-list">
        {messages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}
      </ul>
    </div>
  );
};

export default ReceivedMessages;
