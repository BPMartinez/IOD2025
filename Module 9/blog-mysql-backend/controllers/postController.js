const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const Like = require("../models/likeModel");


exports.createPost = async (req, res) => {
  try {
    const { userId, title, description, imageUrl } = req.body;

    if (!userId || !title || !description) {
      return res
        .status(400)
        .json({ message: "userId, title and description are required" });
    }

    const postId = await Post.createPost({
      userId,
      title,
      description,
      imageUrl,
    });

    const post = await Post.getPostById(postId);
    res.status(201).json(post);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.json(posts);
  } catch (err) {
    console.error("Error getting posts:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.getPostById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comments = await Comment.getCommentsByPost(postId);
    const likeCount = await Like.countLikesForPost(postId);

    res.json({ post, comments, likeCount });
  } catch (err) {
    console.error("Error getting post:", err);
    res.status(500).json({ message: "Server error" });
  }
};
