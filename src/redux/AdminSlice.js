import { createSlice } from "@reduxjs/toolkit";
import * as api from "../API/AdminAPI";

const STATE = Object.freeze({
  idle: "idle",
  loading: "loading",
  failed: "failed",
});

const AdminSlice = createSlice({
  name: "Admin",
  initialState: {
    allUsers: { users: [], totalPages: 0 },
    allBookings: { bookings: [], totalPages: 0 },
    adminStatus: STATE.idle,
  },
  reducers: {
    setAllUsers(state, action) {
      const { normalUsers, totalPages } = action.payload;
      state.allUsers = { users: normalUsers, totalPages: totalPages };
    },
    setAllBookings(state, action) {
      const { bookingInfo, totalPages } = action.payload;
      state.allBookings = { bookings: bookingInfo, totalPages: totalPages };
    },
    setAdminStatus(state, action) {
      state.adminStatus = action.payload;
    },
  },
});

export const obtainAllUsers = (currentPage) => {
  return async (dispatch) => {
    dispatch(setAdminStatus(STATE.loading));
    try {
      const {
        data: { message, normalUsers, totalPages },
      } = await api.GetAllUsersAPI(currentPage);
      if (message) {
        dispatch(setAllUsers({ normalUsers, totalPages }));
      }
      dispatch(setAdminStatus(STATE.idle));
    } catch (err) {
      dispatch(setAdminStatus(STATE.failed));
    }
  };
};

export const obtainAllBookings = (currentPage) => {
  return async (dispatch) => {
    dispatch(setAdminStatus(STATE.loading));
    try {
      const {
        data: { message, bookingInfo, totalPages },
      } = await api.GetAllBookingsAPI(currentPage);
      if (message) {
        dispatch(setAllBookings({ bookingInfo, totalPages }));
      }
      dispatch(setAdminStatus(STATE.idle));
    } catch (err) {
      dispatch(setAdminStatus(STATE.failed));
    }
  };
};

export const { setAllUsers, setAdminStatus, setAllBookings } =
  AdminSlice.actions;

export const getAllUsers = (state) => state.Admin.allUsers;
export const getAdminStatus = (state) => state.Admin.adminStatus;
export const getAllBookings = (state) => state.Admin.allBookings;

export default AdminSlice.reducer;
