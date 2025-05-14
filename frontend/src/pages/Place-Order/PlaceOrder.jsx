import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotleCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: ""
  });

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Here you would typically integrate with a payment gateway
    // For now, we'll just simulate a successful payment
    alert("Payment processed successfully!");
    navigate("/");
  };

  return (
    <form className="place-order" onSubmit={handlePaymentSubmit}>
      <div className="placeorderleft">
        <p className="title">Delivery Information</p>
        <div className="payment-section">
          <p className="title">Payment Information</p>
          <input
            type="text"
            placeholder="Card Number"
            value={paymentDetails.cardNumber}
            onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
            required
          />
          <div className="multifield">
            <input
              type="text"
              placeholder="MM/YY"
              value={paymentDetails.expiryDate}
              onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="CVV"
              value={paymentDetails.cvv}
              onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Card Holder Name"
            value={paymentDetails.cardHolder}
            onChange={(e) => setPaymentDetails({...paymentDetails, cardHolder: e.target.value})}
            required
          />
        </div>
        <div className="multifield">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>
        <input type="email" placeholder="Email address" />
        <input type="text" placeholder="Street" />
        <div className="multifield">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multifield">
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="country" />
        </div>
        <input type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div>
            <div className="cart-total-detels">
              <p>Subtotal</p>
              <p>${getTotleCartAmount()}</p>
            </div>
            <hr />

            <div className="cart-total-detels">
              <p>GST (18%)</p>
              <p>${getTotleCartAmount() === 0 ? 0 : (getTotleCartAmount() * 0.18).toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-detels">
              <b>Total</b>
              <b>
                ${getTotleCartAmount() === 0 ? 0 : (getTotleCartAmount() + (getTotleCartAmount() * 0.18)).toFixed(2)}
              </b>
            </div>
            <button type="submit">
              PAY NOW
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
