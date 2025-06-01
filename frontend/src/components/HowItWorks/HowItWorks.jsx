// frontend/src/components/HowItWorks/HowItWorks.jsx
import React from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Select Service",
      description: "Browse through our categories and choose the service you need",
      icon: "🔍"
    },
    {
      number: "2",
      title: "Book & Schedule",
      description: "Select your preferred date, time and provide your address",
      icon: "📅"
    },
    {
      number: "3",
      title: "Get Confirmation",
      description: "Receive instant confirmation with service provider details",
      icon: "✅"
    },
    {
      number: "4",
      title: "Service Delivered",
      description: "Our verified professional arrives and completes the service",
      icon: "🏠"
    }
  ];

  return (
    <div className="how-it-works" id="how-it-works">
      <h2>How It Works</h2>
      <p className="how-it-works-subtitle">
        Getting professional home services has never been easier
      </p>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-icon">{step.icon}</div>
            <div className="step-number">Step {step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;