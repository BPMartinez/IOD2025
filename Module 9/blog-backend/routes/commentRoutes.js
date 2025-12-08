const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");


router.post("/:postId/comments", commentController.addComment);

module.exports = router;
