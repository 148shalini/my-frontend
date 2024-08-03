import React, { useState } from 'react';
import Chat from './Chat';

const ChatRoom = () => {
  const [roomName, setRoomName] = useState('general');

  const handleRoomChange = (e) => {
    setRoomName(e.target.value);
  };

  return (
    <div className="chat-room">
      <select onChange={handleRoomChange} value={roomName}>
        <option value="general">General</option>
        <option value="room1">Room 1</option>
        <option value="room2">Room 2</option>
      </select>
      <Chat roomName={roomName} />
    </div>
  );
};

export default ChatRoom;
