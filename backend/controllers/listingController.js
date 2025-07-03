import Listing from "../models/Listing.js";

// Get single listing by ID
export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all listings (for public browsing)
export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find({});
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all listings created by the logged-in host
export const getListingsByHost = async (req, res) => {
  try {
    const listings = await Listing.find({ host: req.user.id });
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch host listings" });
  }
};

