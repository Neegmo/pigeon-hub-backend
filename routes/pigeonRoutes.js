const express = require("express");
const router = express.Router();
const PidgeonController = require("../controllers/PigeonController");
const { authenticateJWT } = require("../middleware/auth");
const { checkPidgeonOwnership } = require("../middleware/ownership");

// Public routes (no authentication required)
router.get("/", PidgeonController.getPidgeons);
router.get("/:id", PidgeonController.getPidgeonById);

// Protected routes (authentication required)
router.post("/", authenticateJWT, PidgeonController.createPidgeon);
router.put(
  "/:id",
  authenticateJWT,
  checkPidgeonOwnership,
  PidgeonController.updatePidgeon
);
router.delete(
  "/:id",
  authenticateJWT,
  checkPidgeonOwnership,
  PidgeonController.deletePidgeon
);

module.exports = router;
