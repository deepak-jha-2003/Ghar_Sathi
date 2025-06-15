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
  
  // New state for search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState(services_list);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

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

  // Search functionality
  const performSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    if (!query || query.trim() === "") {
      setSearchResults([]);
      setFilteredServices(services_list);
      setIsSearching(false);
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    
    const results = services_list.filter(service => {
      // Search in service name
      const nameMatch = service.name.toLowerCase().includes(searchTerm);
      
      // Search in service description
      const descMatch = service.description.toLowerCase().includes(searchTerm);
      
      // Search in service category
      const categoryMatch = service.category.toLowerCase().includes(searchTerm);
      
      // Search in service subcategory
      const subcategoryMatch = service.subcategory.toLowerCase().includes(searchTerm);
      
      // Search in includes array
      const includesMatch = service.includes && 
        service.includes.some(item => item.toLowerCase().includes(searchTerm));
      
      // Search in property sizes
      const propertySizeMatch = service.propertySize && 
        service.propertySize.some(size => size.toLowerCase().includes(searchTerm));
      
      // Search in family sizes
      const familySizeMatch = service.familySize && 
        service.familySize.some(size => size.toLowerCase().includes(searchTerm));
      
      // Search in cook types
      const cookTypeMatch = service.cookType && 
        service.cookType.some(type => type.toLowerCase().includes(searchTerm));
      
      // Search in frequency
      const frequencyMatch = service.frequency && 
        service.frequency.some(freq => freq.toLowerCase().includes(searchTerm));
      
      // Search common keywords
      const keywordMatches = {
        'clean': ['cleaning', 'clean', 'maintenance', 'deep clean'],
        'cook': ['cooking', 'cook', 'chef', 'meal'],
        'baby': ['babysitting', 'baby', 'child', 'kids'],
        'security': ['security', 'guard', 'safety', 'protection'],
        'home': ['home', 'house', 'residential'],
        'office': ['office', 'commercial', 'workplace'],
        'monthly': ['monthly', 'regular', 'subscription'],
        'daily': ['daily', 'everyday'],
        'weekly': ['weekly'],
        'deep': ['deep', 'thorough', 'complete'],
        'bathroom': ['bathroom', 'toilet', 'washroom'],
        'kitchen': ['kitchen', 'cooking area'],
        'window': ['window', 'glass'],
        'event': ['event', 'party', 'wedding']
      };
      
      let keywordMatch = false;
      for (const [key, keywords] of Object.entries(keywordMatches)) {
        if (searchTerm.includes(key)) {
          keywordMatch = keywords.some(keyword => 
            service.name.toLowerCase().includes(keyword) ||
            service.description.toLowerCase().includes(keyword) ||
            service.category.toLowerCase().includes(keyword) ||
            service.subcategory.toLowerCase().includes(keyword)
          );
          if (keywordMatch) break;
        }
      }
      
      return nameMatch || descMatch || categoryMatch || subcategoryMatch || 
             includesMatch || propertySizeMatch || familySizeMatch || 
             cookTypeMatch || frequencyMatch || keywordMatch;
    });

    setSearchResults(results);
    setFilteredServices(results);
    setIsSearching(false);
  };

  // Real-time search as user types
  const handleSearchInput = (query) => {
    performSearch(query);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setFilteredServices(services_list);
    setIsSearching(false);
  };

  // Get search suggestions
  const getSearchSuggestions = (query) => {
    if (!query || query.length < 2) return [];
    
    const suggestions = new Set();
    const searchTerm = query.toLowerCase();
    
    services_list.forEach(service => {
      // Add service names that match
      if (service.name.toLowerCase().includes(searchTerm)) {
        suggestions.add(service.name);
      }
      
      // Add categories that match
      if (service.category.toLowerCase().includes(searchTerm)) {
        suggestions.add(service.category.charAt(0).toUpperCase() + service.category.slice(1) + ' Services');
      }
      
      // Add subcategories that match
      if (service.subcategory.toLowerCase().includes(searchTerm)) {
        suggestions.add(service.subcategory);
      }
    });
    
    return Array.from(suggestions).slice(0, 5); // Limit to 5 suggestions
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
    services_list: filteredServices, // Use filtered services instead of original
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
    getServicePrice,
    // Search functionality
    searchQuery,
    searchResults,
    isSearching,
    performSearch,
    handleSearchInput,
    clearSearch,
    getSearchSuggestions
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;