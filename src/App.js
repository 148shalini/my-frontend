import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import ReceiveMessage from './components/ReceiveMessage';
import Register from './components/Register';
import UserList from './components/UserList';
import { getUserInfoFromToken } from './components/Utils';// Assuming you have a utility function to get user info from token

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [userInfo, setUserInfo] = useState(getUserInfoFromToken(token)); // Fetch user info based on the token

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<PrivateRoute element={<Navigate to="/user-list" />} />} />
          <Route path="/login" element={token ? <Navigate to="/user-list" /> : <Login setToken={setToken} />} />
          <Route path="/register" element={token ? <Navigate to="/user-list" /> : <Register />} />
          <Route path="/user-list" element={<PrivateRoute element={<UserList />} />} />
          <Route path="/receive-messages" element={<PrivateRoute element={<ReceiveMessage />} />} />
          {/* <Route path="/user-list" element={<UserList userInfo={userInfo} />} /> */}
          {/* Add other routes here */}
        </Routes>
        {token && <button onClick={() => { localStorage.removeItem('accessToken'); localStorage.removeItem('refreshToken'); setToken(null); }}>Logout</button>}
      </div>
    </Router>
  );
};

export default App;
