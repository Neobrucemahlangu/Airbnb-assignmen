import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Location.css";

const locationsData = [
  {
    id: "1",
    title: "Cozy Penthouse",
    location: "New York",
    price: "R3000",
    image: "/data:image/jpeg;base64,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",
    type: "Entire apartment",
    amenities: ["wifi", "kitchen", "free parking"],
    rating: 4.5,
    reviews: 30,
  },
  {
    id: "2",
    title: "Luxury Loft in Cape Town",
    location: "Cape Town",
    price: "R5000",
    image: "/images/cape-town.jpg",
    type: "Private room",
    amenities: ["wifi", "pool"],
    rating: 5,
    reviews: 15,
  },
  {
    id: "3",
    title: "Luxury Loft in Durban",
    location: "Durban",
    price: "R2000",
    image: "/images/cape-town.jpg",
    type: "Private room",
    amenities: ["wifi", "pool"],
    rating: 2,
    reviews: 25,
  },
  {
    id: "4",
    title: "Sea View Apartment",
    location: "Cape Town",
    price: "R2000",
    image: "/images/cape-town.jpg",
    type: "Private room",
    amenities: ["wifi", "pool"],
    rating: 5,
    reviews: 250,
  },
  {
    id: "5",
    title: "Sea View Apartment",
    location: "Durban",
    price: "R2000",
    image: "/images/cape-town.jpg",
    type: "Private room",
    amenities: ["wifi", "pool"],
    rating: 5,
    reviews: 250,
  },
  
];

const Location = () => {
  const { city } = useParams();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const filtered = locationsData.filter((listing) =>
      listing.location.toLowerCase() === city.toLowerCase()
    );
    setListings(filtered);
  }, [city]);

  return (
    <div className="location-page">
      <h2>{listings.length} stays in {city}</h2>

      {listings.length === 0 && <p>No listings found for this location.</p>}

      <div className="listings">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="listing-card"
            onClick={() => window.location.href = `/details/${listing.id}`}
          >
            <img src={listing.image} alt={listing.title} />
            <div className="info">
              <h3>{listing.title}</h3>
              <p>{listing.type} • {listing.amenities.join(", ")}</p>
              <p>⭐ {listing.rating} ({listing.reviews} reviews)</p>
              <p><strong>R{listing.price}</strong> / night</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Location;
