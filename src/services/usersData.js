import { getHeader } from "./userService";
const baseUrl = "https://localhost:5001/api/users";
const axios = require("axios");

export const allUsers = async () => {
  const config = await getHeader();
  let response;

  try {
    response = await axios.get(baseUrl, config);
  } catch (e) {
    throw new Error(e.message);
  }
  return response?.data ? response?.data : null;
};

export const addUser = async (user) => {
  const config = await getHeader();
  try {
    await axios.post(baseUrl, user, config);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteUser = async (id) => {
  const config = await getHeader();
  try {
    await axios.delete(baseUrl + "/" + id, config);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const editUser = async (user) => {
  const config = await getHeader();
  try {
    await axios.put(baseUrl + "/" + user.id, user, config);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getUserById = async (id) => {
  const config = await getHeader();
  let response;

  try {
    response = await axios.get(baseUrl + "/" + id, config);
  } catch (e) {
    throw new Error(e.message);
  }
  return response?.data ? response?.data : null;
};
