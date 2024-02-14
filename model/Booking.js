const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    device: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    dateOfBooking: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    bookPrice: {
      type: Number,
      required: true,
      default: 150,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
