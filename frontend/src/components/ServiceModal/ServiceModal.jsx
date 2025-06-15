import React from 'react';
import './ServiceModal.css';
import ServiceItem from '../ServiceItem/ServiceItem';
import { StoreContext } from '../../Context/StoreContext';
import { useContext } from 'react';

const ServiceModal = ({ isOpen, onClose, category, services }) => {
  const { services_list } = useContext(StoreContext);

  if (!isOpen) return null;

  // Filter services based on category
  const filteredServices = services_list.filter(service => service.category === category);

  return (
    <div className="service-modal-overlay" onClick={onClose}>
      <div className="service-modal-content" onClick={e => e.stopPropagation()}>
        <button className="service-modal-close" onClick={onClose}>×</button>
        <h2>{category === 'cleaning' ? 'Cleaning Services' :
             category === 'cooking' ? 'Cooking Services' :
             category === 'babysitting' ? 'Babysitting Services' :
             category === 'security' ? 'Security Services' :
             category === 'combo' ? 'Combo Services' : 'Services'}</h2>
        
        <div className="service-modal-grid">
          {filteredServices.map((item) => (
            <ServiceItem
              key={item._id}
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
      </div>
    </div>
  );
};

export default ServiceModal; 