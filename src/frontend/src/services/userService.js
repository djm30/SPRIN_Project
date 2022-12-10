import axios from "axios";
import { errorHandler } from "./errorHandler";

export const baseUrl = "/api/users";

export const getUser = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/${id}`);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

export const getUsers = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

export const approveUser = async (id) => {
    try {
        const response = await axios.post(`${baseUrl}/approve/${id}`);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

export const createUser = async (user) => {
    try {
        const response = await axios.post(baseUrl + "/register", user);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

export const updateUser = async (id, user) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`, user);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`);
        return true;
    } catch (e) {
        throw errorHandler(e);
    }
};
