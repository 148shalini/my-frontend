// src/components/UserItem.js
import React, { useState } from 'react';
import SendMessage from './SendMessage';// Correct the import if it's incorrect
import './UserItem.css';

const UserItem = ({ user }) => {
  const [showMessageForm, setShowMessageForm] = useState(false);

  const handleSendMessage = () => {
    setShowMessageForm(true);
  };

  return (
    <li className="user-item">
      <h3>{user.username}</h3>
      <button onClick={handleSendMessage}>Send Interest</button>
      {showMessageForm && <SendMessage receiverId={user.id} />}
    </li>
  );
};

export default UserItem;
