const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");


router.post("/:postId/comments", commentController.addComment);
router.get("/:postId/comments", commentController.getCommentsForPost);

module.exports = router;
