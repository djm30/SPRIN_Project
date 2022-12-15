import axios from "axios";
import { errorHandler } from "./errorHandler";

const baseUrl = "/api/stats";

// All backend requests related to stats are defined here

// Gets all stats from the backend
export const getStats = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

// Generic method for incrementing a stat
const incrementStat = async (stat) => {
    try {
        await axios.post(baseUrl + "/" + stat);
    } catch (e) {
        throw errorHandler(e);
    }
};

// Specific methods are exposed for incrementing each stat based on the above generic method
export const incrementViews = async () => incrementStat("views");

export const incrementUsers = async () => incrementStat("users");

export const incrementResources = async () => incrementStat("resources");

export const incrementEvents = async () => incrementStat("events");
