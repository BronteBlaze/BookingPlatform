import { createSlice } from "@reduxjs/toolkit";
import * as api from "../API/UserAPI";

const STATE = Object.freeze({
  loading: "loading",
  idle: "idle",
  failed: "failed",
});

const UserSlice = createSlice({
  name: "User",
  initialState: {
    authStatus: STATE.idle,
    user: { authError: "", signUpMessage: "", signInMessage: "" },
    isLoggedIn: localStorage.getItem("token"),
    userCredentials: {},
  },
  reducers: {
    setAuthStatus(state, action) {
      state.authStatus = action.payload;
    },
    setAuthError(state, action) {
      state.user.authError = action.payload;
    },
    setSignUpMessage(state, action) {
      state.user.signUpMessage = action.payload;
    },
    setSignInMessage(state, action) {
      state.user.signInMessage = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = true;
    },
    setUserCredentials(state, action) {
      state.userCredentials = action.payload;
    },
  },
});

export const signUp = (userData) => {
  return async (dispatch) => {
    dispatch(setAuthStatus(STATE.loading));
    try {
      const {
        data: { message },
      } = await api.SignUpAPI(userData);
      if (message) {
        dispatch(setAuthError(""));
        dispatch(setSignUpMessage("User Registration Successfull"));
        dispatch(setAuthStatus(STATE.idle));
      }
    } catch (err) {
      console.log(err);
      dispatch(setAuthError(err?.response?.data?.error));
      dispatch(setAuthStatus(STATE.failed));
    }
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    dispatch(setAuthStatus(STATE.loading));
    try {
      const {
        data: { message, token },
      } = await api.SignInAPI(email, password);
      if (message) {
        localStorage.setItem("token", token);
        dispatch(setIsLoggedIn(true));
        dispatch(setAuthError(""));
        dispatch(setSignInMessage(message));
        dispatch(setAuthStatus(STATE.idle));
      }
    } catch (err) {
      console.log(err);
      dispatch(setAuthError(err?.response?.data?.error));
      dispatch(setAuthStatus(STATE.failed));
    }
  };
};

export const editUser = (userData, userId, role, plainPassword) => {
  return async (dispatch) => {
    dispatch(setAuthStatus(STATE.loading));
    try {
      const {
        data: { message },
      } = await api.EditUserAPI(userData);
      if (message) {
        dispatch(setAuthError(""));
        dispatch(
          setUserCredentials({ ...userData, userId, role, plainPassword })
        );
        dispatch(setIsLoggedIn(false));
        localStorage.removeItem("token");
        window.location.reload();
        dispatch(setAuthStatus(STATE.idle));
      }
    } catch (err) {
      console.log(err);
      dispatch(setAuthError(err?.response?.data?.error));
      dispatch(setAuthStatus(STATE.failed));
    }
  };
};

export const {
  setAuthStatus,
  setSignUpMessage,
  setSignInMessage,
  setIsLoggedIn,
  setUserCredentials,
  setAuthError,
} = UserSlice.actions;

export const getAuthStatus = (state) => state.User.authStatus;
export const getAuthError = (state) => state.User.user.authError;
export const getSignUpMessage = (state) => state.User.user.signUpMessage;
export const getSignInMessage = (state) => state.User.user.signInMessage;
export const getUserCredentials = (state) => state.User.userCredentials;

export default UserSlice.reducer;
