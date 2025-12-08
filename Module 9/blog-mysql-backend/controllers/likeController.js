const Like = require("../models/likeModel");


exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    await Like.likePost({ postId, userId });
    const likeCount = await Like.countLikesForPost(postId);

    res.status(201).json({ message: "Post liked", likeCount });
  } catch (err) {
    console.error("Error liking post:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    await Like.unlikePost({ postId, userId });
    const likeCount = await Like.countLikesForPost(postId);

    res.json({ message: "Post unliked", likeCount });
  } catch (err) {
    console.error("Error unliking post:", err);
    res.status(500).json({ message: "Server error" });
  }
};
