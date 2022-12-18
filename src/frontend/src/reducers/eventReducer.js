import { createSlice } from "@reduxjs/toolkit";
import {
    getEvents,
    createEvent as createEventRequest,
    updateEvent as updateEventRequest,
    deleteEvent as deleteEventRequest,
} from "../services/eventService";
import { setNotification } from "./notificationReducer";
import { incrementStats } from "./statsReducer";
import statTypes from "../services/StatTypes";

let initialState = [];

// Reducer for events
// Contains the state of all events
// Contains the actions for updating the state of all events
const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        setEvents(state, action) {
            return action.payload;
        },
        addEvent(state, action) {
            return [...state, action.payload];
        },
        replaceEvent(state, action) {
            const eventToReplace = action.payload;
            return state.map((event) =>
                event._id === eventToReplace._id ? eventToReplace : event,
            );
        },
        removeEvent(state, action) {
            const id = action.payload;
            return state.filter((event) => event._id !== id);
        },
    },
});

const { setEvents, addEvent, replaceEvent, removeEvent } = eventSlice.actions;

// Action for fetching all events from the backend
export const initializeEvents = () => {
    return async (dispatch) => {
        try {
            const events = await getEvents();

            // Split events into pages of 4
            const pages = [];
            let currPage = [];
            for (let i = 0; i < events.length; i++) {
                if (currPage.length === 4) {
                    pages.push(currPage);
                    currPage = [];
                }
                currPage.push(events[i]);
            }
            pages.push(currPage);
            dispatch(setEvents(pages));
        } catch (e) {
            if (e.message) dispatch(setNotification(e.message, true));
            console.log(e);
        }
    };
};

// Action for creating a new event
export const newEvent = (event) => {
    return async (dispatch) => {
        try {
            const newEvent = await createEventRequest(event);
            dispatch(addEvent(newEvent));
            // Show notification and increment stats
            dispatch(setNotification("Event created successfully", false));
            dispatch(incrementStats(statTypes.EVENTS));
        } catch (e) {
            if (e.message) dispatch(setNotification(e.message, true));
            console.log(e);
        }
    };
};

// Action for updating an existing event
export const updateEvent = (id, event) => {
    return async (dispatch) => {
        try {
            const updatedEvent = await updateEventRequest(id, event);
            dispatch(replaceEvent(updatedEvent));
        } catch (e) {
            if (e.message) dispatch(setNotification(e.message, true));
            console.log(e);
        }
    };
};

// Action for deleting an existing event
export const deleteEvent = (id) => {
    return async (dispatch) => {
        try {
            await deleteEventRequest(id);
            dispatch(removeEvent(id));
        } catch (e) {
            if (e.message) dispatch(setNotification(e.message, true));
            console.log(e);
        }
    };
};

export default eventSlice.reducer;
