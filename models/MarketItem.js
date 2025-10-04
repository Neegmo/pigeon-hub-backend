const mongoose = require("mongoose");

const marketItemSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MarketItem", marketItemSchema);
