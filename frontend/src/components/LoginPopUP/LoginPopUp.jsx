// frontend/src/components/LoginPopUP/LoginPopUp.jsx
import React, { useState } from "react";
import "./LoginPopUp.css";
import { assets, placeholderImages } from "../../assets/assets";

const LoginPopUp = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
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
        
        <button>
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
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