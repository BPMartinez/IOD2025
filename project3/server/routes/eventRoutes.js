// server/routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getEvents,
  createEvent,
  toggleGoing,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/eventController");

// all event routes require auth
router.get("/", auth, getEvents);
router.post("/", auth, createEvent);

router.post("/:id/going", auth, toggleGoing);

router.post("/:id/comments", auth, addComment);
router.put("/:id/comments/:commentId", auth, updateComment);
router.delete("/:id/comments/:commentId", auth, deleteComment);

module.exports = router;
