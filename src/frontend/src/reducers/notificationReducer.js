import { createSlice } from "@reduxjs/toolkit";

let timeout;

let initialState = {
  error: false,
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    resetMessage(state, action) {
      return initialState;
    },
  },
});

export const setNotification = (message, error, time = 5) => {
  return (dispatch) => {
    clearTimeout(timeout);
    dispatch(setMessage({ message, error }));
    timeout = setTimeout(() => {
      dispatch(resetMessage());
    }, time * 1000);
  };
};

const { setMessage, resetMessage } = notificationSlice.actions;

export default notificationSlice.reducer;