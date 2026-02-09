const db = require("../db");
const jwt = require("jsonwebtoken");

exports.refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  // Verify refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Check token in database
    db.query(
      "SELECT * FROM users WHERE id = ? AND refresh_token = ?",
      [decoded.id, refreshToken],
      (err, results) => {
        if (err || results.length === 0) {
          return res.status(403).json({ message: "Token not recognized" });
        }

        const user = results[0];

        // Create new access token
        const newAccessToken = jwt.sign(
          {
            id: user.id,
            role: user.role,
            email: user.college_email
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );

        res.json({ accessToken: newAccessToken });
      }
    );
  });
};
