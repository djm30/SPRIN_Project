import axios from "axios";
import { errorHandler } from "./errorHandler";

const baseUrl = "/api/resources";

export const getResource = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (e) {
    throw errorHandler(e);
  }
};

export const getResources = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (e) {
    throw errorHandler(e);
  }
};

//  Takes in form data (FormData() class)
export const createResource = async (resource) => {
  try {
    const response = await axios.post(baseUrl, resource);
    return response.data;
  } catch (e) {
    throw errorHandler(e);
  }
};
//  Takes in form data (FormData() class)
export const updateResource = async (id, resource) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, resource);
    return response.data;
  } catch (e) {
    throw errorHandler(e);
  }
};
export const deleteResource = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return true;
  } catch (e) {
    throw errorHandler(e);
  }
};
