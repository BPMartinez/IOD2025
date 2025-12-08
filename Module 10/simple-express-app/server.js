const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.send("Hello from Bianca's Dockerised Node.js App! 🎉");
});


app.get("/status", (req, res) => {
  res.json({
    status: "ok",
    message: "App is running inside Docker",
    time: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
