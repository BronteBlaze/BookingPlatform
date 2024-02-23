const express = require("express");
const {
  postInventory,
  getInventory,
  deleteInventory,
} = require("../controller/inventoryController");
const uploadInventory = require("../Helpers/uploadInventory");
const verifyUserToken = require("../Helpers/verifyUserToken");
const router = express.Router();

router.post(
  "/inventory",
  verifyUserToken,
  uploadInventory.single("inventory_image"),
  postInventory
);

router.get("/inventory", verifyUserToken, getInventory);

router.delete("/inventory/:id", verifyUserToken, deleteInventory);

module.exports = router;
