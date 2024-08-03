import React, { useEffect, useState } from 'react';
import { acceptRejectInterest, sendInterest } from '../api/interests';

const UserItem = ({ user }) => {
  const [interestSent, setInterestSent] = useState(!!user.sent_interest_status);
  const [promptVisible, setPromptVisible] = useState(user.received_interest_status === 'awaited');
  const [interestStatus, setInterestStatus] = useState(user.sent_interest_status || user.received_interest_status);

  useEffect(() => {
    setPromptVisible(user.received_interest_status === 'awaited');
    setInterestStatus(user.sent_interest_status || user.received_interest_status);
  }, [user.received_interest_status, user.sent_interest_status]);

  const handleSendInterest = async () => {
    try {
      const response = await sendInterest(user.id);
      setInterestSent(true);
      setInterestStatus('awaited');
    } catch (error) {
      console.error('Error sending interest:', error);
    }
  };

  const handleAcceptInterest = async () => {
    try {
      await acceptRejectInterest(user.received_interest_id, 'accepted');
      setInterestStatus('accepted');
      setPromptVisible(false);
    } catch (error) {
      console.error('Error accepting interest:', error);
    }
  };

  const handleRejectInterest = async () => {
    try {
      await acceptRejectInterest(user.received_interest_id, 'rejected');
      setInterestStatus('rejected');
      setPromptVisible(false);
    } catch (error) {
      console.error('Error rejecting interest:', error);
    }
  };

  return (
    <li className="user-item">
      <div className="user-info">
        <img
          src={`https://ui-avatars.com/api/?name=${user.phone_number}&background=random`}
          alt="User Avatar"
          className="user-avatar"
        />
        <div className="user-details">
          <h3 className="user-name">{user.phone_number}</h3>
          {interestStatus && <p className="interest-status">Status: {interestStatus}</p>}
        </div>
      </div>
      {!interestSent && (
        <button
          className="send-message-btn"
          onClick={handleSendInterest}
        >
          Send Interest
        </button>
      )}
      {promptVisible && (
        <div className="interest-prompt">
          <p>You have a pending interest request</p>
          <button onClick={handleAcceptInterest}>Accept</button>
          <button onClick={handleRejectInterest}>Reject</button>
        </div>
      )}
    </li>
  );
};

export default UserItem;
