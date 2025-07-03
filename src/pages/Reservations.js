import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Reservations.css";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios
      .get("/api/reservations/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setReservations(res.data))
      .catch((err) => console.error("Failed to fetch reservations", err));
  }, []);

  if (!reservations.length) return <p>You have no reservations yet.</p>;

  return (
    <div className="reservations-page">
      <h2>My Reservations</h2>
      {reservations.map((res) => (
        <div key={res._id} className="reservation-card">
          <img src={res.listing.images[0]} alt="Listing" />
          <div className="info">
            <h3>{res.listing.title}</h3>
            <p>📍 {res.listing.location}</p>
            <p>🛌 {res.guests} guest(s)</p>
            <p>🗓️ {res.checkIn.split("T")[0]} → {res.checkOut.split("T")[0]}</p>
            <p>💰 R{res.listing.price} / night</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reservations;
