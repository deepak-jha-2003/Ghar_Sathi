// frontend/src/pages/Place-Order/PlaceOrder.jsx
import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { 
    getTotalCartAmount, 
    cartItem, 
    services_list, 
    selectedFrequency, 
    selectedSize,
    getServicePrice 
  } = useContext(StoreContext);
  
  const navigate = useNavigate();
  
  const [bookingDetails, setBookingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    serviceDate: "",
    startTime: "09:00",
    endTime: "13:00",
    specialInstructions: "",
    paymentMethod: "online"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for time fields
    if (name === "startTime") {
      setBookingDetails(prev => {
        const newDetails = { ...prev, [name]: value };
        
        // Auto-adjust end time to be 4 hours after start time
        if (value) {
          const [startHour, startMinute] = value.split(':').map(Number);
          const endHour = startHour + 4;
          const endTime = `${endHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
          
          // Only auto-adjust if the current end time is the default or earlier than new calculated time
          if (prev.endTime === "13:00" || prev.endTime <= value) {
            newDetails.endTime = endTime;
          }
        }
        
        return newDetails;
      });
    } else if (name === "endTime") {
      // Validate that end time is after start time
      if (value && bookingDetails.startTime && value <= bookingDetails.startTime) {
        alert("End time must be after start time");
        return;
      }
      setBookingDetails(prev => ({ ...prev, [name]: value }));
    } else {
      setBookingDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  // Function to handle clicking on input wrappers
  const handleInputWrapperClick = (inputId) => {
    try {
      const input = document.getElementById(inputId);
      if (input && input.showPicker) {
        input.showPicker();
        
        // Add event listener to close picker when value changes
        const handlePickerClose = () => {
          setTimeout(() => {
            input.blur();
            document.activeElement?.blur();
          }, 200);
          input.removeEventListener('change', handlePickerClose);
        };
        
        input.addEventListener('change', handlePickerClose);
      } else {
        // Fallback for browsers that don't support showPicker
        input.focus();
        input.click();
      }
    } catch (error) {
      // Fallback if showPicker is not supported
      const input = document.getElementById(inputId);
      input.focus();
    }
  };

  // Function to handle time input blur (auto-close picker)
  const handleTimeInputBlur = (e) => {
    // Small delay to allow the picker to register the change
    setTimeout(() => {
      if (document.activeElement !== e.target) {
        e.target.blur();
      }
    }, 100);
  };

  // Function to handle time input change and auto-close
  const handleTimeInputChange = (e) => {
    handleInputChange(e);
    // Auto-close the picker after selection with a small delay
    setTimeout(() => {
      e.target.blur();
      if (document.activeElement === e.target) {
        document.activeElement.blur();
      }
    }, 150);
  };

  // Helper function to format time for display (shorter format)
  const formatTimeDisplay = (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(':');
    const hour12 = parseInt(hours);
    const ampm = hour12 >= 12 ? 'PM' : 'AM';
    const displayHour = hour12 % 12 || 12;
    
    // Only show minutes if they're not 00
    if (minutes === "00") {
      return `${displayHour}:${minutes} ${ampm}`;
    } else {
      return `${displayHour}:${minutes} ${ampm}`;
    }
  };

  // Calculate service duration
  const getServiceDuration = () => {
    if (!bookingDetails.startTime || !bookingDetails.endTime) return "";
    
    const start = new Date(`2000-01-01T${bookingDetails.startTime}:00`);
    const end = new Date(`2000-01-01T${bookingDetails.endTime}:00`);
    const diffMs = end - start;
    const diffMinutes = diffMs / (1000 * 60);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    if (diffMinutes < 0) return "Invalid time range";
    
    if (hours === 0) {
      return `${minutes} minutes`;
    } else if (minutes === 0) {
      return hours === 1 ? "1 hour" : `${hours} hours`;
    } else {
      return `${hours} hours ${minutes} minutes`;
    }
  };

  const getSelectedServices = () => {
    return services_list.filter(service => cartItem[service._id] > 0);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    // Validate time range
    if (bookingDetails.startTime && bookingDetails.endTime && bookingDetails.endTime <= bookingDetails.startTime) {
      alert("End time must be after start time");
      return;
    }
    
    // Here you would typically send the booking details to your backend
    console.log("Booking Details:", {
      ...bookingDetails,
      startTimeDisplay: formatTimeDisplay(bookingDetails.startTime),
      endTimeDisplay: formatTimeDisplay(bookingDetails.endTime),
      duration: getServiceDuration()
    });
    
    alert("Booking confirmed! You will receive a confirmation email shortly.");
    navigate("/");
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <form className="place-order" onSubmit={handleBookingSubmit}>
      <div className="place-order-left">
        <h2 className="title">Booking Information</h2>
        
        <div className="section">
          <h3>Personal Details</h3>
          <div className="multi-field">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={bookingDetails.firstName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={bookingDetails.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={bookingDetails.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={bookingDetails.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="section">
          <h3>Service Location</h3>
          <input
            type="text"
            name="address"
            placeholder="Complete address"
            value={bookingDetails.address}
            onChange={handleInputChange}
            required
          />
          <div className="multi-field">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={bookingDetails.city}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={bookingDetails.state}
              onChange={handleInputChange}
              required
            />
          </div>
          <input
            type="text"
            name="zipCode"
            placeholder="Zip code"
            value={bookingDetails.zipCode}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="section">
          <h3>Schedule Service</h3>
          <div className="service-date-field">
            <label htmlFor="serviceDate">Service Date</label>
            <div className="input-wrapper" onClick={() => handleInputWrapperClick('serviceDate')}>
              <input
                type="date"
                id="serviceDate"
                name="serviceDate"
                min={today}
                value={bookingDetails.serviceDate}
                onChange={handleInputChange}
                required
              />
              <span className="input-icon">📅</span>
            </div>
          </div>
          <div className="multi-field">
            <div className="time-field-group">
              <label htmlFor="startTime">Start Time</label>
              <div className="input-wrapper" onClick={() => handleInputWrapperClick('startTime')}>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={bookingDetails.startTime}
                  onChange={handleTimeInputChange}
                  onBlur={handleTimeInputBlur}
                  min="06:00"
                  max="22:00"
                  step="1800"
                  required
                />
                <span className="input-icon">🕘</span>
              </div>
              <small>Service will begin at this time</small>
            </div>
            <div className="time-field-group">
              <label htmlFor="endTime">End Time</label>
              <div className="input-wrapper" onClick={() => handleInputWrapperClick('endTime')}>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={bookingDetails.endTime}
                  onChange={handleTimeInputChange}
                  onBlur={handleTimeInputBlur}
                  min="07:00"
                  max="23:00"
                  step="1800"
                  required
                />
                <span className="input-icon">🕘</span>
              </div>
              <small>Estimated completion time</small>
            </div>
          </div>
          {bookingDetails.startTime && bookingDetails.endTime && (
            <div className="duration-display">
              <p><strong>Service Duration:</strong> {getServiceDuration()}</p>
              <p><strong>Time Slot:</strong> {formatTimeDisplay(bookingDetails.startTime)} to {formatTimeDisplay(bookingDetails.endTime)}</p>
            </div>
          )}
          <textarea
            name="specialInstructions"
            placeholder="Special instructions (optional)"
            rows="3"
            value={bookingDetails.specialInstructions}
            onChange={handleInputChange}
          />
        </div>

        <div className="section">
          <h3>Payment Method</h3>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="online"
                checked={bookingDetails.paymentMethod === "online"}
                onChange={handleInputChange}
              />
              <span>Online Payment (Cards, UPI, Net Banking)</span>
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={bookingDetails.paymentMethod === "cash"}
                onChange={handleInputChange}
              />
              <span>Cash after service</span>
            </label>
          </div>
        </div>
      </div>

      <div className="place-order-right">
        <div className="order-summary">
          <h2>Booking Summary</h2>
          
          <div className="selected-services">
            <h3>Selected Services</h3>
            {getSelectedServices().map((service, index) => {
              const dynamicPrice = getServicePrice ? getServicePrice(service) : service.price;
              const selectedSizeForService = selectedSize[service._id] || 
                (service.propertySize ? service.propertySize[0] : 
                 service.familySize ? service.familySize[0] : null);
              
              return (
                <div key={index} className="service-summary-item">
                  <div>
                    <p className="service-name">{service.name}</p>
                    <p className="service-frequency">
                      {selectedFrequency[service._id] || service.frequency?.[0]}
                      {selectedSizeForService && ` • ${selectedSizeForService}`}
                    </p>
                  </div>
                  <p className="service-price">₹{dynamicPrice}</p>
                </div>
              );
            })}
          </div>

          <div className="price-summary">
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>GST (18%)</p>
              <p>₹{(getTotalCartAmount() * 0.18).toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details total">
              <b>Total Amount</b>
              <b>₹{(getTotalCartAmount() + (getTotalCartAmount() * 0.18)).toFixed(2)}</b>
            </div>
          </div>

          <button type="submit" className="confirm-booking-btn">
            CONFIRM BOOKING
          </button>

          <div className="booking-notes">
            <p>✓ Free cancellation up to 24 hours before service</p>
            <p>✓ 100% money-back guarantee</p>
            <p>✓ Verified service professionals</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;