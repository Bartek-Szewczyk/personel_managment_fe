const baseUrl = "https://localhost:5001/api/users";
const axios = require("axios");

export const allUsers = async () => {
  let response;

  try {
    response = await axios.get(baseUrl);
  } catch (e) {
    throw new Error(e.message);
  }
  return response?.data ? response?.data : null;
};

export const addUser = async (user) => {
  try {
    await axios.post(baseUrl, user);
  } catch (e) {
    throw new Error(e.message);
  }
};
