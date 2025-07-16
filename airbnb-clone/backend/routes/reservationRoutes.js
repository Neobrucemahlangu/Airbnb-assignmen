import express from "express";
import {
  createReservation,
  getReservationsByUser,
  getReservationsByHost,
  deleteReservation,
} from "../controllers/reservationController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createReservation);
router.get("/user", protect, getReservationsByUser);
router.get("/host", protect, getReservationsByHost);
router.delete("/:id", protect, deleteReservation);

export default router;
