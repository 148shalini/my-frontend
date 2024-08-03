import api from '../auth2.js';




// Function to send an interest to a user
export const sendInterest = async (receiverId) => {
  try {
    const response = await api.post('/send-interest/', { receiver: receiverId, status:"awaited" });
    return response.data;
  } catch (error) {
    console.error('Error sending interest:', error);
    throw error;
  }
};

// Function to accept or reject an interest
export const acceptRejectInterest = async (interestId, status) => {
  try {
    const response = await api.post('/accept-reject-interest/', { interest_id: interestId, status });
    return response.data;
  } catch (error) {
    console.error(`Error ${status} interest:`, error);
    throw error;
  }
};

// Function to fetch interests for a user
export const fetchInterests = async () => {
  try {
    const response = await api.get('/received-interests/');
    return response.data;
  } catch (error) {
    console.error('Error fetching interests:', error);
    throw error;
  }
};