const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middleware/authMiddleware");
const { getAllBookings, updateBookingStatus } = require("../controllers/adminController");

// ADMIN: view all bookings
router.get("/bookings", verifyAccessToken, getAllBookings);

// ADMIN: approve/reject
router.post("/booking/update", verifyAccessToken, updateBookingStatus);

module.exports = router;
