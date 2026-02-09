const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/userController");
const { verifyAccessToken } = require("../middleware/authMiddleware");

router.get("/profile", verifyAccessToken, getProfile);

module.exports = router;
