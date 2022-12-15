import axios from "axios";
import { errorHandler } from "./errorHandler";

const baseUrl = "/api/resources";

// All backend requests related to resources are defined here

// Gets a single resource from the backend
export const getResource = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/${id}`);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

// Gets all resources from the backend
export const getResources = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

//  Takes in form data (FormData() class) and creates then returns the created resource
export const createResource = async (resource) => {
    try {
        const response = await axios.post(baseUrl, resource);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

//  Takes in form data (FormData() class) and updates then returns the updated resource
export const updateResource = async (id, resource) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`, resource);
        return response.data;
    } catch (e) {
        throw errorHandler(e);
    }
};

// Deletes a resource and returns true if successful
export const deleteResource = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`);
        return true;
    } catch (e) {
        throw errorHandler(e);
    }
};
