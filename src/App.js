import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ChatRoom from './components/ChatRoom'; // Import the ChatRoom component
import Login from './components/Login';
import Navbar from './components/Navbar'; // Import the Navbar component
import PrivateRoute from './components/PrivateRoute';
import ReceiveMessage from './components/ReceiveMessage';
import Register from './components/Register';
import UserList from './components/UserList';
import { getUserInfoFromToken } from './components/Utils'; // Import the utility function to decode the token

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (token) {
      setUserInfo(getUserInfoFromToken(token));
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('phone_number');
    setToken(null); // Update state to reflect logout
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="app">
        {token && window.location.pathname !== '/login' && window.location.pathname !== '/register' && (
          <Navbar userInfo={userInfo} handleLogout={handleLogout} />
        )}
        <Routes>
          <Route path="/" element={<PrivateRoute element={<Navigate to="/user-list" />} />} />
          <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/user-list" />} />
          <Route path="/register" element={!token ? <Register setToken={setToken} /> : <Navigate to="/user-list" />} />
          <Route path="/user-list" element={<PrivateRoute element={<UserList userInfo={userInfo} />} />} />
          <Route path="/receive-messages" element={<PrivateRoute element={<ReceiveMessage />} />} />
          <Route path="/chat/:roomName" element={<PrivateRoute element={<ChatRoom />} />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
