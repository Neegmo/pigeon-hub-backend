const express = require("express");
const router = express.Router();
const EventController = require("../controllers/EventController");
const { authenticateJWT } = require("../middleware/auth");
const { checkEventOwnership } = require("../middleware/ownership");

// Public routes (no authentication required)
router.get("/", EventController.getEvents);
router.get("/:id", EventController.getEventById);

// Protected routes (authentication required)
router.post("/", authenticateJWT, EventController.createEvent);
router.put(
  "/:id",
  authenticateJWT,
  checkEventOwnership,
  EventController.updateEvent
);
router.delete(
  "/:id",
  authenticateJWT,
  checkEventOwnership,
  EventController.deleteEvent
);

module.exports = router;
