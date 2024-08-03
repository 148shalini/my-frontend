// // src/components/UserItem.js
// import React, { useState } from 'react';
// import SendMessage from './SendMessage';
// import './UserItem.css';

// const UserItem = ({ user }) => {
//   const [showMessageForm, setShowMessageForm] = useState(false);

//   const handleSendMessage = () => {
//     setShowMessageForm(true);
//   };

//   return (
//     <li className="user-item">
//       <div className="user-info">
//         <img src={`https://ui-avatars.com/api/?name=${user.username}&background=random`} alt="User Avatar" className="user-avatar" />
//         <div className="user-details">
//           <h3 className="user-name">{user.username}</h3>
//           <p className="user-phone">{user.phone_number}</p>
//         </div>
//       </div>
//       <button className="send-message-btn" onClick={handleSendMessage}>
//         Send Interest
//       </button>
//       {showMessageForm && <SendMessage receiverId={user.id} />}
//     </li>
//   );
// };

// export default UserItem;


import React, { useState, useEffect } from 'react';
import API from '../Api';
import './UserItem.css';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const UserItem = ({ user }) => {
  const [notificationStatus, setNotificationStatus] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const loggedInUserId = jwtDecode(token).user_id;

  useEffect(() => {
    const checkNotificationStatus = async () => {
      try {
        const response = await API.get(`/notifications/?sender=${loggedInUserId}&receiver=${user.id}`);
        if (response.data.length > 0) {
          const notification = response.data[0];
          if (notification.is_accepted) {
            setNotificationStatus('accepted');
          } else {
            setNotificationStatus('awaiting');
          }
        }
      } catch (error) {
        console.error('Error checking notification status', error);
      }
    };

    checkNotificationStatus();
  }, [user.id, loggedInUserId]);

  const handleSendInterest = async () => {
    try {
      await API.post('/notifications/', { receiver_id: user.id });
      setNotificationStatus('awaiting');
    } catch (error) {
      console.error('Error sending interest', error);
    }
  };

  const handleAcceptNotification = async () => {
    try {
      const response = await API.get(`/notifications/?sender=${user.id}&receiver=${loggedInUserId}`);
      const notification = response.data[0];
      await API.patch(`/notifications/${notification.id}/`, { is_accepted: true });
      setNotificationStatus('accepted');
    } catch (error) {
      console.error('Error accepting notification', error);
    }
  };

  return (
    <li className="user-item">
      <span>{user.phone_number}</span>
      {notificationStatus === 'awaiting' ? (
        <span>Awaiting response...</span>
      ) : notificationStatus === 'accepted' ? (
        <button onClick={() => navigate(`/chat/${user.id}`)}>Send Message</button>
      ) : (
        <button onClick={handleSendInterest}>Send Interest</button>
      )}
    </li>
  );
};

export default UserItem;
