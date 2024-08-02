import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import ReceiveMessage from './components/ReceiveMessage';
import Register from './components/Register';
import UserList from './components/UserList';




const App = () => {
  const token = localStorage.getItem('accessToken');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<PrivateRoute element={<Navigate to="/user-list" />} />} />
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/user-list" />} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to="/user-list" />} />
          <Route path="/user-list" element={<PrivateRoute element={<UserList />} />} />
          <Route path="/receive-messages" element={<PrivateRoute element={<ReceiveMessage />} />} />
          

        </Routes>
        {token && <button onClick={handleLogout}>Logout</button>}
      </div>
    </Router>
  );
};

export default App;
