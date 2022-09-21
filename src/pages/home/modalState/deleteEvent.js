import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
import Confirm from "../../../components/confirm/confirm";
import Modal from "../../../components/modal/modal";
import "moment/locale/pl";
import "./homeModal.scss";
import "react-datetime/css/react-datetime.css";
import { editEvent, getEventById } from "../../../services/callendarData";
import useAuth from "../../../services/auth/hooks";

function DeleteEvent({ info, deleteHandler, closeModal, reload }) {
  const [confirm, setConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("Na pewno zapisać zmiany?");
  const [id, setId] = useState();
  const [title, setTitle] = useState("");
  const [allDayEvents, setAllDayEvents] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [selected, setSelected] = useState();
  const [number, setNumber] = useState();
  const [event, setEvent] = useState({ staff: [] });
  const { roles } = useAuth();
  const isAdmin = roles?.indexOf("Admin") != -1;
  useEffect(async () => {
    const eventData = await getEventById(info?.event.id);
    console.log(eventData);
    setEvent(eventData);
    setId(eventData.id);
    setTitle(eventData.title);
    setAllDayEvents(eventData.allDay);
    setStart(eventData.dateStart);
    if (eventData.allDay) {
      const newDataEventEnd = new Date(eventData.dateStart);
      newDataEventEnd.setDate(newDataEventEnd.getDate() + 1);
      setEnd(newDataEventEnd);
    } else {
      setEnd(eventData.dateEnd);
    }
    setSelected(eventData.category.name);
    setNumber(eventData.staffNumber);
  }, [info]);

  const saveHandler = () => {
    const cat = setColor(selected);
    editEvent({
      id: id,
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
    }).then(() => reload());
    closeModal();
  };
  const staff = event.staff.map((item) => {
    return {
      name: item.firstName,
      surname: item.lastName,
      status: false,
    };
  });
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
  const handleCloseConfirm = () => {
    setConfirm(false);
  };
  const handleYes = () => {
    if (confirmText === "Czy na pewno chcesz usunąć?") {
      setConfirm(false);
      deleteHandler();
      closeModal();
    } else {
      setConfirm(false);
      saveHandler();
    }
  };
  const handleNo = () => {
    if (confirmText === "Czy na pewno chcesz usunąć?") {
      setConfirm(false);
      closeModal();
    } else {
      setConfirm(false);
    }
  };
  const adminView = (
    <div className="homeModalWrapper">
      <Modal show={confirm} handleClose={handleCloseConfirm}>
        <Confirm
          title={confirmText}
          yesButtonHandler={handleYes}
          noButtonHandler={handleNo}
        />
      </Modal>
      <h1>Edytuj zmianę</h1>
      <div className="row">
        <div className="col">
          <h3>Nazwa wydarzenia</h3>
          <input
            className="homeModalWrapper__input"
            type="text"
            value={event.title}
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
              <option className="homeModalWrapper__option" value="Barman">
                Barman
              </option>
              <option value="Kelner">Kelner</option>
              <option value="Kucharz">Kucharz</option>
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
                  key={el.surname}
                  className="homeModalWrapper__applicationsWrapper__container__singleapp"
                >
                  <p key={el.surname + "p"}>
                    {el.name} {el.surname}
                  </p>
                  <div
                    className="homeModalWrapper__applicationsWrapper__container__singleapp__buttonWrapper"
                    key={el.surname + "div"}
                  >
                    <button
                      className={`homeModalWrapper__applicationsWrapper__container__singleapp__button ${
                        el.status ? "accepted" : ""
                      }`}
                      key={el.surname + "button"}
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
        <button
          className="homeModalWrapper__button"
          onClick={() => {
            setConfirmText("Czy na pewno chcesz zapisać zmiany?");
            setConfirm(true);
          }}
        >
          Zapisz
        </button>
        <button
          className="homeModalWrapper__button delete"
          onClick={() => {
            setConfirmText("Czy na pewno chcesz usunąć?");
            setConfirm(true);
          }}
        >
          Usuń
        </button>
      </div>
    </div>
  );
  const userView = (
    <div className="homeModalWrapper">
      <h1>Zmina</h1>
      <div>
        <div className="col">
          <h3>Nazwa wydarzenia: </h3>
          <p className="homeModalWrapper__input">{event.title}</p>
          <div className="homeModalWrapper__checkboxContainer">
            <input
              className="homeModalWrapper__checkboxContainer__checkbox"
              type="checkbox"
              checked={allDayEvents}
              onClick={() => setAllDayEvents(!allDayEvents)}
              disabled
            />
            Cały dzień
            <span className="homeModalWrapper__checkboxContainer__checkmark"></span>
          </div>
          <div className="homeModalWrapper__timeContainer">
            <div className="homeModalWrapper__timeContainer__column">
              <h3>Start</h3>
              {event.allDay ? (
                <p className="homeModalWrapper__input">
                  {new Date(start).toLocaleDateString()}
                </p>
              ) : (
                <p className="homeModalWrapper__input">
                  {new Date(start).toLocaleDateString()}{" "}
                  {new Date(start).toLocaleTimeString()}
                </p>
              )}
            </div>
            <div className="homeModalWrapper__timeContainer__column">
              <h3>Koniec</h3>
              {event.allDay ? (
                <p className="homeModalWrapper__input">
                  {new Date(end).toLocaleDateString()}
                </p>
              ) : (
                <p className="homeModalWrapper__input">
                  {new Date(end).toLocaleDateString()}{" "}
                  {new Date(end).toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="homeModalWrapper__buttonContainer">
        <button className="homeModalWrapper__button" onClick={() => {}}>
          Zgłoś się
        </button>
      </div>
    </div>
  );
  return <>{isAdmin ? adminView : userView}</>;
}

export default DeleteEvent;
