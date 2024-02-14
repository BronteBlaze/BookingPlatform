const express = require("express");
const {
  postBookingGame,
  getAllBookings,
} = require("../controller/bookingController");
const verifyUserToken = require("../Helpers/verifyUserToken");
const router = express.Router();

router.post("/booking", verifyUserToken, postBookingGame);

router.get("/booking", verifyUserToken, getAllBookings);

module.exports = router;
