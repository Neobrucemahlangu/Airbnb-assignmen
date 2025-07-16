import React from "react";
import "./HomeSections.css";

const Experiences = () => {
  return (
    <section className="experiences">
      <h2>Discover Airbnb Experiences</h2>
      <p>Unique things to do on your Trip in person or Online</p>
      <div className="experience-images">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUN7gR7hAtA-sxYS_hVY-uck6zLJEpLfQcMg&s" alt="Experience 1"/>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUN7gR7hAtA-sxYS_hVY-uck6zLJEpLfQcMg&s" alt="Experience 2" />
      </div>
    </section>
  );
};

export default Experiences;
