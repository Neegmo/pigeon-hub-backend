const Post = require("../models/Post");
const MarketItem = require("../models/MarketItem");
const Pidgeon = require("../models/Pidgeon");
const Event = require("../models/Event");

// Generic ownership validation middleware
const checkOwnership = (Model) => {
  return async (req, res, next) => {
    try {
      const resource = await Model.findById(req.params.id);

      if (!resource) {
        return res.status(404).json({ error: "Resource not found" });
      }

      // Check if the authenticated user owns this resource
      if (resource.user_id.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({
            error: "Access denied. You can only modify your own resources.",
          });
      }

      // Attach the resource to the request for use in controllers
      req.resource = resource;
      next();
    } catch (err) {
      res.status(500).json({ error: "Error checking ownership" });
    }
  };
};

// Specific ownership validators for each model
const checkPostOwnership = checkOwnership(Post);
const checkMarketItemOwnership = checkOwnership(MarketItem);
const checkPidgeonOwnership = checkOwnership(Pidgeon);
const checkEventOwnership = checkOwnership(Event);

module.exports = {
  checkPostOwnership,
  checkMarketItemOwnership,
  checkPidgeonOwnership,
  checkEventOwnership,
};
