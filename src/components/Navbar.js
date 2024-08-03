import React from 'react';
// import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import {jwtDecode} from 'jwt-decode'; 

const Navbar = ({ userInfo, handleLogout }) => {


const phone_number=localStorage.getItem('phone_number')


  return (
    <nav className="navbar">
      <h1>User List</h1>
      <div className="navbar-right">
        {userInfo && <span>{phone_number}</span>}
    
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
