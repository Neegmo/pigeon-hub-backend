const express = require("express");
const router = express.Router();
const MarketItemController = require("../controllers/MarketItemController");
const { authenticateJWT } = require("../middleware/auth");
const { checkMarketItemOwnership } = require("../middleware/ownership");

// Public routes (no authentication required)
router.get("/", MarketItemController.getMarketItems);
router.get("/:id", MarketItemController.getMarketItemById);

// Protected routes (authentication required)
router.post("/", authenticateJWT, MarketItemController.createMarketItem);
router.put(
  "/:id",
  authenticateJWT,
  checkMarketItemOwnership,
  MarketItemController.updateMarketItem
);
router.delete(
  "/:id",
  authenticateJWT,
  checkMarketItemOwnership,
  MarketItemController.deleteMarketItem
);

module.exports = router;
