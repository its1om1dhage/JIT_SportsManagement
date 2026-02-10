const db = require("../db");

// GET ALL BOOKINGS (ADMIN VIEW)
exports.getAllBookings = (req, res) => {
  const sql = `
    SELECT 
      bookings.id,
      users.full_name,
      users.student_id,
      games.name AS game_name,
      slots.day_of_week,
      slots.start_time,
      slots.end_time,
      bookings.status,
      bookings.admin_remark
    FROM bookings
    JOIN users ON bookings.user_id = users.id
    JOIN slots ON bookings.slot_id = slots.id
    JOIN games ON slots.game_id = games.id
    ORDER BY bookings.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    res.json(results);
  });
};

// APPROVE OR REJECT BOOKING
exports.updateBookingStatus = (req, res) => {
  const { booking_id, status, admin_remark } = req.body;

  if (!booking_id || !status) {
    return res.status(400).json({ message: "booking_id and status required" });
  }

  const sql = `
    UPDATE bookings
    SET status = ?, admin_remark = ?
    WHERE id = ?
  `;

  db.query(sql, [status, admin_remark || null, booking_id], (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: "Booking status updated successfully" });
  });
};
