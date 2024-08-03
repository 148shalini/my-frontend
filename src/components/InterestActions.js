import React from 'react';
import { acceptRejectInterest } from '../api/interests';
import './InterestActions.css';

const InterestActions = ({ interest, onUpdate }) => {
  const handleAction = async (status) => {
    try {
      await acceptRejectInterest(interest.id, status);
      onUpdate();
    } catch (error) {
      console.error(`Error ${status} interest:`, error);
    }
  };

  return (
    <div className="interest-actions">
      <p>{interest.sender.username} sent you an interest</p>
      <button onClick={() => handleAction('accepted')} className="accept-btn">Accept</button>
      <button onClick={() => handleAction('rejected')} className="reject-btn">Reject</button>
    </div>
  );
};

export default InterestActions;
