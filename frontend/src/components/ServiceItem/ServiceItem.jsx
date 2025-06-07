// frontend/src/components/ServiceItem/ServiceItem.jsx
import React, { useContext, useState } from "react";
import "./ServiceItem.css";
import { assets, placeholderImages } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const ServiceItem = ({ id, name, price, basePrice, description, image, frequency, duration, includes, propertySize, familySize }) => {
  const { cartItem, addToCart, removeFromCart, updateServiceFrequency, updateServiceSize } = useContext(StoreContext);
  const [showDetails, setShowDetails] = useState(false);

  const handleAddToCart = () => {
    const defaultFrequency = frequency ? frequency[0] : null;
    const defaultSize = propertySize ? propertySize[0] : (familySize ? familySize[0] : null);
    addToCart(id, defaultFrequency, defaultSize);
  };

  return (
    <div className="service-item">
      <div className="service-item-img-container">
        <img className="service-item-image" src={image} alt={name} />
        {!cartItem[id] ? (
          <img
            className="add"
            onClick={handleAddToCart}
            src={placeholderImages.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="service-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={placeholderImages.remove_icon_red}
              alt="Remove"
            />
            <p className="added-text">Added</p>
          </div>
        )}
      </div>
      <div className="service-item-info">
        <div className="service-item-name-rating">
          <h3>{name}</h3>
          <img src={placeholderImages.rating_starts} alt="Rating" />
        </div>
        <p className="service-item-desc">{description}</p>
        
        {duration && (
          <div className="service-duration">
            <span className="duration-icon">⏱️</span>
            <span>{duration}</span>
          </div>
        )}
        
        <div className="service-item-price-container">
          <p className="service-item-price">₹{basePrice || price}</p>
          {frequency && frequency.length > 0 && (
            <select 
              className="frequency-select"
              onChange={(e) => updateServiceFrequency(id, e.target.value)}
              disabled={!cartItem[id]}
            >
              {frequency.map((freq, index) => (
                <option key={index} value={freq}>{freq}</option>
              ))}
            </select>
          )}
        </div>
        
        <button 
          className="details-btn" 
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Hide Details" : "View Details"}
        </button>
        
        {showDetails && (
          <div className="service-details">
            {includes && includes.length > 0 && (
              <div className="includes-section">
                <h4>Service Includes:</h4>
                <ul>
                  {includes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {(propertySize || familySize) && (
              <div className="size-options">
                <h4>Available for:</h4>
                <div className="size-chips">
                  {(propertySize || familySize || []).map((size, index) => (
                    <span key={index} className="size-chip">{size}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceItem;