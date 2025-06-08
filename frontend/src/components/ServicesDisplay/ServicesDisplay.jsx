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
    if (category === "combo") return item.category === "combo";
    return item.category === category;
  });

  return (
    <div className="services-display" id="services-display">
      <h2>
        {category === "All" ? "All Services" : 
         category === "cleaning" ? "Cleaning Services" :
         category === "cooking" ? "Cooking Services" :
         category === "babysitting" ? "Babysitting Services" :
         category === "security" ? "Security Services" :
         category === "rental" ? "Property Rental" :
        //  category === "school_cleaning" ? "School & College Cleaning" :
         category === "combo" ? "Combo Services" : "Services"}
      </h2>
      
      {category === "combo" && (
        <p className="combo-description">
          Save more with our combo packages! Get multiple services bundled together at discounted rates.
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
            image={item.image}
            frequency={item.frequency}
            duration={item.duration}
            includes={item.includes}
            propertySize={item.propertySize}
            familySize={item.familySize}
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