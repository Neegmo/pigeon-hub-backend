const mongoose = require("mongoose");

const pidgeonSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  image: { type: String, default: "" },
  parent1_id: { type: mongoose.Schema.Types.ObjectId, ref: "Pidgeon" },
  parent2_id: { type: mongoose.Schema.Types.ObjectId, ref: "Pidgeon" },
  weight: { type: Number },
  type: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Pidgeon", pidgeonSchema);
