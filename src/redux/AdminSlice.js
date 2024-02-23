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
    snacks: { bookingId: "", addSnack: false },
    snackAddStatus: { inventoryId: "", status: STATE.idle },
    bill: {},
    chats: [],
    chatStatus: STATE.idle,
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
    setSnackAddStatus(state, action) {
      const { inventoryId, status } = action.payload;
      state.snackAddStatus = { inventoryId: inventoryId, status: status };
    },
    addSnacks(state, action) {
      const { bookingId, addSnack } = action.payload;
      state.snacks = { bookingId, addSnack: addSnack };
    },
    createBill(state, action) {
      state.bill = action.payload;
    },
    setChatStatus(state, action) {
      state.chatStatus = action.payload;
    },
    setChats(state, action) {
      state.chats = action.payload;
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

export const obtainUserChats = (userId) => {
  return async (dispatch) => {
    dispatch(setChatStatus(STATE.loading));
    try {
      const {
        data: { message, allMessages },
      } = await api.GetChatsAPI(userId);
      if (message) {
        dispatch(setChats(allMessages));
        console.log(allMessages);
      }
      dispatch(setChatStatus(STATE.idle));
    } catch (err) {
      dispatch(setChatStatus(STATE.failed));
    }
  };
};

export const addSnacksToBookPrice = ({
  bookingId,
  snackPrice,
  inventoryId,
}) => {
  return async (dispatch) => {
    dispatch(setSnackAddStatus({ inventoryId, status: STATE.loading }));
    try {
      const {
        data: { message },
      } = await api.AddSnackAPI(bookingId, snackPrice, inventoryId);
      if (message) {
        dispatch(setSnackAddStatus({ inventoryId, status: STATE.idle }));
        return { success: true };
      }
    } catch (err) {
      dispatch(setSnackAddStatus({ inventoryId, status: STATE.failed }));
    }
  };
};

export const {
  setAllUsers,
  setAdminStatus,
  setAllBookings,
  addSnacks,
  setSnackAddStatus,
  createBill,
  setChats,
  setChatStatus,
} = AdminSlice.actions;

export const getAllUsers = (state) => state.Admin.allUsers;
export const getAdminStatus = (state) => state.Admin.adminStatus;
export const getSnackAddStatus = (state) => state.Admin.snackAddStatus;
export const getAllBookings = (state) => state.Admin.allBookings;
export const getBill = (state) => state.Admin.bill;
export const getSnacks = (state) => state.Admin.snacks;
export const getChatStatus = (state) => state.Admin.chatStatus;
export const getChats = (state) => state.Admin.chats;

export default AdminSlice.reducer;
