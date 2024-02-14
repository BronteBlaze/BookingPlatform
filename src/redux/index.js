import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import bookingReducer from "./BookingSlice";
import adminReducer from "./AdminSlice";

const store = configureStore({
  reducer: { User: userReducer, Booking: bookingReducer, Admin: adminReducer },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;
