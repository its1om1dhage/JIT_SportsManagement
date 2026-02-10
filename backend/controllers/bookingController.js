const db = require("../db");

// CREATE BOOKING (student requests a slot)
exports.createBooking = (req, res) => {
  const userId = req.user.id; // from JWT
  const { slot_id } = req.body;

  if (!slot_id) {
    return res.status(400).json({ message: "slot_id is required" });
  }

  const sql = `
    INSERT INTO bookings (user_id, slot_id)
    VALUES (?, ?)
  `;

  db.query(sql, [userId, slot_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.status(201).json({
      message: "Booking request submitted. Waiting for admin approval."
    });
  });
};
