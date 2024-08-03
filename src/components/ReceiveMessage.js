// import React, { useState, useEffect } from 'react';
// import API from '../Api';
// import MessageItem from './MessageItem';
// import './ReceiveMessage.css';

// const ReceivedMessages = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await API.get('/received-messages/');
//         setMessages(response.data);
//       } catch (error) {
//         console.error('Failed to fetch messages', error);
//       }
//     };

//     fetchMessages();
//   }, []);

//   return (
//     <div className="received-messages-container">
//       <h2>Received Messages</h2>
//       <ul className="message-list">
//         {messages.map(message => (
//           <MessageItem key={message.id} message={message} />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ReceivedMessages;
import React, { useEffect, useState } from 'react';
import API from '../Api';
import './ReceiveMessage.css';
import {jwtDecode} from 'jwt-decode';

const ReceiveMessage = () => {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem('accessToken');
  const loggedInUserId = jwtDecode(token).user_id;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await API.get(`/notifications/?receiver=${loggedInUserId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications', error);
      }
    };

    fetchNotifications();
  }, [loggedInUserId]);

  const handleAcceptNotification = async (notificationId) => {
    try {
      await API.patch(`/notifications/${notificationId}/`, { is_accepted: true });
      setNotifications(notifications.filter(notification => notification.id !== notificationId));
    } catch (error) {
      console.error('Error accepting notification', error);
    }
  };

  return (
    <div className="receive-message-container">
      <h2>Received Notifications</h2>
      <ul className="notification-list">
        {notifications.map(notification => (
          <li key={notification.id} className="notification-item">
            <span>User {notification.sender_id} sent you an interest.</span>
            <button onClick={() => handleAcceptNotification(notification.id)}>Accept</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReceiveMessage;

