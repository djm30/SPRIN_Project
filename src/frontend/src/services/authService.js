import axios from "axios";
import { errorHandler } from "./errorHandler";

const baseUrl = "/api/users";

// All backend requests related to authentication are defined here

// Logins user and returns user data
export const login = async (email, password) => {
    const body = { email, password };
    try {
        const response = await axios.post(`${baseUrl}/login`, body);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

// Logs out user
export const logout = async () => {
    try {
        const response = await axios.post(`${baseUrl}/logout`);
    } catch (e) {
        throw errorHandler(e);
    }
};

export const reauthenticate = async () => {
    try {
        const response = await axios.post(`${baseUrl}/reauthenticate`);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};
