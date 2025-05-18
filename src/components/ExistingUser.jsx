// src/components/ExistingUser.jsx

import React, { useState } from 'react';
import '../styles/ExistingUser.css';
import { useNavigate } from 'react-router-dom';

const ExistingUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace this with your actual login logic
   // alert(`Logging in with:\nEmail: ${email}\nPassword: ${password}`);
    navigate('/pets');

  };

  return (
    <div className="login-container">
      <h2>Welcome Back! 🐾</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label>Email:</label>
        <input 
          type="email" 
          required 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />

        <label>Password:</label>
        <input 
          type="password" 
          required 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button type="submit" className="btn-login">Login</button>
      </form>
    </div>
  );
};

export default ExistingUser;
