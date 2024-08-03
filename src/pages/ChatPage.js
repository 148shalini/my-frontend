import React from 'react';
import Chat from '../components/Chat';
import './ChatPage.css';

const ChatPage = ({ chatPartnerId }) => {
  return (
    <div className="chat-page">
      <h2>Chat with User</h2>
      <Chat chatPartnerId={chatPartnerId} />
    </div>
  );
};

export default ChatPage;
