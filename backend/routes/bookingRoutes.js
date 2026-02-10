const express = require("express");
const router = express.Router();

const { createBooking } = require("../controllers/bookingController");
const { verifyAccessToken } = require("../middleware/authMiddleware");

router.post("/", verifyAccessToken, createBooking);

module.exports = router;
