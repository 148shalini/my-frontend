import { jwtDecode } from 'jwt-decode';

export const getUserInfoFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return {
      phone_number: decodedToken.phone_number, // Adjust based on your token payload
      id: decodedToken.user_id, // Adjust based on your token payload
    };
  } catch (error) {
    console.error('Error decoding token', error);
    return null;
  }
};
