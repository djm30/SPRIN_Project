import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

const resourceSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {},
});

export default resourceSlice.reducer;
