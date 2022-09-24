import axios from "axios";
import { errorHandler } from "./errorHandler";

const baseUrl = "/api/events";

export const getEvent = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (e) {
    throw errorHandler(e);
  }
};

export const getEvents = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (e) {
    throw errorHandler(e);
  }
};

// Potentially takes in form data
export const createEvent = async (event) => {
  try {
    const response = await axios.post(baseUrl, event);
    return response.data;
  } catch (e) {
    throw errorHandler(e);
  }
};

// Potentially takes in form data
export const updateEvent = async (id, event) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, event);
    return response.data;
  } catch (e) {
    throw errorHandler(e);
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return true;
  } catch (e) {
    throw errorHandler(e);
  }
};
