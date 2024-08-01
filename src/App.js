import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserList from './components/UserList';
import ReceiveMessage from './components/ReceiveMessage';
import API from './Api';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogin = async (username, password) => {
    try {
      const response = await API.post('/login/', { username, password });
      const token = response.data.token;
      setToken(token);
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={token ? <Navigate to="/user-list" /> : <Navigate to="/login" />} />
          <Route path="/login" element={!token ? <Login setToken={handleLogin} /> : <Navigate to="/user-list" />} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to="/user-list" />} />
          <Route path="/user-list" element={token ? <UserList /> : <Navigate to="/login" />} />
          <Route path="/receive-messages" element={token ? <ReceiveMessage /> : <Navigate to="/login" />} />
          {/* Add other routes here */}
        </Routes>
        {token && <button onClick={handleLogout}>Logout</button>}
      </div>
    </Router>
  );
};

export default App;
