import authService from "./authService";
import { getHeader } from "./userService";
const baseUrl = "https://localhost:5001/api/events";
const baseUserEventsUrl = "https://localhost:5001/api/userToEvents";
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

export const addUserToEvent = async (eventId) => {
  const config = await getHeader();
  try {
    await axios.post(baseUserEventsUrl + "/" + eventId, {}, config);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateUserToEvent = async (eventId, userId, approved) => {
  const config = await getHeader();
  try {
    await axios.put(
      baseUserEventsUrl,
      {
        eventId: eventId,
        userId: userId,
        approved: approved,
      },
      config
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteUserToEvent = async (eventId) => {
  const config = await getHeader();
  try {
    await axios.delete(baseUserEventsUrl + "/" + eventId, config);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getUserEvents = async () => {
  const config = await getHeader();
  let response;
  try {
    response = await axios.get(baseUserEventsUrl + "/MyEvents", config);
  } catch (e) {
    if (e.response.status === 401) {
      authService.logout();
    }
    throw new Error(e.message);
  }
  return response?.data ? response?.data : null;
};

export const reportHours = async (eventId, hours) => {
  const config = await getHeader();
  try {
    await axios.put(
      baseUserEventsUrl + "/reportHours",
      { hours: hours, eventId: eventId },
      config
    );
  } catch (e) {
    throw new Error(e.message);
  }
};
