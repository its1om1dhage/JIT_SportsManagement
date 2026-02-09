const db = require("../db");

exports.getProfile = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT id, student_id, full_name, college_email, year, section, branch, contact, age, blood_group, gender, address, medical_info, photo_url FROM users WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(results[0]);
    }
  );
};
