import React from "react";
import HeroBanner from "../components/home/HeroBanner";
import Inspiration from "../components/home/Inspiration";
import Experiences from "../components/home/Experiences";
import ThingsToDo from "../components/home/ThingsToDo";
import ShopAirbnb from "../components/home/ShopAirbnb";
import FutureGetaways from "../components/home/FutureGetaways";
import Footer from "../components/Footer";
import HostQuestionBanner from "../components/home/HostQuestionBanner";



const Home = () => {
  return (
    <>
      <HeroBanner />
      <Inspiration/>
      <Experiences />
      <ThingsToDo />
      <ShopAirbnb />
      <HostQuestionBanner/>
      <FutureGetaways />
      <Footer/>
    </>
  );
};

export default Home;
