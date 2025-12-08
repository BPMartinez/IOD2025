require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");
const eventRoutes = require("./routes/eventRoutes");
const familyRoutes = require("./routes/familyRoutes");

const app = express();



const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3003",
  "http://localhost:3004",
];


app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);


app.options(
  "*",
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.send("Besties API is running");
});



app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/families", familyRoutes);



app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: "API route not found" });
  }
  next();
});



app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Server error",
  });
});



const PORT = process.env.PORT || 5005;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
