const CompleteBooking = ({ bookingSuccess }) => {
  let message,
    device,
    duration,
    dateOfBooking,
    startTime,
    endTime = "";
  if (bookingSuccess) {
    message = bookingSuccess.message;
    device = bookingSuccess.device;
    duration = bookingSuccess.duration;
    dateOfBooking = bookingSuccess.dateOfBooking;
    startTime = bookingSuccess.startTime;
    endTime = bookingSuccess.endTime;
  }
  return (
    <div className="mt-12 bg-white py-12 px-20 mx-8 text-center">
      <div className="text-xl">
        <span>{message} !</span>
      </div>
      <div className="mt-3">
        <div>
          <b>Device:</b> <span>{device}</span>
        </div>
        <div>
          <b>Duration:</b> <span>{duration}</span>
        </div>
        <div>
          <b>Date:</b> <span>{dateOfBooking}</span>
        </div>
        <div>
          <b>Start Time:</b> <span>{startTime}</span>
        </div>
        <div>
          <b>End Time:</b> <span>{endTime}</span>
        </div>
      </div>
    </div>
  );
};

export default CompleteBooking;
