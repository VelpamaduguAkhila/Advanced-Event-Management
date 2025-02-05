// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../AuthPages.css'; // Shared CSS for Login and Register pages

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Add registration logic here (e.g., API call)
    console.log('Registering with:', name, email, password);
    navigate('/login'); // Redirect to login page after registration
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Register
          </button>
        </form>
        <p>
          Already have an account?{' '}
          <span className="auth-link" onClick={() => navigate('/login')}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;