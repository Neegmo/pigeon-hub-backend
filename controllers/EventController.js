const Event = require("../models/Event");

// Create
exports.createEvent = async (req, res) => {
  try {
    const eventData = { ...req.body, user_id: req.user._id };
    const event = new Event(eventData);
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read all
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("user_id");
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("user_id");
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
