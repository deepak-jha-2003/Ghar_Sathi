import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";

const PlaceOrder = () => {
  const { getTotleCartAmount } = useContext(StoreContext);

  return (
    <form className="place-order">
      <div className="placeorderleft">
        <p className="title">Delivery Information</p>
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
              <p>Delivery Fee</p>
              <p>${getTotleCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-detels">
              <b>Total</b>
              <b>
                ${getTotleCartAmount() === 0 ? 0 : getTotleCartAmount() + 2}
              </b>
            </div>
            <button onClick={() => navigate("/order")}>
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
