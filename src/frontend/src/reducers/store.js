import { configureStore } from "@reduxjs/toolkit";

import resourceReducer from "./resourceReducer";
import eventReducer from "./eventReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import notificationReducer from "./notificationReducer";
import statsReducer from "./statsReducer";

const store = configureStore({
    reducer: {
        resources: resourceReducer,
        events: eventReducer,
        users: userReducer,
        auth: authReducer,
        notification: notificationReducer,
        stats: statsReducer,
    },
});

export default store;
