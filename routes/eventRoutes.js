const express = require("express");
const router = express.Router();
const EventController = require("../controllers/EventController");

router.post("/", EventController.createEvent);
router.get("/", EventController.getEvents);
router.get("/:id", EventController.getEventById);
router.put("/:id", EventController.updateEvent);
router.delete("/:id", EventController.deleteEvent);

module.exports = router;
