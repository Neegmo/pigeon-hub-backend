const express = require("express");
const router = express.Router();
const MarketItemController = require("../controllers/MarketItemController");

router.post("/", MarketItemController.createMarketItem);
router.get("/", MarketItemController.getMarketItems);
router.get("/:id", MarketItemController.getMarketItemById);
router.put("/:id", MarketItemController.updateMarketItem);
router.delete("/:id", MarketItemController.deleteMarketItem);

module.exports = router;
