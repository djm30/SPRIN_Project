import axios from "axios";
import { errorHandler } from "./errorHandler";

const baseUrl = "/api/stats";

export const getStats = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

const incrementStat = async (stat) => {
    try {
        await axios.post(baseUrl + "/" + stat);
    } catch (e) {
        throw errorHandler(e);
    }
};

export const incrementViews = async () => incrementStat("views");

export const incrementUsers = async () => incrementStat("users");

export const incrementResources = async () => incrementStat("resources");

export const incrementEvents = async () => incrementStat("events");
