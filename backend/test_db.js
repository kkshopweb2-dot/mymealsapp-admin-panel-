const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

console.log("Attempting to connect with:", { ...config, password: "***" });

const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.error("Connection failed:", err.message);
    process.exit(1);
  }
  console.log("Connected successfully!");

  connection.query("SHOW TABLES", (err, results) => {
    if (err) {
      console.error("Error listing tables:", err.message);
    } else {
      console.log("Tables:", results);
    }
    connection.end();
  });
});
