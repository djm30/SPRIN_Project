import { createSlice } from "@reduxjs/toolkit";
import {
    getStats,
    incrementResources,
    incrementViews,
    incrementUsers,
    incrementEvents,
} from "../services/statsService";
import { setNotification } from "./notificationReducer";

// An array of arrays, each inner array will have a max length of 9
let initialState = {
    views: 0,
    users: 0,
    resources: 0,
    events: 0,
};

// Reducer for stats
// Contains the state of all stats
// Contains the actions for updating the state of all stats
const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {
        setStats(state, action) {
            return action.payload;
        },
        addResource(state) {
            state.resources++;
        },
        addUsers(state) {
            state.users++;
        },
        addViews(state) {
            state.views++;
        },
        addEvents(state) {
            state.events++;
        },
    },
});

const { setStats, addResource, addUsers, addEvents, addViews } =
    statsSlice.actions;

// Action for fetching all stats from the backend
export const initializeStats = () => {
    return async (dispatch) => {
        try {
            const stats = await getStats();
            dispatch(setStats(stats));
        } catch (e) {
            dispatch(setNotification(e.message, true));
        }
    };
};

// Action for incrementing a stat
export const incrementStats = (stat) => {
    return async (dispatch) => {
        try {
            // Get what stat to increment
            switch (stat) {
                case "resources":
                    await incrementResources();
                    dispatch(addResource());
                    break;
                case "users":
                    await incrementUsers();
                    dispatch(addUsers());
                    break;
                case "views":
                    // Check if the user has already incremented the views
                    if (localStorage.getItem("views") === "true") return;
                    await incrementViews();
                    dispatch(addViews());
                    // Set the views to true so that the user can't increment the views again
                    localStorage.setItem("views", "true");
                    break;
                case "events":
                    await incrementEvents();
                    dispatch(addEvents());
                    break;
                default:
                    break;
            }
        } catch (e) {
            dispatch(setNotification(e.message, true));
        }
    };
};

export default statsSlice.reducer;
