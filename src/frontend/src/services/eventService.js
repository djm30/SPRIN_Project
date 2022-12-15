import axios from "axios";
import { errorHandler } from "./errorHandler";

const baseUrl = "/api/events";

// All backend requests related to events are defined here

// Gets a single event from the backend
export const getEvent = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/${id}`);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

// Gets all events from the backend
export const getEvents = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

// Creates a new event and returns the created event
export const createEvent = async (event) => {
    try {
        const response = await axios.post(baseUrl, event);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

// Updates an event and returns the updated event
export const updateEvent = async (id, event) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`, event);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

// Deletes an event and returns true if successful
export const deleteEvent = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`);
        return true;
    } catch (e) {
        throw errorHandler(e);
    }
};
