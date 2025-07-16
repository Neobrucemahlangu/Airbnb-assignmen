import React from "react";
import "./LocationDetails.css";

const mockListing = {
  id: "1",
  title: "Beach Front Penthouse",
  location: "Cape Town",
  type: "Entire apartment",
  guests: 2,
  bedrooms: 1,
  bathrooms: 1,
  amenities: ["Wifi", "Swimming Pool", "Free Parking"],
  rating: 5,
  reviews: 50,
  price: 2000,
  description: "Enjoy Stunning Sea front Views",
  images: [
    "https://cf.bstatic.com/xdata/images/hotel/max300/148303636.jpg?k=7b3ea9a0c79eaa73036ede5c1df8957b4a4ef497ec37ce603a137b58b2cb0e11&o=",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/64064556.jpg?k=059db2b4bab794d3851f6ae59a44f582fc6607c031d89d67ec38b7662be9ebe1&o=",
    "https://cf.bstatic.com/xdata/images/hotel/max500/64066441.jpg?k=4a999642ffd82228d7cf4d6a76c340e35751da3949829ba208a1709e5e950d2d&o=",
    "https://cf.bstatic.com/xdata/images/hotel/max300/64064399.jpg?k=699fefc0cfee8ab47b4d9f97a7f13aeadc7ff9da18df990c1dc49060a9ee336f&o=",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/64064042.jpg?k=0eaa28db06a7861ace8834716c221f1bb2771815be4b87af82c32789e608828f&o=",
  ],
};

const LocationDetails = () => {
  const listing = mockListing;

  return (
    <div className="details-page">
      <h2>{listing.type} in {listing.location}</h2>
      <h1>{listing.title}</h1>
      <p>⭐ {listing.rating} · {listing.reviews} reviews · {listing.location}</p>

      {/* Gallery */}
      <div className="gallery">
        <img src={listing.images[0]} alt="Main" className="main-img" />
        <div className="small-imgs">
          {listing.images.slice(1).map((img, i) => (
            <img key={i} src={img} alt={`Small ${i}`} />
          ))}
        </div>
      </div>

      {/* Layout: Left Info + Right Cost */}
      <div className="content">
        <div className="left-info">
          <p>{listing.description}</p>
          <h3>What this place offers</h3>
          <ul>
            {listing.amenities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p><strong>Guests:</strong> {listing.guests}</p>
          <p><strong>Bedrooms:</strong> {listing.bedrooms}</p>
          <p><strong>Bathrooms:</strong> {listing.bathrooms}</p>
        </div>

        <div className="right-cost">
          <div className="cost-box">
            <h3>R{listing.price} / night</h3>
            <hr />
            <p><strong>Total: R{listing.price }</strong></p>
            <button className="reserve-btn">Reserve</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
