const bcrypt = require("bcryptjs");
const db = require("./db");

async function setPassword() {
  const password = "admin123";
  const email = "admin@college.edu";

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  db.query(
    "UPDATE users SET password_hash = ?, role = 'admin' WHERE college_email = ?",
    [hash, email],
    (err, result) => {
      if (err) {
        console.log("Error:", err);
      } else {
        console.log("Admin password updated successfully");
      }
      process.exit();
    }
  );
}

setPassword();
