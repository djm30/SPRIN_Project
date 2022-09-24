import axios from "axios";
import { errorHandler } from "./errorHandler";

const baseUrl = "/api/stats";

export const getStats = async (id) => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (e) {
    throw errorHandler(e);
  }
};
