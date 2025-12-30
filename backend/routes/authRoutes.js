import express from "express";
import { loginUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);

// Protected route example
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to Dashboard", user: req.user });
});

export default router;
