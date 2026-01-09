const mysql = require("mysql2");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const email = process.argv[2];
const newPassword = process.argv[3];

if (!email || !newPassword) {
  console.log("Usage: node reset_password.js <email> <new_password>");
  process.exit(1);
}

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect(async (err) => {
  if (err) {
    console.error("Connection failed:", err.message);
    process.exit(1);
  }

  try {
    const hash = await bcrypt.hash(newPassword, 10);
    console.log(`Generated hash for '${newPassword}': ${hash}`);

    const query = "UPDATE users SET password = ? WHERE email = ?";
    connection.query(query, [hash, email], (err, result) => {
      if (err) {
        console.error("Error updating password:", err.message);
      } else {
        if (result.affectedRows === 0) {
          console.log("No user found with that email.");
        } else {
          console.log(`Successfully updated password for ${email}`);
        }
      }
      connection.end();
    });
  } catch (err) {
    console.error("Hashing error:", err);
    connection.end();
  }
});
