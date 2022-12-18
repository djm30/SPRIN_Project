import axios from "axios";
import { errorHandler } from "./errorHandler";

export const baseUrl = "/api/users";

// All backend requests related to users are defined here

// Gets a single user from the backend
export const getUser = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/${id}`);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

// Gets all users from the backend
export const getUsers = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

// Approves a user and returns the approved user
export const approveUser = async (id) => {
    try {
        const response = await axios.post(`${baseUrl}/approve/${id}`);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

// Creates a new user and returns the created user
export const createUser = async (user) => {
    try {
        const response = await axios.post(baseUrl + "/register", user);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

// Updates a user and returns the updated user
export const updateUser = async (id, user) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`, user);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

// Deletes a user and returns true if successful
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`);
        return true;
    } catch (e) {
        throw errorHandler(e);
    }
};
