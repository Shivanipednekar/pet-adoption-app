// src/components/LandingPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Welcome to Pet Adoption</h1>
      <div className="cat-wave">🐱👋</div>
      <div className="button-group">
        <button className="btn" onClick={() => navigate('/register')}>New User</button>
        <button className="btn" onClick={() => navigate('/login')}>Existing User</button>
      </div>
    </div>
  );
};

export default LandingPage;
