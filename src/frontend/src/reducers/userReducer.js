import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
