import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
import Confirm from "../../../components/confirm/confirm";
import Modal from "../../../components/modal/modal";
import "moment/locale/pl";
import "./homeModal.scss";
import "react-datetime/css/react-datetime.css";
import {
  editEvent,
  getEventById,
  addUserToEvent,
  deleteUserToEvent,
  updateUserToEvent,
} from "../../../services/callendarData";
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
  const [isUserInEventState, setIsUserInEventState] = useState(null);
  const { roles, userId } = useAuth();
  const isAdmin = roles?.indexOf("Admin") != -1;

  const fetchData = async () => {
    await getEventById(info?.event.id).then((data) => {
      setEvent(data);
      setId(data.id);
      setTitle(data.title);
      setAllDayEvents(data.allDay);
      setStart(data.dateStart);
      if (data.allDay) {
        const newDataEventEnd = new Date(data.dateStart);
        newDataEventEnd.setDate(newDataEventEnd.getDate() + 1);
        setEnd(newDataEventEnd);
      } else {
        setEnd(data.dateEnd);
      }
      setSelected(data.category.name);
      setNumber(data.staffNumber);
      isUserInEvent(data.staff);
    });
  };
  useEffect(async () => {
    if (info?.event.id) {
      await fetchData();
    }
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
  const userToEventHandler = async (id) => {
    if (!isUserInEventState) {
      await addUserToEvent(id).then(() => setIsUserInEventState(true));
    } else {
      await deleteUserToEvent(id).then(() => setIsUserInEventState(false));
    }
  };
  const isUserInEvent = (list) => {
    setIsUserInEventState(list.some((x) => x.userId === userId));
  };
  const updateUserToEventHandler = async (id, userId, approved) => {
    await updateUserToEvent(id, userId, approved).then(() => fetchData());
  };
  const isApproved = (list) => {
    return list.some((x) => x.userId === userId && x.approved);
  };
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
            {event.staff.length == 0 ? (
              <h3 className="homeModalWrapper__applicationsWrapper__container__emptyList">
                Brak zgłoszeń
              </h3>
            ) : (
              event.staff.map((el) => {
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
                          el.approved ? "accepted" : ""
                        }`}
                        key={el.surname + "button"}
                        onClick={() => {
                          updateUserToEventHandler(
                            event.id,
                            el.userId,
                            !el.approved
                          );
                        }}
                      >
                        {el.approved ? "Zatwierdzony" : "Akceptuj"}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
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
      {isUserInEventState ? (
        isApproved(event.staff) ? (
          <h1>Jesteś przyjęty !</h1>
        ) : (
          <h1>Czeka na zatwierdzenie</h1>
        )
      ) : (
        <h1>Nowa zmiana</h1>
      )}

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
        <button
          className="homeModalWrapper__button"
          onClick={() => {
            userToEventHandler(event.id);
          }}
        >
          {isUserInEventState ? "Wypisz się" : "Zgłoś się"}
        </button>
      </div>
    </div>
  );
  return <>{isAdmin ? adminView : userView}</>;
}

export default DeleteEvent;
