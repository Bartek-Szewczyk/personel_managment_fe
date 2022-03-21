import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
import "moment/locale/pl";
import "./homeModal.scss";
import "react-datetime/css/react-datetime.css";

function DeleteEvent({ info, deleteHandler, closeModal }) {
  const [title, setTitle] = useState();
  const [allDayEvents, setAllDayEvents] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [selected, setSelected] = useState();
  const [number, setNumber] = useState();
  useEffect(() => {
    console.log(info?.event);
    setTitle(info?.event.title);
    setAllDayEvents(info?.event.allDay);
    setStart(info?.event.startStr);
    setEnd(info?.event.endStr);
    setSelected(info?.event.extendedProps.category);
    setNumber(info?.event.extendedProps.staffnumber);
  }, [info]);

  const saveHandler = () => {
    let calendarApi = info.view.calendar;
    let event = calendarApi.getEventById(info?.event.id);
    event.setProp("title", title);
    event.setAllDay(allDayEvents);
    event.setStart(start._d ? start._d : start);
    event.setEnd(end._d ? end._d : end);
    event.setExtendedProp("category", selected);
    event.setExtendedProp("staffnumber", number);
    event.setProp("backgroundColor", setColor(selected));
    event.setProp("borderColor", setColor(selected));
    closeModal();
  };

  const staff = [
    { name: "Alek", surname: "Sobczak", status: true },
    { name: "Piotr", surname: "Sokołowski", status: false },
    { name: "Aleksandra", surname: "Michalak", status: false },
    { name: "Elena", surname: "Kubiak", status: false },
  ];
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
  return (
    <div className="homeModalWrapper">
      <h1>Edytuj zmianę</h1>
      <div className="row">
        <div className="col">
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
        </div>

        <div className="homeModalWrapper__applicationsWrapper">
          <h2>Zgłoszenia</h2>
          <div className="homeModalWrapper__applicationsWrapper__container">
            {staff.map((el) => {
              return (
                <div
                  kay={el.surname}
                  className="homeModalWrapper__applicationsWrapper__container__singleapp"
                >
                  <p>
                    {el.name} {el.surname}
                  </p>
                  <div className="homeModalWrapper__applicationsWrapper__container__singleapp__buttonWrapper">
                    <button
                      className={`homeModalWrapper__applicationsWrapper__container__singleapp__button ${
                        el.status ? "accepted" : ""
                      }`}
                    >
                      {el.status ? "Zatwierdzony" : "Akceptuj"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="homeModalWrapper__buttonContainer">
        <button className="homeModalWrapper__button" onClick={saveHandler}>
          Zapisz
        </button>
        <button
          className="homeModalWrapper__button delete"
          onClick={deleteHandler}
        >
          Usuń
        </button>
      </div>
    </div>
  );
}

export default DeleteEvent;
