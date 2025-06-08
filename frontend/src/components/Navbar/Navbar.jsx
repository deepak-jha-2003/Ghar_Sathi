// frontend/src/components/Navbar/Navbar.jsx
import React, { useContext, useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { assets, placeholderImages } from "../../assets/assets.js";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext.jsx";
import Logo from "../Logo/Logo";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { 
    getServiceCount, 
    handleSearchInput, 
    performSearch, 
    clearSearch,
    searchQuery,
    getSearchSuggestions,
    isSearching
  } = useContext(StoreContext);
  
  const [showSearch, setShowSearch] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const handleScrollToSection = (sectionId, menuName) => {
    setMenu(menuName);
    setShowMobileMenu(false); // Close mobile menu when navigating
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    } else {
      // Clear search when closing
      handleClearSearch();
    }
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    
    if (query.trim()) {
      // Get suggestions
      const newSuggestions = getSearchSuggestions(query);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
      
      // Perform real-time search
      handleSearchInput(query);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      clearSearch();
    }
  };

  const handleMobileSearchInputChange = (e) => {
    const query = e.target.value;
    setMobileSearchQuery(query);
    
    if (query.trim()) {
      // Perform real-time search for mobile
      handleSearchInput(query);
    } else {
      clearSearch();
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      performSearch(localSearchQuery);
      setShowSuggestions(false);
      setShowSearch(false); // Close search on mobile after submit
      
      // Scroll to services section to show results
      setTimeout(() => {
        const element = document.getElementById("services-display");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleMobileSearchSubmit = (e) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      performSearch(mobileSearchQuery);
      setShowMobileMenu(false); // Close mobile menu after search
      
      // Scroll to services section
      setTimeout(() => {
        const element = document.getElementById("services-display");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocalSearchQuery(suggestion);
    performSearch(suggestion);
    setShowSuggestions(false);
    setShowSearch(false); // Close search on mobile
    
    // Scroll to services section
    setTimeout(() => {
      const element = document.getElementById("services-display");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleClearSearch = () => {
    setLocalSearchQuery("");
    setMobileSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    clearSearch();
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    // Close search if mobile menu is opening
    if (!showMobileMenu) {
      setShowSearch(false);
      handleClearSearch();
    }
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle escape key to close search and mobile menu
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setShowSuggestions(false);
        if (showSearch) {
          setShowSearch(false);
          handleClearSearch();
        }
        if (showMobileMenu) {
          setShowMobileMenu(false);
        }
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showSearch, showMobileMenu]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileMenu]);

  return (
    <>
      <div className="navbar">
        <Link to="/" onClick={() => setMenu("home")}>
          <Logo />
        </Link>
        
        {/* Desktop Menu */}
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
          {/* Desktop Search */}
          <div className="search-container" ref={searchContainerRef}>
            <img 
              src={placeholderImages.search_icon} 
              alt="Search" 
              onClick={handleSearchClick}
              className="search-icon"
            />
            {showSearch && (
              <div className="search-form-container">
                <form onSubmit={handleSearchSubmit} className="search-form">
                  <input 
                    type="text" 
                    placeholder="Search services..." 
                    ref={searchInputRef}
                    value={localSearchQuery}
                    onChange={handleSearchInputChange}
                    className="search-input"
                  />
                  {localSearchQuery && (
                    <button 
                      type="button" 
                      onClick={handleClearSearch}
                      className="clear-search-btn"
                    >
                      ✕
                    </button>
                  )}
                  <button type="submit" className="search-button">
                    {isSearching ? "..." : "Search"}
                  </button>
                </form>
                
                {showSuggestions && suggestions.length > 0 && (
                  <div className="search-suggestions">
                    {suggestions.map((suggestion, index) => (
                      <div 
                        key={index}
                        className="suggestion-item"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <span className="suggestion-icon">🔍</span>
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Cart Icon */}
          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={placeholderImages.basket_icon} alt="Cart" />
            </Link>
            <div className={getServiceCount() === 0 ? "" : "dot"}></div>
          </div>
          
          {/* Desktop Login Button */}
          <button onClick={() => setShowLogin(true)}>Log In</button>
          
          {/* Mobile Menu Toggle */}
          <div 
            className={`mobile-menu-toggle ${showMobileMenu ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${showMobileMenu ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <Logo />
            <button className="mobile-menu-close" onClick={closeMobileMenu}>
              ✕
            </button>
          </div>
          
          {/* Mobile Navigation */}
          <ul className="mobile-menu-items">
            <li>
              <Link
                to="/"
                onClick={() => { setMenu("home"); closeMobileMenu(); }}
                className={menu === "home" ? "active" : ""}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => { setMenu("about"); closeMobileMenu(); }}
                className={menu === "about" ? "active" : ""}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => handleScrollToSection("explore-services", "services")}
                className={menu === "services" ? "active" : ""}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => handleScrollToSection("how-it-works", "how-it-works")}
                className={menu === "how-it-works" ? "active" : ""}
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => handleScrollToSection("footer", "contact")}
                className={menu === "contact" ? "active" : ""}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                onClick={closeMobileMenu}
              >
                Cart ({getServiceCount()})
              </Link>
            </li>
          </ul>
          
          {/* Mobile Search */}
          <div className="mobile-search-section">
            <h3>Search Services</h3>
            <form onSubmit={handleMobileSearchSubmit} className="mobile-search-form">
              <input
                type="text"
                placeholder="Search for services..."
                value={mobileSearchQuery}
                onChange={handleMobileSearchInputChange}
                className="mobile-search-input"
                ref={mobileSearchInputRef}
              />
              <button type="submit" className="mobile-search-button">
                {isSearching ? "Searching..." : "Search"}
              </button>
            </form>
          </div>
          
          {/* Mobile Login */}
          <div className="mobile-login-section">
            <button 
              className="mobile-login-button"
              onClick={() => { setShowLogin(true); closeMobileMenu(); }}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;