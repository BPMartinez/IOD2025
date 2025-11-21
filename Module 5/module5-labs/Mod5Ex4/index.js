const express = require("express");
const app = express();
const PORT = 3000;

const friendRoutes = require("./friendRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/friends", friendRoutes);

app.get("/", (req, res) => {
  res.send("M5 Lab 4 Express App running.");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
