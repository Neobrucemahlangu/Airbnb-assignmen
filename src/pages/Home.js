import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css"

import HeroBanner from "../components/home/HeroBanner";
import Inspiration from "../components/home/Inspiration";
import Experiences from "../components/home/Experiences";
import ThingsToDo from "../components/home/ThingsToDo";
import ShopAirbnb from "../components/home/ShopAirbnb";
import FutureGetaways from "../components/home/FutureGetaways";
import Footer from "../components/Footer";
import HostQuestionBanner from "../components/home/HostQuestionBanner";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await axios.get("/api/listings");
        setListings(data);
      } catch (err) {
        setError("Failed to load listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <>
      <HeroBanner />
      <Inspiration />
      <Experiences />
      <ThingsToDo />
      <ShopAirbnb />
      <HostQuestionBanner />
      <FutureGetaways />

      <section className="listings-section">
        <h2>Available Listings</h2>

        {loading && <p>Loading listings...</p>}
        {error && <p>{error}</p>}

        <div className="listings-grid">
          {listings.map((listing) => (
            <div key={listing._id} className="listing-card">
              <img src={listing.images?.[0] || ""} alt={listing.title} />
              <h3>{listing.title}</h3>
              <p>{listing.location}</p>
              <p>R{listing.price} / night</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
