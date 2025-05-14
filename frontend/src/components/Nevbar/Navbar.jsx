import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.jsx";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext.jsx";
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotleCartAmount } = useContext(StoreContext);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <div className="dropdown">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={`${menu === "home" ? "active" : ""} dropdown-trigger`}
          >
            home
          </Link>
          <div className="dropdown-content">
            <Link to="/service/cleaning">House Cleaning</Link>
            <Link to="/service/plumbing">Plumbing</Link>
            <Link to="/service/electrical">Electrical</Link>
            <Link to="/service/painting">Painting</Link>
            <Link to="/service/carpentry">Carpentry</Link>
          </div>
        </div>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact-us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotleCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)}>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
