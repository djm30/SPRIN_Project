import { configureStore } from "@reduxjs/toolkit";

import resourceReducer from "./resourceReducer";
import eventReducer from "./eventReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import notificationReducer from "./notificationReducer";

const store = configureStore({
  reducer: {
    resources: resourceReducer,
    events: eventReducer,
    users: userReducer,
    auth: authReducer,
    notification: notificationReducer,
  },
});

export default store;
