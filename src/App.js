// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import UserList from './components/UserList'; // Import UserList

const App = () => {
  const [token, setToken] = useState('');

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={token ? <UserList /> : <Navigate to="/login" />} />
          <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
