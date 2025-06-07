// frontend/src/components/Footer/Footer.jsx
import React from "react";
import "./Footer.css";
import { assets, placeholderImages } from "../../assets/assets";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <Logo />
          <p>
            Ghar Sathi is your trusted partner for all home services. 
            We connect you with verified professionals for cleaning, cooking, 
            babysitting, security, and more. Experience hassle-free home 
            services with just a few clicks.
          </p>
          <div className="footer-social-icons">
            <img src={placeholderImages.facebook_icon} alt="Facebook" />
            <img src={placeholderImages.twitter_icon} alt="Twitter" />
            <img src={placeholderImages.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>SERVICES</h2>
          <ul>
            <li>Home Cleaning</li>
            <li>Cooking Services</li>
            <li>Babysitting</li>
            <li>Security Guards</li>
            <li>School Cleaning</li>
            <li>Combo Packages</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>📞 +91 9631967939</li>
            <li>✉️ support@gharsathi.com</li>
            <li>📍 Surat, Gujarat</li>
            <li>⏰ Available 24/7</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © Ghar Sathi - All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;