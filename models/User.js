const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    default: "",
  },
  logindatetime: {
    type: String,
    default: "",
  },
  score: {
    type: Number,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);

