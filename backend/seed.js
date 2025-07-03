import mongoose from "mongoose";
import dotenv from "dotenv";
import Listing from "./models/Listing.js";

dotenv.config();

const sampleListings = [
  {
   
    title: "Beach Front Penthouse",
    location: "Cape Town",
    type: "Entire apartment",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["Wifi", "Swimming Pool",],
    rating: 5,
    reviews: 50,
    price: 2000,
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/129880751.jpg?k=222c12edfb8bd7834c03bdee12d47f3e0992f8bc0c8ae84476d35ca5a624583d&o=",
  },
  {
   
    title: "Sandton SunCatcher",
    location: "Johannesburg",
    type: "Loft",
    guests: 2,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["Wifi", "swimming pool"],
    rating: 4.8,
    reviews: 35,
    price: 1500,
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/513141495.jpg?k=795fa9993f6e9a4a2f02a1ed9a9ed48499bf50a7eddbfbb9f19aad0416563bbc&o=",
  },
  {
    
    title: "Wescamp Villa",
    location: "Durban",
    type: "Entire House",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["Fireplace", "Swimming pool"],
    rating: 4.9,
    reviews: 28,
    price: 1800,
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/509546284.jpg?k=a2b06fb7fdb28cb74b1bec8c782194df247782461bdfe895289b827e84f6c1c3&o=",
  },
 {
 
    title: "Zimbali 4 Bedroom with pool ZHB1",
    location: "Durban",
    type: "Apartment",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["Wifi", "Parking"],
    rating: 4.5,
    reviews: 40,
    price: 900,
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max300/201249045.jpg?k=96cb5f7a6f33f9c7eef05984399715884cc7c3ff053b1eede2f414242d4dc96f&o=",
  },
  {
    
    title: "Luxury Villa",
    location: "Stellenbosch",
    type: "Villa",
    guests: 8,
    bedrooms: 4,
    bathrooms: 4,
    amenities: ["Pool", "WiFi", "Free Parking"],
    rating: 5,
    reviews: 60,
    price: 4000,
    imageUrl: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/611388421.jpg?k=96fade3c087b9ff2246211e4df1a5293ccea82516f22ac022c080a4b526dc3be&o=",
  },
];
  


const seedListings = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Listing.deleteMany(); // Clear existing data
    await Listing.insertMany(sampleListings); // Insert sample
    console.log("✅ Listings seeded!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding listings:", err.message);
    process.exit(1);
  }
};

seedListings();
