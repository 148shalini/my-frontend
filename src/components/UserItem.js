// src/components/UserItem.js
import React, { useState } from 'react';
import SendMessage from './SendMessage';
import './UserItem.css';

const UserItem = ({ user }) => {
  const [showMessageForm, setShowMessageForm] = useState(false);

  const handleSendMessage = () => {
    setShowMessageForm(true);
  };

  return (
    <li className="user-item">
      <div className="user-info">
        <img src={`https://ui-avatars.com/api/?name=${user.username}&background=random`} alt="User Avatar" className="user-avatar" />
        <div className="user-details">
          <h3 className="user-name">{user.username}</h3>
          <p className="user-phone">{user.phone_number}</p>
        </div>
      </div>
      <button className="send-message-btn" onClick={handleSendMessage}>
        Send Interest
      </button>
      {showMessageForm && <SendMessage receiverId={user.id} />}
    </li>
  );
};

export default UserItem;
