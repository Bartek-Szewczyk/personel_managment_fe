import { allEvents } from "../../services/callendarData";
let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

const ev = allEvents();
//export const INITIAL_EVENTS = allEvents;
export const INITIAL_EVENTS = [
  {
    id: ev[0]?.id,
    title: ev[0]?.title,
    start: ev[0]?.dateStart,
    end: ev[0]?.dateEnd,
    allDay: ev[0]?.allDay,
    category: ev[0]?.category.name,
    staffnumber: ev[0]?.staffnumber,
    backgroundColor: ev[0]?.backgroundColor,
    borderColor: ev[0]?.backgroundColor,
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: todayStr + "T12:00:00",
    end: todayStr + "T15:00:00",
    allDay: false,
    category: "option3",
    staffnumber: 8,
    backgroundColor: "#7D9DDD",
    borderColor: "#7D9DDD",
  },
  {
    id: createEventId(),
    title: "New event",
    start: todayStr + "T32:00:00",
    end: todayStr + "T35:00:00",
    allDay: false,
    category: "option4",
    staffnumber: 4,
    backgroundColor: "#6376C1",
    borderColor: "#6376C1",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
