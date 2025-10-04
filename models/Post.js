const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  image: { type: String }
});

module.exports = mongoose.model("Post", postSchema);
