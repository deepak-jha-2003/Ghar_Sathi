// frontend/src/pages/Home/Home.jsx
import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreServices from "../../components/ExploreServices/ExploreServices";
import ServicesDisplay from "../../components/ServicesDisplay/ServicesDisplay";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import AppDownload from "../../components/AppDownload/AppDownload";

const Home = () => {
  const [category, setCategory] = useState("All");
  
  return (
    <div>
      <Header />
      <ExploreServices category={category} setCategory={setCategory} />
      <ServicesDisplay category={category} />
      <HowItWorks />
      <AppDownload />
    </div>
  );
};

export default Home;