const express = require("express");
const chatController = require("../controller/chatController");
const verifyUserToken = require("../Helpers/verifyUserToken");
const router = express.Router();

router.get("/chats", verifyUserToken, chatController.getChats);

module.exports = router;
