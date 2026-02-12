const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const {
  verifyAccessToken,
  verifyAdmin
} = require("../middleware/authMiddleware");

// Get all bookings
router.get(
  "/bookings",
  verifyAccessToken,
  verifyAdmin,
  adminController.getAllBookings
);

// Approve or reject
router.put(
  "/bookings/:id",
  verifyAccessToken,
  verifyAdmin,
  adminController.updateBookingStatus
);

module.exports = router;
