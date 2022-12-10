import { createSlice } from "@reduxjs/toolkit";
import {
    login as loginRequest,
    logout as logoutRequest,
    reauthenticate,
} from "../services/authService";
import { setNotification } from "./notificationReducer";

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

export const submitLogin = (email, password) => {
    return async (dispatch) => {
        try {
            const user = await loginRequest(email, password);
            dispatch(login(user));
            dispatch(setNotification("Logged in successfully!", false));
        } catch (e) {
            dispatch(setNotification(e.message, true));
        }
    };
};

export const submitLogout = () => {
    return async (dispatch) => {
        try {
            await logoutRequest();
            dispatch(logout());
            dispatch(setNotification("Logged out successfully!", false));
        } catch (e) {
            console.log(e);
        }
    };
};

export const tryReauthenticate = () => {
    return async (dispatch) => {
        try {
            const user = await reauthenticate();
            dispatch(login(user));
        } catch (e) {
            console.log("No session found for this user");
        }
    };
};

export default authSlice.reducer;
