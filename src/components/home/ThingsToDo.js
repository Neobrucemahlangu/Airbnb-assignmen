import React from "react";
import "./HomeSections.css";

const ThingsToDo = () => {
  return (
    <section className="things-to-do">
      <div className="thing">
        <h3>Things to do on your trip</h3>
        <button>Experiences</button>
      </div>
      <div className="thing">
        <h3>Things to do from home</h3>
        <button>Online Experiences</button>
      </div>
    </section>
  );
};

export default ThingsToDo;
