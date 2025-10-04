const Pidgeon = require("../models/Pidgeon");

// Create
exports.createPidgeon = async (req, res) => {
  try {
    const pidgeon = new Pidgeon(req.body);
    await pidgeon.save();
    res.json(pidgeon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read all
exports.getPidgeons = async (req, res) => {
  try {
    const pidgeons = await Pidgeon.find().populate("user_id parent1_id parent2_id");
    res.json(pidgeons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
exports.getPidgeonById = async (req, res) => {
  try {
    const pidgeon = await Pidgeon.findById(req.params.id).populate("user_id parent1_id parent2_id");
    res.json(pidgeon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updatePidgeon = async (req, res) => {
  try {
    const pidgeon = await Pidgeon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(pidgeon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deletePidgeon = async (req, res) => {
  try {
    await Pidgeon.findByIdAndDelete(req.params.id);
    res.json({ message: "Pidgeon deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
