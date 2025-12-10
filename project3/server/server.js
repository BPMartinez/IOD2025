require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");
const eventRoutes = require("./routes/eventRoutes");
const familyRoutes = require("./routes/familyRoutes");

const app = express();

/* =========================================
   CORS – DEV: allow any origin (localhost)
   ========================================= */
app.use(
  cors({
    origin: true,        // reflect request origin
    credentials: true,
  })
);

// Preflight for all routes
app.options("*", cors({ origin: true, credentials: true }));

/* =========================================
   Body parsing
   ========================================= */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* =========================================
   Health check
   ========================================= */
app.get("/", (req, res) => {
  res.send("Besties API is running");
});

/* =========================================
   Routes
   ========================================= */
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/families", familyRoutes);

/* =========================================
   404 for API routes
   ========================================= */
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: "API route not found" });
  }
  next();
});

/* =========================================
   Error handler
   ========================================= */
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Server error",
  });
});

/* =========================================
   Start server
   ========================================= */
const PORT = Number(process.env.PORT) || 5006;

connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(
          `❌ Port ${PORT} already in use. Stop the other process or change PORT in .env.`
        );
        process.exit(1);
      } else {
        throw err;
      }
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
