// frontend/src/components/ServicesDisplay/ServicesDisplay.jsx - Mobile Scroll Fix
import React, { useContext, useEffect, useState } from "react";
import "./ServicesDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import ServiceItem from "../ServiceItem/ServiceItem";
import Pagination from "../Pagination/Pagination";

const ServicesDisplay = ({ category }) => {
  const { 
    services_list, 
    searchQuery, 
    searchResults, 
    isSearching,
    clearSearch,
    performSearch 
  } = useContext(StoreContext);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(12); // Number of services per page

  // Reset to first page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category, searchQuery]);

  // Handle search suggestions clicks
  useEffect(() => {
    const handleSearchEvent = (event) => {
      const query = event.detail;
      performSearch(query);
    };

    window.addEventListener('performSearch', handleSearchEvent);
    
    return () => {
      window.removeEventListener('performSearch', handleSearchEvent);
    };
  }, [performSearch]);

  // Determine which services to display
  const getServicesToDisplay = () => {
    // If there's an active search, use search results
    if (searchQuery && searchQuery.trim() !== "") {
      return searchResults;
    }
    
    // Otherwise, filter by category
    if (category === "All") {
      return services_list;
    }
    
    return services_list.filter(item => item.category === category);
  };

  const allServicesToDisplay = getServicesToDisplay();

  // Calculate pagination
  const totalPages = Math.ceil(allServicesToDisplay.length / servicesPerPage);
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = allServicesToDisplay.slice(indexOfFirstService, indexOfLastService);

  // Enhanced pagination handler with better mobile scroll behavior
  const handlePageChange = (pageNumber) => {
    // Prevent any automatic scrolling here
    // The Pagination component will handle scrolling after content updates
    setCurrentPage(pageNumber);
    
    // Optional: Add a small delay to ensure state updates before scroll
    // This prevents the double-scroll issue on mobile
  };

  // Get category title
  const getCategoryTitle = () => {
    // If searching, show search results title
    if (searchQuery && searchQuery.trim() !== "") {
      return (
        <span>
          Search Results for "{searchQuery}"
          <span className="search-results">
            ({allServicesToDisplay.length} {allServicesToDisplay.length === 1 ? 'service' : 'services'} found)
          </span>
        </span>
      );
    }
    
    // Otherwise show category title
    switch(category) {
      case "All": return "All Services";
      case "cleaning": return "Cleaning Services";
      case "cooking": return "Cooking Services";
      case "babysitting": return "Babysitting Services";
      case "security": return "Security Services";
      case "combo": return "Combo Services";
      default: return "Services";
    }
  };

  // Get category description
  const getCategoryDescription = () => {
    // Don't show description for search results
    if (searchQuery && searchQuery.trim() !== "") {
      return null;
    }
    
    switch(category) {
      case "combo": 
        return "Save more with our combo packages! Get multiple services bundled together at discounted rates.";
      case "cleaning": 
        return "Professional cleaning services for homes, offices, and commercial spaces with verified cleaners.";
      case "cooking": 
        return "Skilled cooks for daily meals, special occasions, and events with flexible timing options.";
      case "babysitting": 
        return "Trusted and trained babysitters for your children with background verification and safety protocols.";
      case "security": 
        return "Professional security services for residential, commercial, and event protection in Surat.";
      default: 
        return null;
    }
  };

  const handleClearSearch = () => {
    clearSearch();
  };

  return (
    <div className="services-display" id="services-display">
      <div className="services-header">
        <h2>{getCategoryTitle()}</h2>
        
        {/* Show clear search button if searching */}
        {searchQuery && searchQuery.trim() !== "" && (
          <button className="clear-search-button" onClick={handleClearSearch}>
            Clear Search ✕
          </button>
        )}
      </div>
      
      {getCategoryDescription() && (
        <p className="combo-description">
          {getCategoryDescription()}
        </p>
      )}
      
      {/* Loading state */}
      {isSearching && (
        <div className="search-loading">
          <p>Searching services...</p>
        </div>
      )}
      
      {/* Search suggestions for no results */}
      {searchQuery && searchQuery.trim() !== "" && allServicesToDisplay.length === 0 && !isSearching && (
        <div className="no-search-results">
          <h3>No services found for "{searchQuery}"</h3>
          <p>Try searching for:</p>
          <div className="search-suggestions-list">
            <span className="suggestion-chip" onClick={() => window.dispatchEvent(new CustomEvent('performSearch', {detail: 'cleaning'}))}>Cleaning</span>
            <span className="suggestion-chip" onClick={() => window.dispatchEvent(new CustomEvent('performSearch', {detail: 'cooking'}))}>Cooking</span>
            <span className="suggestion-chip" onClick={() => window.dispatchEvent(new CustomEvent('performSearch', {detail: 'babysitting'}))}>Babysitting</span>
            <span className="suggestion-chip" onClick={() => window.dispatchEvent(new CustomEvent('performSearch', {detail: 'security'}))}>Security</span>
            <span className="suggestion-chip" onClick={() => window.dispatchEvent(new CustomEvent('performSearch', {detail: 'monthly'}))}>Monthly Services</span>
            <span className="suggestion-chip" onClick={() => window.dispatchEvent(new CustomEvent('performSearch', {detail: 'home'}))}>Home Services</span>
          </div>
          <p className="search-tip">
            <strong>Search Tips:</strong> Try keywords like "home cleaning", "cook for family", "baby care", "office security", etc.
          </p>
        </div>
      )}
      
      {/* Services Grid - Add minimum height to prevent layout shifts */}
      <div className="services-display-list" style={{ minHeight: currentServices.length > 0 ? 'auto' : '400px' }}>
        {currentServices.map((item, index) => (
          <ServiceItem
            key={`${item._id}-${currentPage}`} // Include page in key for proper re-rendering
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            basePrice={item.basePrice}
            onetimePrice={item.onetimePrice}
            monthlyPrice={item.monthlyPrice}
            image={item.image}
            frequency={item.frequency}
            duration={item.duration}
            includes={item.includes}
            propertySize={item.propertySize}
            familySize={item.familySize}
            cookType={item.cookType}
            category={item.category}
            subcategory={item.subcategory}
            ageGroup={item.ageGroup}
            careType={item.careType}
            securityType={item.securityType}
            specialization={item.specialization}
            eventType={item.eventType}
            location={item.location}
            idealFor={item.idealFor}
            features={item.features}
            notes={item.notes}
            options={item.options}
          />
        ))}
      </div>
      
      {/* No services message for category filter */}
      {!searchQuery && allServicesToDisplay.length === 0 && (
        <div className="no-services">
          <p>No services available in this category.</p>
        </div>
      )}

      {/* Pagination Component - Only show if there are items and not searching */}
      {allServicesToDisplay.length > 0 && !isSearching && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={allServicesToDisplay.length}
          itemsPerPage={servicesPerPage}
          showInfo={true}
          className={isSearching ? 'loading' : ''}
        />
      )}
    </div>
  );
};

export default ServicesDisplay;