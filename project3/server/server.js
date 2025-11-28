// server/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Route modules
const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");
const eventRoutes = require("./routes/eventRoutes");
const familyRoutes = require("./routes/familyRoutes"); 

const app = express();

/* =========================================
   CORS – allow requests from frontend
   ========================================= */
app.use(
  cors({
    origin: "http://localhost:3000", // reflect the request origin (use specific origin in production)
    credentials: true,
  })
);
// Handle preflight for all routes
app.options("*", cors());

/* =========================================
   Body parsing middleware
   ========================================= */
app.use(express.json({ limit: "10mb" })); // allow base64 photos etc.
app.use(express.urlencoded({ extended: true }));

/* =========================================
   Basic health-check route
   ========================================= */
app.get("/", (req, res) => {
  res.send("Besties API is running");
});

/* =========================================
   API routes
   ========================================= */
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/families", familyRoutes); 

/* =========================================
   404 handler for unknown API routes
   ========================================= */
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: "API route not found" });
  }
  next();
});

/* =========================================
   Global error handler (optional but helpful)
   ========================================= */
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error" });
});

/* =========================================
   Start Server
   ========================================= */
const PORT = process.env.PORT || 5005; // default 5005 to match client.js

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1);
  });
