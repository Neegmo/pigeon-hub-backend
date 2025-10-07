const MarketItem = require("../models/MarketItem");

// Create
exports.createMarketItem = async (req, res) => {
  try {
    const itemData = { ...req.body, user_id: req.user._id };
    const item = new MarketItem(itemData);
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read all
exports.getMarketItems = async (req, res) => {
  try {
    const items = await MarketItem.find().populate("user_id");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
exports.getMarketItemById = async (req, res) => {
  try {
    const item = await MarketItem.findById(req.params.id).populate("user_id");
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateMarketItem = async (req, res) => {
  try {
    const item = await MarketItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteMarketItem = async (req, res) => {
  try {
    await MarketItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Market Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
