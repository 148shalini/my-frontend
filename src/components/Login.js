import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import API from '../Api';
import './Login.css';

const Login = ({ setToken }) => {
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/login/', { phone_number, password });

      if (response.status === 200) { // Check if the status code is 200
        console.log('API Response:', response.data); // Log the response data for debugging
        const { access, refresh } = response.data; // Extract both tokens from response

        if (access && refresh) { // Check if tokens are present
          setToken(access); // Set the access token
          localStorage.setItem('accessToken', access); // Store access token in local storage
          localStorage.setItem('refreshToken', refresh); // Store refresh token in local storage
          setError(''); // Clear any previous error
          navigate('/user-list'); // Redirect to /user-list
        } else {
          throw new Error('Tokens not received'); // Handle missing tokens
        }
      } else {
        throw new Error('Unexpected response status'); // Handle unexpected status codes
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      // Set a more detailed error message if available
      setError(error.response && error.response.data && error.response.data.detail 
        ? error.response.data.detail 
        : 'Invalid phone number or password.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="phone_number">Mobile Number</label>
          <input
            id="phone_number"
            type="text"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your mobile number"
            aria-required="true"
            aria-label="Mobile Number"
          />
        </div>
        <div className="input-group password-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            aria-required="true"
            aria-label="Password"
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
