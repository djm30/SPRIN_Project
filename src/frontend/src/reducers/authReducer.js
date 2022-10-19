import { createSlice } from "@reduxjs/toolkit";
import {
  login as loginRequest,
  logout as logoutRequest,
} from "../services/authService";

let initialState = null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return null;
    },
  },
});

const { login, logout } = authSlice.actions;

const deleteCookie = (name) => {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const submitLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const user = await loginRequest(email, password);
      dispatch(login(user));
    } catch (e) {
      console.log(e);
    }
  };
};

export const submitLogout = () => {
  return async (dispatch) => {
    try {
      await logoutRequest();
      deleteCookie("connect.sid");
      dispatch(logout());
    } catch (e) {
      console.log(e);
    }
  };
};

export default authSlice.reducer;
