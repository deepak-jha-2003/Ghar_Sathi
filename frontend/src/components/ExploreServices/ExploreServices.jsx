// frontend/src/components/ExploreServices/ExploreServices.jsx
import React from "react";
import "./ExploreServices.css";
import { service_categories } from "../../assets/assets";

const ExploreServices = ({ category, setCategory }) => {
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
              onClick={() =>
                setCategory((prev) =>
                  prev === item.category_id ? "All" : item.category_id
                )
              }
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
    </div>
  );
};

export default ExploreServices;