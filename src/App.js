import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import ReceiveMessage from './components/ReceiveMessage';
import Register from './components/Register';
import UserList from './components/UserList';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setToken(null); // Update state to reflect logout
    window.location.href = '/login';

  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<PrivateRoute element={<Navigate to="/user-list" />} />} />
          <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/user-list" />} />
          <Route path="/register" element={!token ? <Register setToken={setToken} /> : <Navigate to="/user-list" />} />
          <Route path="/user-list" element={<PrivateRoute element={<UserList />} />} />
          <Route path="/receive-messages" element={<PrivateRoute element={<ReceiveMessage />} />} />
          {/* Add other routes here */}
        </Routes>
        {token && <button onClick={handleLogout}>Logout</button>}
      </div>
    </Router>
  );
};

export default App;
