const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: { type: String, required: true },
  photoUrl: { type: String, default: "" },
});

const familySchema = new mongoose.Schema({
  familyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  schoolCode: { type: String, required: true },
  children: [childSchema],   // ⭐ new field
});

module.exports = mongoose.model("Family", familySchema);
