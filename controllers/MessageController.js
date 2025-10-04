const Message = require("../models/Message");

// Create
exports.createMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read all
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate("sender_id receiver_id");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).populate("sender_id receiver_id");
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
