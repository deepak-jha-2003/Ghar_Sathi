// frontend/src/components/ExploreServices/ExploreServices.jsx
import React, { useState } from "react";
import "./ExploreServices.css";
import { service_categories } from "../../assets/assets";
import ServiceModal from "../ServiceModal/ServiceModal";

const ExploreServices = ({ category, setCategory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    if (categoryId === "All") {
      setCategory("All");
      return;
    }
    
    setSelectedCategory(categoryId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div className="explore-services" id="explore-services">
      <h1>Explore Our Services</h1>
      <p className="explore-services-text">
        Choose from our wide range of professional home services. 
        All our service providers are verified, trained, and background-checked 
        to ensure your safety and satisfaction.
      </p>
      <div className="explore-services-list">
        {service_categories.map((item, index) => {
          return (
            <div
              onClick={() => handleCategoryClick(item.category_id)}
              key={index}
              className="explore-services-list-item"
            >
              <img
                className={category === item.category_id ? "active" : ""}
                src={item.category_image}
                alt={item.category_name}
              />
              <p>{item.category_name}</p>
            </div>
          );
        })}
      </div>
      <hr />

      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        category={selectedCategory}
      />
    </div>
  );
};

export default ExploreServices;