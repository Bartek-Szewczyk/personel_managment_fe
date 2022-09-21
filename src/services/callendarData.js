import authService from "./authService";
import { getHeader } from "./userService";
const baseUrl = "https://localhost:5001/api/events";
const axios = require("axios");

export const allEvents = async () => {
  const config = await getHeader();
  let response;
  try {
    response = await axios.get(baseUrl, config);
  } catch (e) {
    if (e.response.status === 401) {
      authService.logout();
    }
    throw new Error(e.message);
  }
  return response?.data ? response?.data : null;
};
export const getEventById = async (id) => {
  const config = await getHeader();
  let response;
  try {
    response = await axios.get(`${baseUrl}/${id}`, config);
  } catch (e) {
    if (e.response.status === 401) {
      authService.logout();
    }
    throw new Error(e.message);
  }
  return response?.data ? response?.data : null;
};

export const deletedEvent = async (id) => {
  const config = await getHeader();
  try {
    await axios.delete(baseUrl + "/" + id, config);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const addEvent = async (event) => {
  const config = await getHeader();
  try {
    await axios.post(baseUrl, event, config);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const editEvent = async (event) => {
  const config = await getHeader();
  try {
    await axios.put(baseUrl + "/" + event.id, event, config);
  } catch (e) {
    throw new Error(e.message);
  }
};
