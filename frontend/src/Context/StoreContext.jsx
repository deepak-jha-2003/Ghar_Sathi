// frontend/src/Context/StoreContext.jsx
import { createContext, useEffect, useState } from "react";
import { services_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const [selectedFrequency, setSelectedFrequency] = useState({});
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedCookType, setSelectedCookType] = useState({});
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    time: "",
    address: "",
    specialInstructions: ""
  });

  const addToCart = (itemId, frequency = null, size = null, cookType = null) => {
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
      
      // Set default frequency, size, and cook type if provided
      const service = services_list.find(s => s._id === itemId);
      
      if (frequency) {
        setSelectedFrequency((prev) => ({ ...prev, [itemId]: frequency }));
      } else if (service?.frequency && service.frequency.length > 0) {
        setSelectedFrequency((prev) => ({ ...prev, [itemId]: service.frequency[0] }));
      }
      
      if (size) {
        setSelectedSize((prev) => ({ ...prev, [itemId]: size }));
      } else {
        // Set default size based on service type
        if (service?.propertySize && service.propertySize.length > 0) {
          setSelectedSize((prev) => ({ ...prev, [itemId]: service.propertySize[0] }));
        } else if (service?.familySize && service.familySize.length > 0) {
          setSelectedSize((prev) => ({ ...prev, [itemId]: service.familySize[0] }));
        }
      }
      
      if (cookType) {
        setSelectedCookType((prev) => ({ ...prev, [itemId]: cookType }));
      } else if (service?.cookType && service.cookType.length > 0) {
        setSelectedCookType((prev) => ({ ...prev, [itemId]: service.cookType[0] }));
      }
    }
  };

  const removeFromCart = (itemId) => {
    setCartItem((prev) => {
      const newCart = { ...prev };
      delete newCart[itemId];
      return newCart;
    });
    
    // Also remove frequency, size, and cook type selections
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

    setSelectedCookType((prev) => {
      const newCookType = { ...prev };
      delete newCookType[itemId];
      return newCookType;
    });
  };

  const updateServiceFrequency = (itemId, frequency) => {
    setSelectedFrequency((prev) => ({ ...prev, [itemId]: frequency }));
  };

  const updateServiceSize = (itemId, size) => {
    setSelectedSize((prev) => ({ ...prev, [itemId]: size }));
  };

  const updateServiceCookType = (itemId, cookType) => {
    setSelectedCookType((prev) => ({ ...prev, [itemId]: cookType }));
  };

  // Function to get dynamic price based on size, frequency, and cook type
  const getServicePrice = (service) => {
    // Check if service has both one-time and monthly prices
    if (service.onetimePrice && service.monthlyPrice) {
      const selectedFreq = selectedFrequency[service._id] || (service.frequency && service.frequency[0]);
      
      if (selectedFreq === "Monthly") {
        return service.monthlyPrice;
      } else {
        return service.onetimePrice;
      }
    }
    
    // For cooking services with cook types and family sizes
    if (service.category === "cooking" && service.cookType && service.familySize) {
      const selectedCookTypeForService = selectedCookType[service._id] || service.cookType[0];
      const selectedFamilySizeForService = selectedSize[service._id] || service.familySize[0];
      
      // Create a mapping key to find the right price
      const serviceKey = `${service.subcategory}-${selectedCookTypeForService}-${selectedFamilySizeForService}`;
      
      // For half-day cooking services
      if (service.subcategory === "Half-Day Cooking") {
        const priceMap = {
          "Half-Day Cooking-Basic Cook-2-3 Members": 5000,
          "Half-Day Cooking-Experienced Cook-2-3 Members": 6500,
          "Half-Day Cooking-Premium Cook-2-3 Members": 8000,
          "Half-Day Cooking-Basic Cook-4-5 Members": 6500,
          "Half-Day Cooking-Experienced Cook-4-5 Members": 8000,
          "Half-Day Cooking-Premium Cook-4-5 Members": 9500,
          "Half-Day Cooking-Basic Cook-6-7 Members": 8000,
          "Half-Day Cooking-Experienced Cook-6-7 Members": 10000,
          "Half-Day Cooking-Premium Cook-6-7 Members": 12000
        };
        return priceMap[serviceKey] || service.price;
      }
      
      // For full-day cooking services
      if (service.subcategory === "Full-Day Cooking") {
        const priceMap = {
          "Full-Day Cooking-Basic Cook-2-3 Members": 9000,
          "Full-Day Cooking-Experienced Cook-2-3 Members": 11000,
          "Full-Day Cooking-Premium Cook-2-3 Members": 13000,
          "Full-Day Cooking-Basic Cook-4-5 Members": 11000,
          "Full-Day Cooking-Experienced Cook-4-5 Members": 13000,
          "Full-Day Cooking-Premium Cook-4-5 Members": 15000,
          "Full-Day Cooking-Basic Cook-6-7 Members": 13000,
          "Full-Day Cooking-Experienced Cook-6-7 Members": 16000,
          "Full-Day Cooking-Premium Cook-6-7 Members": 18500
        };
        return priceMap[serviceKey] || service.price;
      }
    }
    
    // For cleaning services with property sizes
    if (service.propertySize && service.propertySize.length > 1) {
      const selectedSizeForService = selectedSize[service._id] || service.propertySize[0];
      const sizeIndex = service.propertySize.indexOf(selectedSizeForService);
      
      // Monthly packages have specific pricing
      if (service.subcategory === "Monthly Packages") {
        const monthlyPrices = {
          "1BHK": 2999,
          "2BHK": 3599,
          "3BHK": 4299,
          "4BHK": 4599,
          "5BHK": 4999
        };
        return monthlyPrices[selectedSizeForService] || service.price;
      }
      
      // For other cleaning services, use price multipliers
      if (sizeIndex !== -1) {
        const baseMultipliers = [1, 1.2, 1.5]; // Basic multipliers for different sizes
        return Math.round(service.price * (baseMultipliers[sizeIndex] || 1));
      }
    }
    
    // Return the base price without any frequency-based discounts
    return service.monthlyPrice || service.onetimePrice || service.price;
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
    setSelectedCookType({});
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
    selectedCookType,
    updateServiceFrequency,
    updateServiceSize,
    updateServiceCookType,
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