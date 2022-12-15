import { createSlice } from "@reduxjs/toolkit";
import {
    login as loginRequest,
    logout as logoutRequest,
    reauthenticate,
} from "../services/authService";
import { setNotification } from "./notificationReducer";

let initialState = null;

// Reducer for authentication management
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

// Action for logging in
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

// Action for logging out
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

// Action for reauthenticating user
export const tryReauthenticate = () => {
    return async (dispatch) => {
        try {
            // If a session ID is found, this will reauthenticate the user
            const user = await reauthenticate();
            dispatch(login(user));
        } catch (e) {
            console.log("No session found for this user");
        }
    };
};

export default authSlice.reducer;
