import { createSlice } from "@reduxjs/toolkit";
import * as api from "../API/InventoryAPI";

const STATE = Object.freeze({
  loading: "loading",
  idle: "idle",
  failed: "failed",
});

const InventorySlice = createSlice({
  name: "Inventory",
  initialState: {
    inventories: [],
    inventoryError: "",
    inventoryStatus: STATE.idle,
  },
  reducers: {
    setInventory(state, action) {
      state.inventories = action.payload;
    },
    addInventory(state, action) {
      state.inventories.push(action.payload);
    },
    removeInventory(state, action) {
      let newInventory = state.inventories.filter((inventory) => {
        return inventory._id !== action.payload._id;
      });
      state.inventories = newInventory;
    },
    setInventoryError(state, action) {
      state.inventoryError = action.payload;
    },
    setInventoryStatus(state, action) {
      state.inventoryStatus = action.payload;
    },
  },
});

export const postInventory = (inventoryData) => {
  return async (dispatch) => {
    dispatch(setInventoryStatus(STATE.loading));
    try {
      const {
        data: { message, inventoryInfo },
      } = await api.PostInventoryAPI(inventoryData);
      if (message) {
        dispatch(addInventory(inventoryInfo));
      }
      dispatch(setInventoryStatus(STATE.idle));
    } catch (err) {
      dispatch(setInventoryError(err?.response?.data?.error));
      dispatch(setInventoryStatus(STATE.failed));
    }
  };
};

export const obtainInventory = (upgrade) => {
  return async (dispatch) => {
    dispatch(setInventoryStatus(STATE.loading));
    try {
      const {
        data: { message, allInventory },
      } = await api.GetInventoryAPI();
      if (message) {
        dispatch(setInventory(allInventory));
        dispatch(setInventoryStatus(STATE.idle));
        if (upgrade) {
          return { upgrade: true };
        }
      }
    } catch (err) {
      dispatch(setInventoryError(err?.response?.data?.error));
      dispatch(setInventoryStatus(STATE.failed));
    }
  };
};

export const deleteInventory = (_id) => {
  return async (dispatch) => {
    dispatch(setInventoryStatus(STATE.loading));
    try {
      const {
        data: { message },
      } = await api.DeleteInventoryAPI(_id);
      if (message) {
        dispatch(removeInventory({ _id }));
      }
      dispatch(setInventoryStatus(STATE.idle));
    } catch (err) {
      console.log(err);
      dispatch(setInventoryError(err?.response?.data?.error));
      dispatch(setInventoryStatus(STATE.failed));
    }
  };
};

export const {
  setInventory,
  setInventoryError,
  setInventoryStatus,
  addInventory,
  removeInventory,
} = InventorySlice.actions;

export const getInventory = (state) => state.Inventory.inventories;
export const getInventoryError = (state) => state.Inventory.inventoryError;
export const getInventoryStatus = (state) => state.Inventory.inventoryStatus;

export default InventorySlice.reducer;
