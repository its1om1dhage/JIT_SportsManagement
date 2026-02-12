const db = require("../db");

// GET ALL BOOKINGS
exports.getAllBookings = (req, res) => {
  const sql = `
    SELECT 
      b.id,
      u.full_name,
      u.student_id,
      g.name AS game_name,
      s.day_of_week,
      s.start_time,
      s.end_time,
      b.status,
      b.admin_remark
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN slots s ON b.slot_id = s.id
    JOIN games g ON s.game_id = g.id
    ORDER BY b.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.log("Admin fetch error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// UPDATE BOOKING STATUS
exports.updateBookingStatus = (req, res) => {
  const bookingId = req.params.id;
  const { status, remark } = req.body;

  const sql = `
    UPDATE bookings
    SET status = ?, admin_remark = ?
    WHERE id = ?
  `;

  db.query(sql, [status, remark || null, bookingId], (err) => {
    if (err) {
      console.log("Admin update error:", err);
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Booking updated" });
  });
};
