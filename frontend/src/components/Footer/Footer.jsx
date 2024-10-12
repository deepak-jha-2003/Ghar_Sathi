import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi velit
            explicabo esse eius tempore accusantium doloribus maiores,
            recusandae voluptatum laborum! Quisquam nesciunt asperiores sequi
            obcaecati, consectetur excepturi veniam ad placeat doloribus nemo,
            quis eaque esse. At vitae nisi doloribus facere.
          </p>
          <div className="footer-socal-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivary</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 9631967939</li>
            <li>deepakjha25112023@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        copyright 2024 tamato.com -All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
