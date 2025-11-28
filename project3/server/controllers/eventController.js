// server/controllers/eventController.js
const Event = require("../models/Event");

/**
 * GET /api/events
 * List all events
 */
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    console.error("getEvents error:", err);
    res.status(500).json({ message: "Error loading events" });
  }
};

/**
 * POST /api/events
 * Create a new event
 */
const createEvent = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { title, date, time, location, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const event = await Event.create({
      title: title.trim(),
      date: date || "",
      time: time || "",
      location: location || "",
      description: description || "",
      createdBy: user._id,
    });

    res.status(201).json(event);
  } catch (err) {
    console.error("createEvent error:", err);
    res.status(500).json({ message: "Error creating event" });
  }
};

/**
 * POST /api/events/:id/going
 * Toggle current user's RSVP for the event
 */
const toggleGoing = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const email = user.email;
    const already = event.goingEmails.includes(email);

    event.goingEmails = already
      ? event.goingEmails.filter((e) => e !== email)
      : [...event.goingEmails, email];

    await event.save();
    res.json(event);
  } catch (err) {
    console.error("toggleGoing error:", err);
    res.status(500).json({ message: "Error updating RSVP" });
  }
};

/**
 * POST /api/events/:id/comments
 * Add a comment to an event
 */
const addComment = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text required" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const comment = {
      author: user.familyName || user.email,
      authorEmail: user.email,
      text: text.trim(),
      createdAt: new Date(),
    };

    event.comments.push(comment);
    await event.save();

    res.json(event);
  } catch (err) {
    console.error("addComment error:", err);
    res.status(500).json({ message: "Error adding comment" });
  }
};

/**
 * PUT /api/events/:id/comments/:commentId
 * Edit the current user's comment
 */
const updateComment = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text required" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const comment = event.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.authorEmail !== user.email) {
      return res
        .status(403)
        .json({ message: "You can only edit your own comments" });
    }

    comment.text = text.trim();
    await event.save();

    res.json(event);
  } catch (err) {
    console.error("updateComment error:", err);
    res.status(500).json({ message: "Error updating comment" });
  }
};

/**
 * DELETE /api/events/:id/comments/:commentId
 * Delete the current user's comment
 */
const deleteComment = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const comment = event.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.authorEmail !== user.email) {
      return res
        .status(403)
        .json({ message: "You can only delete your own comments" });
    }

    comment.deleteOne();
    await event.save();

    res.json(event);
  } catch (err) {
    console.error("deleteComment error:", err);
    res.status(500).json({ message: "Error deleting comment" });
  }
};

module.exports = {
  getEvents,
  createEvent,
  toggleGoing,
  addComment,
  updateComment,
  deleteComment,
};
