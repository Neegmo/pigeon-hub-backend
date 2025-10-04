const express = require("express");
const router = express.Router();
const PidgeonController = require("../controllers/PigeonController");

router.post("/", PidgeonController.createPidgeon);
router.get("/", PidgeonController.getPidgeons);
router.get("/:id", PidgeonController.getPidgeonById);
router.put("/:id", PidgeonController.updatePidgeon);
router.delete("/:id", PidgeonController.deletePidgeon);

module.exports = router;
