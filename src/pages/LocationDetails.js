import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./LocationDetails.css";

const LocationDetails = () => {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data } = await axios.get(`/api/listings/${id}`);
        setListing(data);
      } catch (err) {
        setError("Failed to load listing");
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  const handleReserve = async () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    const days = Math.ceil(
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
    );

    const totalPrice = days * listing.price;

    try {
      await axios.post(
        "/api/reservations",
        {
          accommodation: listing._id || listing.id,
          guests,
          startDate: checkIn,
          endDate: checkOut,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Reservation successful!");
    } catch (error) {
      console.error(error);
      alert("Reservation failed. Make sure you're logged in.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!listing) return <p>Listing not found</p>;

  const totalPrice =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
        ) * listing.price
      : listing.price;

  return (
    <div className="details-page">
      <h2>
        {listing.type} in {listing.location}
      </h2>
      <h1>{listing.title}</h1>
      <p>
        ⭐ {listing.rating} · {listing.reviews} reviews · {listing.location}
      </p>

      {/* Gallery */}
      <div className="gallery">
        <img src={listing.images[0]} alt="Main" className="main-img" />
        <div className="small-imgs">
          {listing.images.slice(1).map((img, i) => (
            <img key={i} src={img} alt={`Small ${i}`} />
          ))}
        </div>
      </div>

      {/* Layout: Left Info + Right Booking */}
      <div className="content">
        <div className="left-info">
          <p>{listing.description}</p>
          <h3>What this place offers</h3>
          <ul>
            {listing.amenities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p>
            <strong>Guests:</strong> {listing.guests}
          </p>
          <p>
            <strong>Bedrooms:</strong> {listing.bedrooms}
          </p>
          <p>
            <strong>Bathrooms:</strong> {listing.bathrooms}
          </p>
        </div>

        <div className="right-cost">
          <div className="cost-box">
            <h3>R{listing.price} / night</h3>
            <hr />

            <label>Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />

            <label>Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />

            <label>Guests</label>
            <input
              type="number"
              min={1}
              max={listing.guests}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />

            {checkIn && checkOut ? (
              <p>
                <strong>Total: R{totalPrice}</strong>
              </p>
            ) : (
              <p>
                <strong>R{listing.price}</strong> per night
              </p>
            )}

            <button className="reserve-btn" onClick={handleReserve}>
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
