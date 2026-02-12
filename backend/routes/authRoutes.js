const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile
} = require("../controllers/authController");


const { verifyAccessToken } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyAccessToken, getProfile);
router.put("/profile", verifyAccessToken, updateProfile);


module.exports = router;
