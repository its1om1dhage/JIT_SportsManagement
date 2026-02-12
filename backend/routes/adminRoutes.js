const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

// TEMP: no middleware to avoid crash
router.get("/bookings", adminController.getAllBookings);
router.put("/bookings/:id", adminController.updateBookingStatus);

module.exports = router;
