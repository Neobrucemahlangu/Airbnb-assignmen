import express from "express";
import { getAllListings, getListingById, getListingsByHost } from "../controllers/listingController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET all listings
router.get("/", getAllListings);

// GET listing by id
router.get("/:id", getListingById);

// GET listings by host (protected)
router.get("/host", protect, getListingsByHost);

export default router;
