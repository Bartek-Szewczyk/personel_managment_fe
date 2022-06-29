const baseUrl = "https://localhost:5001/api/dashboard";
const axios = require("axios");
const token = localStorage.getItem("user")?.token;
const config = {
  headers: {
    Authorization: "Bearer " + token,
  },
};
export const getDashboardData = async () => {
  let response;
  try {
    response = await axios.get(baseUrl, config);
  } catch (e) {
    throw new Error(e.message);
  }
  return response?.data ? response?.data : null;
};
