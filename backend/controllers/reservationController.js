import Reservation from "../models/Reservation.js";
import Listing from "../models/Listing.js";

// Create a new reservation
export const createReservation = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { listing: listingId, startDate, endDate, guests } = req.body;

    // Validate required fields
    if (!listingId || !startDate || !endDate || !guests) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the listing to get price & max guests
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (guests > listing.guests) {
      return res.status(400).json({ message: `Max guests is ${listing.guests}` });
    }

    // Calculate total price (price per night * number of nights)
    const start = new Date(startDate);
    const end = new Date(endDate);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (nights <= 0) {
      return res.status(400).json({ message: "Check-out must be after check-in" });
    }
    const totalPrice = listing.price * nights;

    // Create reservation
    const reservation = new Reservation({
      listing: listingId,
      user: userId,
      guests,
      startDate: start,
      endDate: end,
      totalPrice,
    });

    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get reservations by user
export const getReservationsByUser = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id }).populate("listing");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reservations by host (host owns listing)
export const getReservationsByHost = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate({
        path: "listing",
        match: { host: req.user.id },
      })
      .populate("user");

    // Filter out reservations where listing is null (not owned by this host)
    const hostReservations = reservations.filter(r => r.listing !== null);

    res.json(hostReservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a reservation
export const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Only allow user who created reservation or host to delete
    if (reservation.user.toString() !== req.user.id && req.user.role !== "host") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await reservation.remove();
    res.json({ message: "Reservation removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
