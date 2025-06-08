// frontend/src/components/Navbar/Navbar.jsx
import React, { useContext, useState, useRef } from "react";
import "./Navbar.css";
import { assets, placeholderImages } from "../../assets/assets.js";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext.jsx";
import Logo from "../Logo/Logo";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getServiceCount, searchServices } = useContext(StoreContext);
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef(null);

  const handleScrollToSection = (sectionId, menuName) => {
    setMenu(menuName);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
    // Focus the input when search is shown
    if (!showSearch) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchInputRef.current.value;
    searchServices(query);
    
    // Scroll to services section to show results
    const element = document.getElementById("services-display");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        <Link
          to="/about"
          onClick={() => setMenu("about")}
          className={menu === "about" ? "active" : ""}
        >
          About Us
        </Link>
        <Link
          to="/"
          onClick={() => handleScrollToSection("explore-services", "services")}
          className={menu === "services" ? "active" : ""}
        >
          Services
        </Link>
        <Link
          to="/"
          onClick={() => handleScrollToSection("how-it-works", "how-it-works")}
          className={menu === "how-it-works" ? "active" : ""}
        >
          How It Works
        </Link>
        <Link
          to="/"
          onClick={() => handleScrollToSection("footer", "contact")}
          className={menu === "contact" ? "active" : ""}
        >
          Contact
        </Link>
      </ul>
      <div className="navbar-right">
        <div className="search-container">
          <img 
            src={placeholderImages.search_icon} 
            alt="Search" 
            onClick={handleSearchClick}
            className="search-icon"
          />
          {showSearch && (
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input 
                type="text" 
                placeholder="Search services..." 
                ref={searchInputRef}
                className="search-input"
              />
              <button type="submit" className="search-button">Search</button>
            </form>
          )}
        </div>
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={placeholderImages.basket_icon} alt="Cart" />
          </Link>
          <div className={getServiceCount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Log In</button>
      </div>
    </div>
  );
};

export default Navbar;