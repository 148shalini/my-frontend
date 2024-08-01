import React from 'react';
import API from '../Api';
import './MessageItem.css';

const MessageItem = ({ message }) => {
  const handleResponse = async (accepted) => {
    try {
      await API.post('/respond-to-message/', { messageId: message.id, accepted });
      alert(accepted ? 'Message accepted!' : 'Message rejected!');
      // Optionally, refetch messages here or update UI
    } catch (error) {
      console.error('Failed to respond to message', error);
    }
  };

  return (
    <li className="message-item">
      <p><strong>From:</strong> {message.sender.phone_number}</p>
      <p><strong>Message:</strong> {message.content}</p>
      <div className="message-actions">
        <button className="accept-button" onClick={() => handleResponse(true)}>Accept</button>
        <button className="reject-button" onClick={() => handleResponse(false)}>Reject</button>
      </div>
    </li>
  );
};

export default MessageItem;
