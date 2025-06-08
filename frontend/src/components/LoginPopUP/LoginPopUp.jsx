// frontend/src/components/LoginPopUP/LoginPopUp.jsx
import React, { useState, useEffect } from "react";
import "./LoginPopUp.css";
import { assets, placeholderImages } from "../../assets/assets";

const LoginPopUp = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");

  // Prevent body scroll when modal is open
  useEffect(() => {
    // Add overflow hidden to body when modal opens
    document.body.style.overflow = 'hidden';
    
    // Cleanup function to restore scroll when modal closes
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleTermsClick = (e) => {
    e.preventDefault();
    // Open terms page in new tab/window
    window.open('/terms', '_blank');
  };

  const handleCloseLogin = () => {
    document.body.style.overflow = 'unset';
    setShowLogin(false);
  };

  const handleBackdropClick = (e) => {
    // Close modal if user clicks on backdrop (outside the modal content)
    if (e.target === e.currentTarget) {
      handleCloseLogin();
    }
  };

  return (
    <div className="login-popup" onClick={handleBackdropClick}>
      <form className="login-popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={handleCloseLogin}
            src={placeholderImages.cross_icon}
            alt="Close"
          />
        </div>
        
        <div className="login-popup-info">
          <p>
            {currentState === "Login" 
              ? "Welcome back! Login to book services and track your bookings."
              : "Join Ghar Sathi to access trusted home services at your fingertips."
            }
          </p>
        </div>
        
        <div className="login-popup-input">
          {currentState === "Sign Up" && (
            <input type="text" placeholder="Your name" required />
          )}
          <input type="email" placeholder="Your email" required />
          <input type="password" placeholder="Your password" required />
          {currentState === "Sign Up" && (
            <input type="tel" placeholder="Your phone number" required />
          )}
        </div>
        
        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            By continuing, I agree to the{" "}
            <span onClick={handleTermsClick} className="terms-link">
              terms of use & privacy policy
            </span>.
          </p>
        </div>
        
        {currentState === "Login" ? (
          <p>
            New to Ghar Sathi?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Create account</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
        
        <div className="login-benefits">
          <p className="benefits-title">Why create an account?</p>
          <ul>
            <li>✓ Track your bookings</li>
            <li>✓ Quick re-booking</li>
            <li>✓ Exclusive offers</li>
            <li>✓ Priority support</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default LoginPopUp;