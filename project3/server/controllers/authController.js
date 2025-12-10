// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function generateToken(userId) {
  const secret = process.env.JWT_SECRET || "dev-secret";
  return jwt.sign({ id: userId }, secret, { expiresIn: "7d" });
}

// POST /api/auth/signup
async function registerUser(req, res) {
  try {
    const { familyName, email, password, schoolCode } = req.body;

    if (!familyName || !email || !password) {
      return res.status(400).json({
        message: "Family name, email and password are required",
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // 🔐 hash password
    const hashed = await bcrypt.hash(password, 10);

    // 🔑 IMPORTANT: use passwordHash (matches your schema)
    const user = await User.create({
      familyName,
      email,
      passwordHash: hashed,
      schoolCode: schoolCode || "",
    });

    const token = generateToken(user._id);

    const safeUser = {
      _id: user._id,
      familyName: user.familyName,
      email: user.email,
      schoolCode: user.schoolCode,
    };

    return res.status(201).json({
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("Error in registerUser:", err);
    return res.status(500).json({ message: "Server error during signup" });
  }
}

// POST /api/auth/login
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password" });
    }

    // 🔑 compare against passwordHash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    const safeUser = {
      _id: user._id,
      familyName: user.familyName,
      email: user.email,
      schoolCode: user.schoolCode,
    };

    return res.json({
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("Error in loginUser:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
}

// GET /api/auth/me
async function getMe(req, res) {
  try {
    const user = await User.findById(req.userId).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    console.error("Error in getMe:", err);
    return res.status(500).json({ message: "Server error fetching user" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
