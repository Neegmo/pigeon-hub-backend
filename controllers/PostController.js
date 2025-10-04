const Post = require("../models/Post");

// Create
exports.createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read all
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user_id");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user_id");
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
