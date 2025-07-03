import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // If you're calling this from frontend, include this!
import accommodationRoutes from "./routes/accommodationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";


dotenv.config();

const app = express();

// ------------------------
// ✅ Middleware Section
// ------------------------
app.use(express.json());
app.use(cors()); // Optional but recommended for React frontend

// ------------------------
// ✅ Routes
// ------------------------
app.use("/api/accommodations", accommodationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/reservations", reservationRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ------------------------
// ✅ MongoDB Connection
// ------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// ------------------------
// ✅ Start Server
// ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
