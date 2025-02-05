// src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../AuthPages.css'; 
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
        let data = JSON.stringify({
            "username": username,
            "password": password
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'localhost:3003/auth/login',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
        const response = axios.request(config);
        if (response.status === 200) {
            setToken(data.token);
            setUser(data.user);
            navigate('/');
        }
    } catch (error) {
        console.log(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{' '}
          <span className="auth-link" onClick={() => navigate('/register')}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;