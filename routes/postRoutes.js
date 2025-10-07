const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const { authenticateJWT } = require("../middleware/auth");
const { checkPostOwnership } = require("../middleware/ownership");

// Public routes (no authentication required)
router.get("/", PostController.getPosts);
router.get("/:id", PostController.getPostById);

// Protected routes (authentication required)
router.post("/", authenticateJWT, PostController.createPost);
router.put(
  "/:id",
  authenticateJWT,
  checkPostOwnership,
  PostController.updatePost
);
router.delete(
  "/:id",
  authenticateJWT,
  checkPostOwnership,
  PostController.deletePost
);

module.exports = router;
