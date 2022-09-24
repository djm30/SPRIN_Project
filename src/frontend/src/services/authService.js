import axios from "axios";
import { errorHandler } from "./errorHandler";

const baseUrl = "/api/users";

export const login = async (email, password) => {
  const body = { email, password };
  try {
    const response = await axios.post(`${baseUrl}/login`, body);
    return response.data;
  } catch (e) {
    throw errorHandler(e);
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${baseUrl}/logout`);
  } catch (e) {
    throw errorHandler(e);
  }
};
