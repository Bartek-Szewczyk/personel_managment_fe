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

export const deleteUser = async (id) => {
  try {
    await axios.delete(baseUrl + "/" + id);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const editUser = async (user) => {
  try {
    await axios.put(baseUrl + "/" + user.id, user);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getUserById = async (id) => {
  let response;

  try {
    response = await axios.get(baseUrl + "/" + id);
  } catch (e) {
    throw new Error(e.message);
  }
  return response?.data ? response?.data : null;
};
