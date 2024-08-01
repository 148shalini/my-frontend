import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import ReceiveMessage from './components/ReceiveMessage';
import Register from './components/Register';
import UserList from './components/UserList';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<PrivateRoute element={<Navigate to="/user-list" />} />} />
          <Route path="/login" element={token ? <Navigate to="/user-list" /> : <Login setToken={setToken} />} />
          <Route path="/register" element={token ? <Navigate to="/user-list" /> : <Register />} />
          <Route path="/user-list" element={<PrivateRoute element={<UserList />} />} />
          <Route path="/receive-messages" element={<PrivateRoute element={<ReceiveMessage />} />} />
          {/* Add other routes here */}
        </Routes>
        {token && <button onClick={() => { localStorage.removeItem('accessToken'); localStorage.removeItem('refreshToken'); setToken(null); }}>Logout</button>}
      </div>
    </Router>
  );
};

export default App;
