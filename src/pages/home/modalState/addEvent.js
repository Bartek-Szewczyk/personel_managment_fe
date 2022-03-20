import React, { useState, useEffect } from "react";
import { createEventId } from "../event-utils";
import Datetime from "react-datetime";
import "moment/locale/pl";
import "./homeModal.scss";
import "react-datetime/css/react-datetime.css";

function AddEvent({ info, closeModal }) {
  const [title, setTitle] = useState();
  const [allDayEvents, setAllDayEvents] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState("option1");
  const [number, setNumber] = useState(1);

  useEffect(() => {
    setAllDayEvents(info?.allDay);
    setStart(info?.startStr);
    setEnd(info?.endStr);
  }, [info]);
  const setColor = (category) => {
    switch (category) {
      case "option1":
        return "#74CCD3";
      case "option2":
        return "#9EC0ED";
      case "option3":
        return "#7D9DDD";
      case "option4":
        return "#6376C1";

      default:
        break;
    }
  };

  const buttonHandler = () => {
    let calendarApi = info.view.calendar;
    console.log(info);
    calendarApi.unselect(); // clear date selection
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title: title,
        start: start._d ? start._d : start,
        end: end._d ? end._d : end,
        allDay: allDayEvents,
        category: selected,
        staffnumber: number,
        backgroundColor: setColor(selected),
        borderColor: setColor(selected),
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
        <div className="homeModalWrapper__staffContainer">
          <select
            className="homeModalWrapper__input"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option className="homeModalWrapper__option" value="option1">
              kategoria 1
            </option>
            <option value="option2">kategoria 2</option>
            <option value="option3">kategoria 3</option>
            <option value="option4">kategoria 4</option>
          </select>
          <input
            className="homeModalWrapper__input number"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
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
