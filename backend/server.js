const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  { id: 1, email: "admin@gmail.com", password: "123456" }
];

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (user) {
    res.json({ token: "fake-token", user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(5000, () => {
  console.log("✅ Express server running on http://localhost:5000");
});
