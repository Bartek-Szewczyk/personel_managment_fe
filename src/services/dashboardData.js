import { getHeader } from "./userService";
const baseUrl = "https://localhost:5001/api/dashboard";
const axios = require("axios");

export const getDashboardData = async () => {
  const config = await getHeader();
  let response;
  try {
    response = await axios.get(baseUrl, config);
  } catch (e) {
    throw new Error(e.message);
  }
  return response?.data ? response?.data : null;
};
