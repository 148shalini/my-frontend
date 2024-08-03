import React, { useEffect, useState } from 'react';
import api from '../api/interests';
import InterestActions from '../components/InterestActions';
import './InterestsPage.css';

const InterestsPage = () => {
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await api.get('/received-interests/');
        setInterests(response.data);
      } catch (error) {
        console.error('Error fetching interests:', error);
      }
    };

    fetchInterests();
  }, []);

  const handleUpdate = () => {
    fetchInterests();
  };

  return (
    <div className="interests-page">
      <h2>Received Interests</h2>
      {interests.map(interest => (
        <InterestActions key={interest.id} interest={interest} onUpdate={handleUpdate} />
      ))}
    </div>
  );
};

export default InterestsPage;
