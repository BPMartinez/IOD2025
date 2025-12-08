const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ message: "userId and content are required" });
    }

    const comment = await Comment.create({
      post: postId,
      user: userId,
      content,
    });

    const populated = await comment.populate("user", "username fullName");
    res.status(201).json(populated);
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ message: "Server error" });
  }
};
