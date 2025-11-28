// models/Event.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    author: String,          // display name (familyName or email)
    authorEmail: String,     // for permission checks
    text: String,
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: String,
    time: String,
    location: String,
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    goingEmails: { type: [String], default: [] },

    comments: { type: [commentSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
