import API from ".";

export const BookGameAPI = (
  device,
  duration,
  dateOfBooking,
  startTime,
  endTime
) =>
  API.post("/booking", { device, duration, dateOfBooking, startTime, endTime });
