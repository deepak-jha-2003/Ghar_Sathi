// frontend/src/components/ServicesDisplay/ServicesDisplay.jsx
import React, { useContext } from "react";
import "./ServicesDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import ServiceItem from "../ServiceItem/ServiceItem";

const ServicesDisplay = ({ category }) => {
  const { services_list } = useContext(StoreContext);

  // Filter services based on category
  const filteredServices = services_list.filter(item => {
    if (category === "All") return true;
    return item.category === category;
  });

  // Get category title
  const getCategoryTitle = () => {
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

  return (
    <div className="services-display" id="services-display">
      <h2>{getCategoryTitle()}</h2>
      
      {getCategoryDescription() && (
        <p className="combo-description">
          {getCategoryDescription()}
        </p>
      )}
      
      <div className="services-display-list">
        {filteredServices.map((item, index) => (
          <ServiceItem
            key={index}
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
      
      {filteredServices.length === 0 && (
        <div className="no-services">
          <p>No services available in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ServicesDisplay;