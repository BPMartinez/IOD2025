const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    childName: { type: String, required: true },
    parentName: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    purpose: { type: String, enum: ["Playdate", "Carpool", "Other"], default: "Playdate" },
    date: { type: String },   
    time: { type: String },
    notes: { type: String },
    photoUrl: { type: String },

    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
    hadPlaydate: { type: Boolean, default: false },
    playdateComments: { type: String, default: "" },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
