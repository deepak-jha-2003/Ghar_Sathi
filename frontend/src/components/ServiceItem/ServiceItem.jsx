// frontend/src/components/ServiceItem/ServiceItem.jsx
import React, { useContext, useState } from "react";
import "./ServiceItem.css";
import { assets, placeholderImages } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const ServiceItem = ({ 
  id, 
  name, 
  price, 
  basePrice, 
  onetimePrice,
  monthlyPrice,
  description, 
  image, 
  frequency, 
  duration, 
  includes, 
  propertySize, 
  familySize,
  cookType,
  category,
  subcategory,
  ageGroup,
  careType,
  securityType,
  specialization
}) => {
  const { 
    cartItem, 
    addToCart, 
    removeFromCart, 
    updateServiceFrequency, 
    updateServiceSize,
    updateServiceCookType,
    getServicePrice,
    selectedFrequency,
    selectedSize,
    selectedCookType
  } = useContext(StoreContext);
  
  const [showDetails, setShowDetails] = useState(false);

  // Create service object for price calculation
  const serviceObj = {
    _id: id,
    name,
    price,
    basePrice,
    onetimePrice,
    monthlyPrice,
    category,
    subcategory,
    frequency,
    propertySize,
    familySize,
    cookType
  };

  // Get current dynamic price
  const currentPrice = getServicePrice ? getServicePrice(serviceObj) : (onetimePrice || monthlyPrice || price);

  const handleAddToCart = () => {
    const defaultFrequency = frequency ? frequency[0] : null;
    const defaultSize = propertySize ? propertySize[0] : (familySize ? familySize[0] : null);
    const defaultCookType = cookType ? cookType[0] : null;
    addToCart(id, defaultFrequency, defaultSize, defaultCookType);
  };

  // Display price based on service type
  const getPriceDisplay = () => {
    if (onetimePrice && monthlyPrice) {
      const selectedFreq = selectedFrequency[id] || (frequency && frequency[0]);
      if (selectedFreq === "Monthly") {
        return `₹${monthlyPrice}`;
      } else {
        return `₹${onetimePrice}`;
      }
    }
    
    if (basePrice && basePrice !== price.toString()) {
      return basePrice;
    }
    
    return `₹${currentPrice}`;
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
          <p className="service-item-price">{getPriceDisplay()}</p>
          <div className="service-options">
            {/* Frequency selector */}
            {frequency && frequency.length > 1 && cartItem[id] && (
              <select 
                className="frequency-select"
                onChange={(e) => updateServiceFrequency(id, e.target.value)}
                value={selectedFrequency[id] || frequency[0]}
              >
                {frequency.map((freq, index) => (
                  <option key={index} value={freq}>{freq}</option>
                ))}
              </select>
            )}
            
            {/* Property size selector */}
            {propertySize && propertySize.length > 1 && cartItem[id] && (
              <select 
                className="size-select"
                onChange={(e) => updateServiceSize(id, e.target.value)}
                value={selectedSize[id] || propertySize[0]}
              >
                {propertySize.map((size, index) => (
                  <option key={index} value={size}>{size}</option>
                ))}
              </select>
            )}
            
            {/* Family size selector */}
            {familySize && familySize.length > 1 && cartItem[id] && (
              <select 
                className="family-size-select"
                onChange={(e) => updateServiceSize(id, e.target.value)}
                value={selectedSize[id] || familySize[0]}
              >
                {familySize.map((size, index) => (
                  <option key={index} value={size}>{size}</option>
                ))}
              </select>
            )}
            
            {/* Cook type selector */}
            {cookType && cookType.length > 1 && cartItem[id] && (
              <select 
                className="cook-type-select"
                onChange={(e) => updateServiceCookType(id, e.target.value)}
                value={selectedCookType[id] || cookType[0]}
              >
                {cookType.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            )}
          </div>
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
            
            {/* Property sizes display */}
            {propertySize && propertySize.length > 0 && (
              <div className="size-options">
                <h4>Available for:</h4>
                <div className="size-chips">
                  {propertySize.map((size, index) => (
                    <span key={index} className="size-chip">{size}</span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Family sizes display */}
            {familySize && familySize.length > 0 && (
              <div className="size-options">
                <h4>Family Sizes:</h4>
                <div className="size-chips">
                  {familySize.map((size, index) => (
                    <span key={index} className="size-chip">{size}</span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Cook types display */}
            {cookType && cookType.length > 0 && (
              <div className="size-options">
                <h4>Cook Types:</h4>
                <div className="size-chips">
                  {cookType.map((type, index) => (
                    <span key={index} className="size-chip">{type}</span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Age groups for babysitting */}
            {ageGroup && ageGroup.length > 0 && (
              <div className="size-options">
                <h4>Age Groups:</h4>
                <div className="size-chips">
                  {ageGroup.map((age, index) => (
                    <span key={index} className="size-chip">{age}</span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Care types */}
            {careType && careType.length > 0 && (
              <div className="size-options">
                <h4>Care Type:</h4>
                <div className="size-chips">
                  {careType.map((type, index) => (
                    <span key={index} className="size-chip">{type}</span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Security types */}
            {securityType && securityType.length > 0 && (
              <div className="size-options">
                <h4>Security Type:</h4>
                <div className="size-chips">
                  {securityType.map((type, index) => (
                    <span key={index} className="size-chip">{type}</span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Specializations */}
            {specialization && specialization.length > 0 && (
              <div className="size-options">
                <h4>Specializations:</h4>
                <div className="size-chips">
                  {specialization.map((spec, index) => (
                    <span key={index} className="size-chip">{spec}</span>
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