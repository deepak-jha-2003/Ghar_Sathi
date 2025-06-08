// frontend/src/pages/About/About.jsx
import React from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";
import { placeholderImages } from "../../assets/assets";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>Welcome to Ghar Sathi</h1>
          <p className="tagline">Your Home's Best Companion</p>
        </div>
      </div>

      <div className="about-main">
        <div className="about-content">
          <h2>Making Home Services Simple & Reliable</h2>
          <p>
            At Ghar Sathi, we understand how valuable your time and comfort are. 
            That's why we're here to help you find trusted and trained domestic helpers with ease. 
            Whether it's cleaning, cooking, babysitting, or security and rental service – we connect 
            you with reliable professionals who treat your home like their own.
          </p>
          <p>
            With our user-friendly platform, verified workers, and real-time support, 
            Ghar Sathi ensures a stress-free experience for every home.
          </p>
        </div>
        <div className="about-image">
          <img 
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&q=80" 
            alt="Happy family at home" 
          />
        </div>
      </div>

      <div className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to bridge the gap between households and skilled domestic workers, 
          providing both safety and satisfaction. We're not just a service – we're your Sathi 
          in every daily task, bringing ease, care, and peace of mind to your home.
        </p>
      </div>

      <div className="stats-section">
        <div className="stat-item">
          <span className="stat-number">10,000+</span>
          <span className="stat-label">Happy Customers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">5,000+</span>
          <span className="stat-label">Verified Professionals</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">25+</span>
          <span className="stat-label">Cities Covered</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">4.8⭐</span>
          <span className="stat-label">Average Rating</span>
        </div>
      </div>

      <div className="why-choose-section">
        <h2>Why Choose Ghar Sathi?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🛡️</span>
            <h3>Trusted & Verified Helpers</h3>
            <p>
              All our service providers undergo thorough background verification 
              and skill assessment to ensure your safety and satisfaction.
            </p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <h3>Easy Booking Process</h3>
            <p>
              Book services in just a few clicks through our user-friendly app 
              or website. Simple, fast, and hassle-free.
            </p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">💰</span>
            <h3>Transparent Pricing</h3>
            <p>
              No hidden charges, no surprises. What you see is what you pay. 
              Clear pricing for all services upfront.
            </p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">🔄</span>
            <h3>Quick Replacements During Leaves</h3>
            <p>
              Never worry about service disruptions. We provide immediate 
              replacements when your regular helper is unavailable.
            </p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">🔒</span>
            <h3>Secure and Supportive Services</h3>
            <p>
              Your security is our priority. With 24/7 support and secure 
              payment options, we've got you covered.
            </p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">⏰</span>
            <h3>Flexible Scheduling</h3>
            <p>
              Services that fit your schedule. Whether daily, weekly, or 
              one-time, we adapt to your needs.
            </p>
          </div>
        </div>
      </div>

      <div className="closing-section">
        <h2>Join the Ghar Sathi Family Today</h2>
        <p>
          Bring ease, care, and peace of mind to your home. Experience the difference 
          of working with verified professionals who care about your satisfaction.
        </p>
        <button 
          className="cta-button"
          onClick={() => navigate("/")}
        >
          Start Booking Services
        </button>
      </div>
    </div>
  );
};

export default About;