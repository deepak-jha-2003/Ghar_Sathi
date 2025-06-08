// frontend/src/pages/Cart/Cart.jsx
import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { placeholderImages } from "../../assets/assets";

const Cart = () => {
  const { 
    cartItem, 
    services_list, 
    removeFromCart, 
    getTotalCartAmount,
    selectedFrequency,
    selectedSize,
    updateServiceFrequency,
    updateServiceSize 
  } = useContext(StoreContext);

  const navigate = useNavigate();

  // Function to get dynamic price based on size and frequency
  const getServicePrice = (service) => {
    let basePrice = service.price;
    
    // Get selected size for this service
    const selectedSizeForService = selectedSize[service._id] || (service.propertySize ? service.propertySize[0] : null);
    
    // Calculate price based on property size
    if (service.propertySize && selectedSizeForService) {
      const sizeIndex = service.propertySize.indexOf(selectedSizeForService);
      if (sizeIndex !== -1) {
        // Parse the basePrice string if it contains multiple prices
        if (service.basePrice && service.basePrice.includes('/')) {
          const prices = service.basePrice.split(' / ').map(p => parseInt(p.replace(/[₹,]/g, '')));
          if (prices[sizeIndex]) {
            basePrice = prices[sizeIndex];
          }
        } else {
          // If no basePrice with multiple options, use multipliers
          const sizeMultipliers = [1, 1.5, 2]; // 1BHK, 2BHK, 3BHK multipliers
          if (sizeMultipliers[sizeIndex]) {
            basePrice = service.price * sizeMultipliers[sizeIndex];
          }
        }
      }
    }
    
    // Calculate price based on family size (for cooking services)
    if (service.familySize && selectedSize[service._id]) {
      const selectedFamilySize = selectedSize[service._id];
      const sizeIndex = service.familySize.indexOf(selectedFamilySize);
      if (sizeIndex !== -1 && service.basePrice && service.basePrice.includes('-')) {
        const prices = service.basePrice.split(' - ').map(p => parseInt(p.replace(/[₹,]/g, '')));
        if (prices[sizeIndex]) {
          basePrice = prices[sizeIndex];
        }
      }
    }
    
    // Apply frequency-based pricing
    const selectedFreq = selectedFrequency[service._id];
    if (selectedFreq === "Monthly" && service.frequency?.includes("Monthly")) {
      basePrice = basePrice * 0.9; // 10% discount for monthly
    }
    
    return Math.round(basePrice);
  };

  // Updated getTotalCartAmount to use dynamic pricing
  const getDynamicTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = services_list.find((service) => service._id === item);
        if (itemInfo) {
          const dynamicPrice = getServicePrice(itemInfo);
          totalAmount += dynamicPrice * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  const totalAmount = getDynamicTotalAmount();

  return (
    <div className="cart">
      <div className="cart-header">
        <h1>Your Selected Services</h1>
        <p>Review and customize your service bookings</p>
      </div>
      
      <div className="cart-items">
        {services_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            const servicePrice = getServicePrice(item);
            return (
              <div key={index} className="cart-item-card">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-desc">{item.description}</p>
                  
                  <div className="cart-item-options">
                    {item.frequency && item.frequency.length > 1 && (
                      <div className="option-group">
                        <label>Frequency:</label>
                        <select 
                          value={selectedFrequency[item._id] || item.frequency[0]}
                          onChange={(e) => updateServiceFrequency(item._id, e.target.value)}
                        >
                          {item.frequency.map((freq, idx) => (
                            <option key={idx} value={freq}>{freq}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    
                    {item.propertySize && item.propertySize.length > 1 && (
                      <div className="option-group">
                        <label>Property Size:</label>
                        <select 
                          value={selectedSize[item._id] || item.propertySize[0]}
                          onChange={(e) => updateServiceSize(item._id, e.target.value)}
                        >
                          {item.propertySize.map((size, idx) => (
                            <option key={idx} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    
                    {item.familySize && item.familySize.length > 1 && (
                      <div className="option-group">
                        <label>Family Size:</label>
                        <select 
                          value={selectedSize[item._id] || item.familySize[0]}
                          onChange={(e) => updateServiceSize(item._id, e.target.value)}
                        >
                          {item.familySize.map((size, idx) => (
                            <option key={idx} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="cart-item-price">
                  <p className="price">₹{servicePrice}</p>
                  {selectedFrequency[item._id] === "Monthly" && 
                    <span className="discount-tag">10% off</span>
                  }
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
      
      {Object.keys(cartItem).length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => navigate("/")}>Browse Services</button>
        </div>
      ) : (
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Booking Summary</h2>
            
            <div className="booking-info">
              <p className="info-text">
                <span className="info-icon">📍</span>
                Service location will be added in next step
              </p>
              <p className="info-text">
                <span className="info-icon">📅</span>
                Schedule your preferred date & time
              </p>
              <p className="info-text">
                <span className="info-icon">✅</span>
                All service providers are verified
              </p>
            </div>
            
            <div className="price-details">
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{totalAmount}</p>
              </div>
              <hr />
              
              <div className="cart-total-details">
                <p>GST (18%)</p>
                <p>₹{totalAmount === 0 ? 0 : (totalAmount * 0.18).toFixed(2)}</p>
              </div>
              <hr />
              
              <div className="cart-total-details total">
                <b>Total Amount</b>
                <b>₹{totalAmount === 0 ? 0 : (totalAmount + (totalAmount * 0.18)).toFixed(2)}</b>
              </div>
            </div>
            
            <button 
              className="checkout-btn"
              onClick={() => navigate("/order")}
            >
              PROCEED TO BOOK
            </button>
          </div>
          
          <div className="cart-promocode">
            <h3>Have a Promo Code?</h3>
            <p>Enter your promo code to get additional discount</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Enter promo code" />
              <button>Apply</button>
            </div>
            
            <div className="trust-badges">
              <h3>Why Choose Ghar Sathi?</h3>
              <div className="badge-list">
                <div className="badge">
                  <span className="badge-icon">🛡️</span>
                  <p>100% Verified Professionals</p>
                </div>
                <div className="badge">
                  <span className="badge-icon">💰</span>
                  <p>Transparent Pricing</p>
                </div>
                <div className="badge">
                  <span className="badge-icon">⭐</span>
                  <p>4.8+ Rating</p>
                </div>
                <div className="badge">
                  <span className="badge-icon">🎯</span>
                  <p>On-Time Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;