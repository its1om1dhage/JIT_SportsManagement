// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const tokenRoutes = require("./routes/tokenRoutes");
const userRoutes = require("./routes/userRoutes");
const gameRoutes = require("./routes/gameRoutes");
const slotRoutes = require("./routes/slotRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");



// Connect Database
const db = require("./db");

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/token", tokenRoutes);
app.use("/api/user", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);



// Test Route
app.get("/", (req, res) => {
  res.send("Backend + Database is working securely 🚀");
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
