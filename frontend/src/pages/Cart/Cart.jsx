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
    selectedCookType,
    updateServiceFrequency,
    updateServiceSize,
    updateServiceCookType,
    getServicePrice
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const totalAmount = getTotalCartAmount();

  // Get display price for service
  const getDisplayPrice = (service) => {
    return getServicePrice ? getServicePrice(service) : (service.onetimePrice || service.monthlyPrice || service.price);
  };

  return (
    <div className="cart">
      <div className="cart-header">
        <h1>Your Selected Services</h1>
        <p>Review and customize your service bookings</p>
      </div>
      
      <div className="cart-items">
        {services_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            const servicePrice = getDisplayPrice(item);
            const selectedFreq = selectedFrequency[item._id] || (item.frequency && item.frequency[0]);
            const selectedSizeForService = selectedSize[item._id] || 
              (item.propertySize && item.propertySize[0]) ||
              (item.familySize && item.familySize[0]);
            const selectedCookTypeForService = selectedCookType[item._id] || 
              (item.cookType && item.cookType[0]);

            return (
              <div key={index} className="cart-item-card">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-desc">{item.description}</p>
                  
                  <div className="cart-item-options">
                    {/* Frequency selector */}
                    {item.frequency && item.frequency.length > 1 && (
                      <div className="option-group">
                        <label>Frequency:</label>
                        <select 
                          value={selectedFreq}
                          onChange={(e) => updateServiceFrequency(item._id, e.target.value)}
                        >
                          {item.frequency.map((freq, idx) => (
                            <option key={idx} value={freq}>{freq}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    
                    {/* Property size selector */}
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
                    
                    {/* Family size selector */}
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
                    
                    {/* Cook type selector */}
                    {item.cookType && item.cookType.length > 1 && (
                      <div className="option-group">
                        <label>Cook Type:</label>
                        <select 
                          value={selectedCookType[item._id] || item.cookType[0]}
                          onChange={(e) => updateServiceCookType(item._id, e.target.value)}
                        >
                          {item.cookType.map((type, idx) => (
                            <option key={idx} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="cart-item-price">
                  <p className="price">₹{servicePrice}</p>
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