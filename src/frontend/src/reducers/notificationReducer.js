import { createSlice } from "@reduxjs/toolkit";

let initialState = { error: false, message: "" };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
});

export default notificationSlice.reducer;
