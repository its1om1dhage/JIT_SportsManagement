// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");


// Connect Database
const db = require("./db");

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api/auth", authRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("Backend + Database is working securely 🚀");
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
