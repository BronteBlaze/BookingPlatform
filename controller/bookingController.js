const User = require("../model/User");
const Booking = require("../model/Booking");
const calculateMiddleTime = require("../Helpers/calculateMiddleTime");

exports.postBookingGame = async (req, res, next) => {
  const { device, duration, dateOfBooking, startTime, endTime } = req.body;

  try {
    const user = await User.findById(req.user);

    if (user) {
      let bookings = await Booking.find({});
      let canBook = true;
      if (bookings.length !== 0) {
        let bookingArray = bookings.filter((eachBooking) => {
          return eachBooking.dateOfBooking === dateOfBooking;
        });

        // console.log(bookingArray);

        bookingArray = bookingArray.map((eachBooking) => {
          return {
            startTime: eachBooking.startTime,
            endTime: eachBooking.endTime,
            duration: eachBooking.duration,
          };
        });

        let allTimes = [];
        bookingArray.length !== 0 &&
          bookingArray.forEach((eachBooking) => {
            let startTimeValue = +eachBooking.startTime.split(":")[0];
            let startTimeSuffix = eachBooking.startTime.split(":")[1].slice(2);
            let endTimeValue = +eachBooking.endTime.split(":")[0];
            let endTimeSuffix = eachBooking.endTime.split(":")[1].slice(2);
            let durationValue = +eachBooking.duration.split(" ")[0];
            let i = 0;

            let allTimeValue = calculateMiddleTime(
              durationValue,
              startTimeSuffix,
              endTimeSuffix,
              startTimeValue,
              endTimeValue
            );

            allTimes.push(...allTimeValue);
          });

        if (allTimes.length !== 0) {
          let startTimeValue = +startTime.split(":")[0];
          let startTimeSuffix = startTime.split(":")[1].slice(2);
          let endTimeValue = +endTime.split(":")[0];
          let endTimeSuffix = endTime.split(":")[1].slice(2);
          let durationValue = +duration.split(" ")[0];

          let allMiddleTimes = calculateMiddleTime(
            durationValue,
            startTimeSuffix,
            endTimeSuffix,
            startTimeValue,
            endTimeValue
          );

          allMiddleTimes.length !== 0 &&
            allMiddleTimes.forEach((middleTime) => {
              let count = allTimes.filter((eachTime) => {
                return eachTime == middleTime;
              }).length;

              if (device === "PC") {
                if (count === 10) {
                  canBook = false;
                  return;
                }
              }

              if (device === "PS") {
                if (count === 5) {
                  canBook = false;
                  return;
                }
              }
            });
        }
      }

      if (canBook) {
        const newBooking = new Booking({ ...req.body, userId: user._id });

        const success = await newBooking.save();

        if (success) {
          let bookingData = {
            device,
            duration,
            startTime,
            endTime,
            dateOfBooking,
          };
          return res
            .status(201)
            .json({ message: "Booking Successfull", bookingData });
        }
      } else {
        return res.status(403).json({
          error: "Can't book at this time, please book in other time",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllBookings = async (req, res, next) => {
  const { user, userRole } = req;
  const { currentPage: pageNumber } = req.query;
  let bookingInfo = [];
  let totalPages;
  try {
    if (user && userRole === "superadmin") {
      const count = await Booking.find({}).countDocuments();
      totalPages = Math.ceil(count / 5);
      const allBookings = await Booking.find({})
        .skip((pageNumber - 1) * 5)
        .limit(5)
        .populate("userId")
        ?.exec();

      if (allBookings) {
        allBookings.forEach((eachBooking) => {
          let {
            userId: { _id, email, userName },
            _id: bookingId,
            device,
            duration,
            dateOfBooking,
            startTime,
            endTime,
            bookPrice,
          } = eachBooking;
          // console.log(_id);
          bookingInfo.push({
            user: { userId: _id, email, userName },
            booking: {
              bookingId,
              device,
              duration,
              dateOfBooking,
              startTime,
              endTime,
              duration,
              bookPrice,
            },
          });
        });
      }

      return res
        .status(200)
        .json({ message: "Fetched Successfully", bookingInfo, totalPages });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// 10:00AM     1:00PM     => 2024-10-12
