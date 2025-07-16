import Reservation from "../models/Reservation.js";

// Create a new reservation
export const createReservation = async (req, res) => {
  const { accommodation, user, guests, startDate, endDate, totalPrice } = req.body;

  try {
    const reservation = new Reservation({
      accommodation,
      user,
      guests,
      startDate,
      endDate,
      totalPrice,
    });

    const savedReservation = await reservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reservations by user
export const getReservationsByUser = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id }).populate("accommodation");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reservations by host (host owns accommodation)
export const getReservationsByHost = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate({
        path: "accommodation",
        match: { host: req.user._id },
      })
      .populate("user");

    // Filter out reservations where accommodation is null (not owned by this host)
    const hostReservations = reservations.filter(r => r.accommodation !== null);

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
    if (reservation.user.toString() !== req.user._id.toString() && req.user.role !== "host") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await reservation.remove();
    res.json({ message: "Reservation removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
