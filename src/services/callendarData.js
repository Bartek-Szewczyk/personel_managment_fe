const baseUrl = "https://localhost:5001/api/events";
const axios = require("axios");
const token = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user"))?.token
  : "";

const config = {
  headers: {
    Authorization: "Bearer " + token,
  },
};
export const allEvents = async () => {
  let response;
  try {
    response = await axios.get(baseUrl, config);
  } catch (e) {
    throw new Error(e.message);
  }
  return response?.data ? response?.data : null;
};

export const deletedEvent = async (id) => {
  try {
    await axios.delete(baseUrl + "/" + id, config);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const addEvent = async (event) => {
  try {
    await axios.post(baseUrl, event, config);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const editEvent = async (event) => {
  try {
    await axios.put(baseUrl + "/" + event.id, event, config);
  } catch (e) {
    throw new Error(e.message);
  }
};
