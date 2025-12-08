const User = require("../models/User");


exports.createUser = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "username, email and password are required" });
    }

    const user = await User.create({
      username,
      email,
      passwordHash: password, 
      fullName,
    });

    res.status(201).json(user);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash"); 
    res.json(users);
  } catch (err) {
    console.error("Error getting users:", err);
    res.status(500).json({ message: "Server error" });
  }
};
