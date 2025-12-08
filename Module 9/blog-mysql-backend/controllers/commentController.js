const Comment = require("../models/commentModel");


exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res
        .status(400)
        .json({ message: "userId and content are required" });
    }

    const commentId = await Comment.addComment({
      postId,
      userId,
      content,
    });

    const comments = await Comment.getCommentsByPost(postId);
    const newComment = comments.find((c) => c.comment_id === commentId);

    res.status(201).json(newComment || { comment_id: commentId });
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getCommentsForPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.getCommentsByPost(postId);
    res.json(comments);
  } catch (err) {
    console.error("Error getting comments:", err);
    res.status(500).json({ message: "Server error" });
  }
};
