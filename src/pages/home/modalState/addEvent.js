import React, { useState, useEffect } from "react";
import { createEventId } from "../event-utils";
import Datetime from "react-datetime";
import "moment/locale/pl";
import "./homeModal.scss";
import "react-datetime/css/react-datetime.css";
import { addEvent } from "../../../services/callendarData";

function AddEvent({ info, closeModal }) {
  const [title, setTitle] = useState("");
  const [allDayEvents, setAllDayEvents] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState("Barman");
  const [number, setNumber] = useState(1);

  useEffect(() => {
    setAllDayEvents(info?.allDay);
    setStart(info?.startStr);
    setEnd(info?.endStr);
  }, [info]);
  const setColor = (category) => {
    switch (category) {
      case "Barman":
        return { color: "#74CCD3", name: "Barman", id: 1 };
      case "Kelner":
        return { color: "#9EC0ED", name: "Kelner", id: 2 };
      case "Kucharz":
        return { color: "#7D9DDD", name: "Kucharz", id: 3 };

      default:
        break;
    }
  };

  const buttonHandler = () => {
    let calendarApi = info.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (title) {
      const cat = setColor(selected);
      addEvent({
        title: title,
        dateStart: start._d ? start._d : start,
        dateEnd: end._d ? end._d : end,
        allDay: allDayEvents,
        category: {
          id: cat.id,
          name: selected,
        },
        staffNumber: number,
        backgroundColor: cat.color,
      });
      closeModal();
    } else {
      setError(true);
    }
  };

  const staff = (count) => {
    let arr = [];
    for (let index = 0; index < count; index++) {
      arr.push(
        <div className="homeModalWrapper__staffContainer" key={"div" + count}>
          <select
            className="homeModalWrapper__input"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            key={"select" + count}
          >
            <option
              className="homeModalWrapper__option"
              value="Barman"
              key={"option1" + count}
            >
              Barman
            </option>
            <option value="Kelner" key={"option2" + count}>
              Kelener
            </option>
            <option value="Kucharz" key={"option3" + count}>
              Kucharz
            </option>
          </select>
          <input
            className="homeModalWrapper__input number"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            key={"number" + count}
          />
        </div>
      );
    }
    return arr;
  };

  return (
    <div className="homeModalWrapper addEvent">
      <h1>Dodaj nową zmianę</h1>
      <h3>Nazwa wydarzenia</h3>
      <input
        className="homeModalWrapper__input"
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <div className="homeModalWrapper__checkboxContainer">
        <input
          className="homeModalWrapper__checkboxContainer__checkbox"
          type="checkbox"
          checked={allDayEvents}
          onClick={() => setAllDayEvents(!allDayEvents)}
        />
        Cały dzień
        <span className="homeModalWrapper__checkboxContainer__checkmark"></span>
      </div>
      <div className="homeModalWrapper__timeContainer">
        <div className="homeModalWrapper__timeContainer__column">
          <h3>Start</h3>
          <Datetime
            value={new Date(start)}
            locale="pl"
            dateFormat="DD-MM-YYYY"
            onChange={(date) => setStart(date)}
            timeFormat={allDayEvents ? false : true}
          />
        </div>
        <div className="homeModalWrapper__timeContainer__column">
          <h3>Koniec</h3>
          <Datetime
            value={new Date(end)}
            locale="pl"
            dateFormat="DD-MM-YYYY"
            onChange={(date) => setEnd(date)}
            timeFormat={allDayEvents ? false : true}
          />
        </div>
      </div>
      <h3>Ilość pracowników</h3>
      {staff(1)}
      <button className="homeModalWrapper__button" onClick={buttonHandler}>
        Dodaj wydarzenie
      </button>
      {error && (
        <p className="homeModalWrapper__error">Podaj nazwę wydarzenia</p>
      )}
    </div>
  );
}

export default AddEvent;
