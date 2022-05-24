const baseUrl = "https://localhost:5001/api/events";
const axios = require("axios");
export const allEvents = async () => {
  let response;

  try {
    response = await axios.get(baseUrl);
  } catch (e) {
    throw new Error(e.message);
  }
  return response?.data ? response?.data : null;
};

export const deletedEvent = async (id) => {
  try {
    await axios.delete(baseUrl + "/" + id);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const addEvent = async (event) => {
  try {
    await axios.post(baseUrl, event);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const editEvent = async (event) => {
  try {
    await axios.put(baseUrl + "/" + event.id, event);
  } catch (e) {
    throw new Error(e.message);
  }
};
