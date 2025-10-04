const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sent_at: { type: Date, default: Date.now },
  message: { type: String },
  image: { type: String }
});

module.exports = mongoose.model("Message", messageSchema);
