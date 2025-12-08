const Like = require("../models/Like");


exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const like = await Like.findOneAndUpdate(
      { post: postId, user: userId },
      { post: postId, user: userId },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(like);
  } catch (err) {
   
    if (err.code === 11000) {
      return res.status(400).json({ message: "Post already liked by this user" });
    }

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

    await Like.findOneAndDelete({ post: postId, user: userId });
    res.json({ message: "Post unliked" });
  } catch (err) {
    console.error("Error unliking post:", err);
    res.status(500).json({ message: "Server error" });
  }
};
