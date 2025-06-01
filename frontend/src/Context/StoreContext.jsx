// frontend/src/Context/StoreContext.jsx
import { createContext, useEffect, useState } from "react";
import { services_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const [selectedFrequency, setSelectedFrequency] = useState({});
  const [selectedSize, setSelectedSize] = useState({});
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    time: "",
    address: "",
    specialInstructions: ""
  });

  const addToCart = (itemId, frequency = null, size = null) => {
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
      
      // Set default frequency and size if provided
      if (frequency) {
        setSelectedFrequency((prev) => ({ ...prev, [itemId]: frequency }));
      }
      if (size) {
        setSelectedSize((prev) => ({ ...prev, [itemId]: size }));
      }
    }
  };

  const removeFromCart = (itemId) => {
    setCartItem((prev) => {
      const newCart = { ...prev };
      delete newCart[itemId];
      return newCart;
    });
    
    // Also remove frequency and size selections
    setSelectedFrequency((prev) => {
      const newFreq = { ...prev };
      delete newFreq[itemId];
      return newFreq;
    });
    
    setSelectedSize((prev) => {
      const newSize = { ...prev };
      delete newSize[itemId];
      return newSize;
    });
  };

  const updateServiceFrequency = (itemId, frequency) => {
    setSelectedFrequency((prev) => ({ ...prev, [itemId]: frequency }));
  };

  const updateServiceSize = (itemId, size) => {
    setSelectedSize((prev) => ({ ...prev, [itemId]: size }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = services_list.find((service) => service._id === item);
        if (itemInfo) {
          // Calculate price based on frequency and size
          let price = itemInfo.price;
          
          // Adjust price based on frequency (monthly services might have different pricing)
          const frequency = selectedFrequency[item];
          if (frequency === "Monthly" && itemInfo.frequency?.includes("Monthly")) {
            price = price * 0.9; // 10% discount for monthly subscriptions
          }
          
          totalAmount += price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  const getServiceCount = () => {
    let count = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        count += cartItem[item];
      }
    }
    return count;
  };

  const updateBookingDetails = (details) => {
    setBookingDetails((prev) => ({ ...prev, ...details }));
  };

  const clearCart = () => {
    setCartItem({});
    setSelectedFrequency({});
    setSelectedSize({});
    setBookingDetails({
      date: "",
      time: "",
      address: "",
      specialInstructions: ""
    });
  };

  const contextValue = {
    services_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getServiceCount,
    selectedFrequency,
    selectedSize,
    updateServiceFrequency,
    updateServiceSize,
    bookingDetails,
    updateBookingDetails,
    clearCart
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;