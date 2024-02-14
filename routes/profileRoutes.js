const express = require("express");

const router = express.Router();
const profileController = require("../controller/profileController");
const verifyUserToken = require("../Helpers/verifyUserToken");

router.put("/profile", verifyUserToken, profileController.putUserUpdateData);

router.get("/all-users", verifyUserToken, profileController.getAllUser);

module.exports = router;
