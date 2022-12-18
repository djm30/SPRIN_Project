import { configureStore } from "@reduxjs/toolkit";

import resourceReducer from "./resourceReducer";
import eventReducer from "./eventReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import notificationReducer from "./notificationReducer";
import statsReducer from "./statsReducer";

// Defines the single store for the entire application
// The store is used to store the state of the application
// The state is updated by dispatching actions to the store
// The state is accessed by using the useSelector hook
// The state is updated by using the useDispatch hook

// Each reducer is responsible for a different part of the state
// The state is split into different parts to make it easier to manage
// Each reducer exposes actions for updating the state and abstracts away the details
// of how the state is updated so that the components don't need to know
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
