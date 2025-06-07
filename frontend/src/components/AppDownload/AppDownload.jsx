// frontend/src/components/AppDownload/AppDownload.jsx
import React from "react";
import "./AppDownload.css";
import { assets, placeholderImages } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <p>
        For Better Experience Download <br />
        <span className="app-name">Ghar Sathi</span> App
      </p>
      <div className="app-features">
        <div className="feature">
          <span className="feature-icon">📱</span>
          <p>Easy Booking</p>
        </div>
        <div className="feature">
          <span className="feature-icon">🔔</span>
          <p>Real-time Updates</p>
        </div>
        <div className="feature">
          <span className="feature-icon">💳</span>
          <p>Secure Payments</p>
        </div>
        <div className="feature">
          <span className="feature-icon">⭐</span>
          <p>Rate & Review</p>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;