import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={assets.logo} alt="Admin Logo" />
      <div className="navbar-right">
        <img src={assets.user_icon} alt="User" />
      </div>
    </div>
  );
};

export default Navbar;
