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

  // Function to get dynamic price based on size and frequency
  const getServicePrice = (service) => {
    let basePrice = service.price;
    
    // Get selected size for this service
    const selectedSizeForService = selectedSize[service._id] || (service.propertySize ? service.propertySize[0] : (service.familySize ? service.familySize[0] : null));
    
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
    if (service.familySize && selectedSizeForService) {
      const sizeIndex = service.familySize.indexOf(selectedSizeForService);
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

  const getTotalCartAmount = () => {
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
    clearCart,
    getServicePrice // Export the dynamic pricing function
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;