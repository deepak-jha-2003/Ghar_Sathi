import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cartItem, food_list, removeFromCart, getTotleCartAmount } =
    useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <div>
                <div className="cart-item-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>${item.price * cartItem[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
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
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
        <div className="cart-promocode">
          <p>If you have a promo code , Enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="PromoCode" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
