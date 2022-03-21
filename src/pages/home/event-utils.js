let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "All-day event",
    start: todayStr,
    end: todayStr + "T24:00:00",
    allDay: true,
    category: "option2",
    staffnumber: 2,
    backgroundColor: "#9EC0ED",
    borderColor: "#9EC0ED",
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
