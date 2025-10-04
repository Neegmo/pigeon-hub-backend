const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/MessageController");

router.post("/", MessageController.createMessage);
router.get("/", MessageController.getMessages);
router.get("/:id", MessageController.getMessageById);
router.put("/:id", MessageController.updateMessage);
router.delete("/:id", MessageController.deleteMessage);

module.exports = router;
