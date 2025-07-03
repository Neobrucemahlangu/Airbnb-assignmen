import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyReservations.css";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const { data } = await axios.get("/api/reservations/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setReservations(data);
      } catch (err) {
        setError("Failed to load reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) return;

    try {
      await axios.delete(`/api/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setReservations(reservations.filter((r) => r._id !== id));
    } catch (err) {
      alert("Failed to cancel reservation.");
      console.error(err);
    }
  };

  if (loading) return <p>Loading reservations...</p>;
  if (error) return <p>{error}</p>;
  if (reservations.length === 0) return <p>You have no reservations yet.</p>;

  return (
    <div className="my-reservations">
      <h2>My Reservations</h2>
      {reservations.map((res) => (
        <div key={res._id} className="reservation-card">
          <h3>{res.accommodation?.title}</h3>
          <p>📍 {res.accommodation?.location}</p>
          <p>
            From <strong>{new Date(res.startDate).toLocaleDateString()}</strong> to{" "}
            <strong>{new Date(res.endDate).toLocaleDateString()}</strong>
          </p>
          <p>Guests: {res.guests}</p>
          <p>Total: R{res.totalPrice}</p>
          <button className="cancel-btn" onClick={() => handleCancel(res._id)}>
            Cancel Reservation
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyReservations;

