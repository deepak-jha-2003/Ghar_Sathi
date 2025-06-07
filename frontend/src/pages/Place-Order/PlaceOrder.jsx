// frontend/src/pages/Place-Order/PlaceOrder.jsx
import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItem, services_list, selectedFrequency } = useContext(StoreContext);
  const navigate = useNavigate();
  
  const [bookingDetails, setBookingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    aadharNo: "", // Added Aadhar number field
    gender: "", // Added gender field
    address: "",
    city: "",
    state: "",
    zipCode: "",
    serviceDate: "",
    serviceTime: "",
    specialInstructions: "",
    paymentMethod: "online"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getSelectedServices = () => {
    return services_list.filter(service => cartItem[service._id] > 0);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the booking details to your backend
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
          <input
            type="text"
            name="aadharNo"
            placeholder="Aadhar Number"
            value={bookingDetails.aadharNo}
            onChange={handleInputChange}
            required
          />
          <select
            name="gender"
            value={bookingDetails.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
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
          <div className="multi-field">
            <input
              type="date"
              name="serviceDate"
              min={today}
              value={bookingDetails.serviceDate}
              onChange={handleInputChange}
              required
            />
            <select
              name="serviceTime"
              value={bookingDetails.serviceTime}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Time</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
              <option value="5:00 PM">5:00 PM</option>
            </select>
          </div>
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
            {getSelectedServices().map((service, index) => (
              <div key={index} className="service-summary-item">
                <div>
                  <p className="service-name">{service.name}</p>
                  <p className="service-frequency">
                    {selectedFrequency[service._id] || service.frequency?.[0]}
                  </p>
                </div>
                <p className="service-price">₹{service.price}</p>
              </div>
            ))}
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