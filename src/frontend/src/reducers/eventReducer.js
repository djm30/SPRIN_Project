import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
});

export default eventSlice.reducer;
