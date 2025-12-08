const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Like = require("../models/Like");


exports.createPost = async (req, res) => {
  try {
    const { userId, title, description, imageUrl } = req.body;

    if (!userId || !title || !description) {
      return res.status(400).json({ message: "userId, title & description are required" });
    }

    const post = await Post.create({
      user: userId,
      title,
      description,
      imageUrl,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username fullName")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error("Error getting posts:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId)
      .populate("user", "username fullName");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comments = await Comment.find({ post: postId })
      .populate("user", "username fullName")
      .sort({ createdAt: -1 });

    const likeCount = await Like.countDocuments({ post: postId });

    res.json({ post, comments, likeCount });
  } catch (err) {
    console.error("Error getting post:", err);
    res.status(500).json({ message: "Server error" });
  }
};
