// frontend/src/components/Navbar/Navbar.jsx
import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets, placeholderImages } from "../../assets/assets.js";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext.jsx";
import Logo from "../Logo/Logo";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getServiceCount } = useContext(StoreContext);

  return (
    <div className="navbar">
      <Link to="/">
        <Logo />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-services"
          onClick={() => setMenu("services")}
          className={menu === "services" ? "active" : ""}
        >
          Services
        </a>
        <a
          href="#how-it-works"
          onClick={() => setMenu("how-it-works")}
          className={menu === "how-it-works" ? "active" : ""}
        >
          How It Works
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact")}
          className={menu === "contact" ? "active" : ""}
        >
          Contact
        </a>
      </ul>
      <div className="navbar-right">
        <img src={placeholderImages.search_icon} alt="Search" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={placeholderImages.basket_icon} alt="Cart" />
          </Link>
          <div className={getServiceCount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;