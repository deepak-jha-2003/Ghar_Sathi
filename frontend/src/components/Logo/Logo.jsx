// frontend/src/components/Logo/Logo.jsx
import React from 'react';
import './Logo.css';

const Logo = ({ className = '' }) => {
  return (
    <div className={`logo-container ${className}`}>
      <div className="logo-icon">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 5L35 15V25C35 32 30 37 20 39C10 37 5 32 5 25V15L20 5Z" fill="#FF6B6B"/>
          <path d="M20 10L12 15V25C12 28 14 30 20 31C26 30 28 28 28 25V15L20 10Z" fill="white"/>
          <path d="M20 15C22 15 23 16 23 18C23 20 22 21 20 21C18 21 17 20 17 18C17 16 18 15 20 15Z" fill="#FF6B6B"/>
          <path d="M15 25H25L23 22H17L15 25Z" fill="#FF6B6B"/>
        </svg>
      </div>
      <div className="logo-text">
        <span className="logo-title">Ghar Sathi</span>
        <span className="logo-tagline">Your Home Service Partner</span>
      </div>
    </div>
  );
};

export default Logo;