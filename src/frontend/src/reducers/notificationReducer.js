import { createSlice } from "@reduxjs/toolkit";

let timeout;

let initialState = {
    error: false,
    message: "",
};

// Reducer for notifications
// Contains the state of the notification
// Contains the actions for updating the state of the notification
const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setMessage(state, action) {
            return action.payload;
        },
        resetMessage() {
            return initialState;
        },
    },
});

const { setMessage, resetMessage } = notificationSlice.actions;

// Action for setting a notification
// Will set the notification message and error
// Will reset the notification after the given time
export const setNotification = (message, error, time = 5) => {
    return (dispatch) => {
        clearTimeout(timeout);
        dispatch(setMessage({ message, error }));
        timeout = setTimeout(() => {
            dispatch(resetMessage());
        }, time * 1000);
    };
};

export default notificationSlice.reducer;
