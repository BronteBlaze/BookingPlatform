import { createSlice } from "@reduxjs/toolkit";
import * as api from "../API/BookingAPI";

const STATE = Object.freeze({
  loading: "loading",
  idle: "idle",
  failed: "failed",
});

const BookingSlice = createSlice({
  name: "Booking",
  initialState: {
    bookingError: "",
    bookingStatus: STATE.idle,
    bookingSuccess: {},
  },
  reducers: {
    setBookingError(state, action) {
      state.bookingError = action.payload;
    },
    setBookingStatus(state, action) {
      state.bookingStatus = action.payload;
    },
    setBookingSuccess(state, action) {
      const { message, bookingData } = action.payload;
      state.bookingSuccess = { message, ...bookingData };
    },
  },
});

export const bookGame = (
  device,
  duration,
  dateOfBooking,
  startTime,
  endTime
) => {
  return async (dispatch) => {
    try {
      dispatch(setBookingStatus(STATE.loading));
      const {
        data: { message, bookingData },
      } = await api.BookGameAPI(
        device,
        duration,
        dateOfBooking,
        startTime,
        endTime
      );
      if (message) {
        dispatch(setBookingError(""));
        dispatch(setBookingSuccess({ message, bookingData }));
      }
      dispatch(setBookingStatus(STATE.idle));
    } catch (err) {
      console.log(err);
      dispatch(setBookingSuccess(""));
      dispatch(setBookingError(err?.response?.data?.error));
      dispatch(setBookingStatus(STATE.failed));
    }
  };
};

export const { setBookingError, setBookingStatus, setBookingSuccess } =
  BookingSlice.actions;

export const getBookingError = (state) => state.Booking.bookingError;
export const getBookingSuccess = (state) => state.Booking.bookingSuccess;
export const getBookingStatus = (state) => state.Booking.bookingStatus;

export default BookingSlice.reducer;
