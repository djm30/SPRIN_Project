import { createSlice } from "@reduxjs/toolkit";
import {
  getEvents,
  createEvent as createEventRequest,
  updateEvent as updateEventRequest,
  deleteEvent as deleteEventRequest,
} from "../services/eventService";

let initialState = [];

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

export const initializeEvents = () => {
  return async (dispatch) => {
    try {
      const events = await getEvents();

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
      console.log(e);
    }
  };
};

export const newEvent = (event) => {
  return async (dispatch) => {
    try {
      const newEvent = await createEventRequest(event);
      dispatch(addEvent(newEvent));
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateEvent = (id, event) => {
  return async (dispatch) => {
    try {
      const updatedEvent = await updateEventRequest(id, event);
      dispatch(replaceEvent(updatedEvent));
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteEvent = (id) => {
  return async (dispatch) => {
    try {
      await deleteEventRequest(id);
      dispatch(removeEvent(id));
    } catch (e) {
      console.log(e);
    }
  };
};

export default eventSlice.reducer;
