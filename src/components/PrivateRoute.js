import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('accessToken'); // Retrieve access token from local storage

  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
