const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate Access Token (15 minutes)
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.college_email
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

// Generate Refresh Token (7 days)
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

// =======================
// REGISTER STUDENT
// =======================
exports.registerUser = async (req, res) => {
  try {
    const {
      student_id,
      full_name,
      college_email,
      password,
      year,
      section,
      branch,
      contact,
      age,
      blood_group,
      gender,
      address,
      medical_info
    } = req.body;

    if (!student_id || !full_name || !college_email || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Check if email exists
    db.query(
      "SELECT id FROM users WHERE college_email = ?",
      [college_email],
      async (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (result.length > 0) {
          return res.status(400).json({ message: "Email already registered" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user
        const sql = `
          INSERT INTO users
          (student_id, full_name, college_email, password_hash, year, section, branch, contact, age, blood_group, gender, address, medical_info)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
          student_id,
          full_name,
          college_email,
          hashedPassword,
          year,
          section,
          branch,
          contact,
          age,
          blood_group,
          gender,
          address,
          medical_info
        ];

        db.query(sql, values, (err) => {
          if (err) return res.status(500).json({ error: err });

          res.status(201).json({
            message: "Student registered successfully ✅"
          });
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// =======================
// LOGIN STUDENT
// =======================
exports.loginUser = (req, res) => {
  const { college_email, password } = req.body;

  if (!college_email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  db.query(
    "SELECT * FROM users WHERE college_email = ?",
    [college_email],
    async (err, results) => {
      if (err) return res.status(500).json({ error: err });

      if (results.length === 0) {
        return res.status(401).json({ message: "User not found" });
      }

      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Create tokens
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      // Save refresh token in DB
      db.query(
        "UPDATE users SET refresh_token = ? WHERE id = ?",
        [refreshToken, user.id]
      );

      res.json({
        message: "Login successful ✅",
        accessToken,
        refreshToken
      });
    }
  );
};


// GET PROFILE
exports.getProfile = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      student_id,
      full_name,
      college_email,
      year,
      section,
      branch,
      contact,
      age,
      blood_group,
      gender,
      address,
      medical_info
    FROM users
    WHERE id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(results[0]);
  });
};


// UPDATE PROFILE
exports.updateProfile = (req, res) => {
  const userId = req.user.id;

  const {
    full_name,
    contact,
    age,
    blood_group,
    gender,
    address,
    medical_info
  } = req.body;

  const sql = `
    UPDATE users
    SET
      full_name = ?,
      contact = ?,
      age = ?,
      blood_group = ?,
      gender = ?,
      address = ?,
      medical_info = ?
    WHERE id = ?
  `;

  const values = [
    full_name,
    contact,
    age,
    blood_group,
    gender,
    address,
    medical_info,
    userId
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: "Profile updated successfully" });
  });
};


// UPDATE BOOKING STATUS
exports.updateBookingStatus = (req, res) => {
  const bookingId = req.params.id;
  const { status, remark } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status required" });
  }

  const sql = `
    UPDATE bookings
    SET status = ?, admin_remark = ?
    WHERE id = ?
  `;

  db.query(sql, [status, remark || null, bookingId], (err, result) => {
    if (err) {
      console.log("Admin update error:", err);
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Booking updated" });
  });
};