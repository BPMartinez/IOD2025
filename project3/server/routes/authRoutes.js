// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// Import controller functions
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/authController");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get current user
router.get("/me", auth, getMe);

module.exports = router;
