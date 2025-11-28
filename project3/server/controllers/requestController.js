const Request = require("../models/Request");
const User = require("../models/User");

exports.createRequest = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const { toEmail, childName, parentName, phone, email, purpose, date, time, notes, photoUrl } =
      req.body;

    const toUser = await User.findOne({ email: toEmail });
    if (!toUser) {
      return res.status(404).json({ message: "Recipient family not found" });
    }

    const request = await Request.create({
      fromUser: fromUserId,
      toUser: toUser._id,
      childName,
      parentName,
      phone,
      email,
      purpose,
      date,
      time,
      notes,
      photoUrl,
    });

    res.status(201).json(request);
  } catch (err) {
    console.error("Create request error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const userId = req.user._id;

    const requests = await Request.find({
      $or: [{ fromUser: userId }, { toUser: userId }],
    })
      .populate("fromUser", "familyName email")
      .populate("toUser", "familyName email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error("Get requests error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getRequestsSentToMe = async (req, res) => {
  try {
    const userId = req.user._id;

    const requests = await Request.find({ toUser: userId })
      .populate("fromUser", "familyName email")
      .populate("toUser", "familyName email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error("Get inbound requests error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { status } = req.body; // "accepted" or "declined"

    const request = await Request.findById(id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (String(request.toUser) !== String(userId)) {
      return res.status(403).json({ message: "You can only update requests sent to you" });
    }

    if (!["accepted", "declined"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    request.status = status;
    await request.save();

    res.json(request);
  } catch (err) {
    console.error("Update status error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updatePlaydateInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { hadPlaydate, playdateComments } = req.body;

    const request = await Request.findById(id);
    if (!request) return res.status(404).json({ message: "Request not found" });


    if (
      String(request.toUser) !== String(userId) &&
      String(request.fromUser) !== String(userId)
    ) {
      return res.status(403).json({ message: "Not your request" });
    }

    if (typeof hadPlaydate === "boolean") {
      request.hadPlaydate = hadPlaydate;
    }
    if (typeof playdateComments === "string") {
      request.playdateComments = playdateComments;
    }

    await request.save();
    res.json(request);
  } catch (err) {
    console.error("Update playdate info error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const request = await Request.findById(id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (String(request.fromUser) !== String(userId)) {
      return res.status(403).json({ message: "You can only delete your own requests" });
    }

    await request.deleteOne();
    res.json({ message: "Request deleted" });
  } catch (err) {
    console.error("Delete request error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
