import React, { useEffect, useState } from "react";
import Modal from "../../modal/modal";
import Confirm from "../../confirm/confirm";
import "./tableModal.scss";
import {
  deleteUser,
  editUser,
  getUserById,
  paidUser,
} from "../../../services/usersData";

function TableModal({ data, closeHandler, reload, loading }) {
  const [confirm, setConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("Na pewno zapisać zminay?");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selected, setSelected] = useState("");
  const [number, setNumber] = useState(1);
  const [hours, setHours] = useState(data.hours);
  const [count, setCount] = useState(data.count);
  const [reportList, setReportList] = useState([]);
  const [monthToPaid, setMonthToPaid] = useState();
  const [paidStatus, setPaidStatus] = useState();

  const fetchData = async () => {
    loading(true);
    const res = await getUserById(data.id).finally(() => loading(false));
    setName(res.firstName);
    setSurname(res.lastName);
    setEmail(res.email);
    setPhoneNumber(res.phone);
    setSelected(res.category.name);
    setNumber(res.hourlyRate);
    setReportList(parseReports(res.monthReports));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const setMonth = (month) => {
    switch (month) {
      case 0:
        return "Styczeń";
      case 1:
        return "Luty";
      case 2:
        return "Marzec";
      case 3:
        return "Kwiecień";
      case 4:
        return "Maj";
      case 5:
        return "Czerwiec";
      case 6:
        return "Lipiec";
      case 7:
        return "Sierpień";
      case 8:
        return "Wrzesień";
      case 9:
        return "Październik";
      case 10:
        return "Listopad";
      case 11:
        return "Grudzień";
      default:
        break;
    }
  };
  const parseReports = (list) => {
    const newList = [];
    list.map((item) => {
      if (!item.amount == 0 && !item.hours == 0) {
        newList.push({
          month: item.monthDate,
          hours: item.hours,
          amount: item.amount,
          status: item.paid,
          paidDate: item.paidDate,
        });
      }
    });
    return newList;
  };
  const handleCloseConfirm = () => {
    setConfirm(false);
  };
  const handleYes = () => {
    if (confirmText === "Czy na pewno chcesz usunąć?") {
      deleteHandler();
      setConfirm(false);
      closeHandler();
    } else if (
      confirmText === "Czy potwierdzasz wypłacenie?" ||
      confirmText === "Czy anulować wypłatę?"
    ) {
      paidHandler(monthToPaid, data.id, !paidStatus);
      setConfirm(false);
    } else if (confirmText === "Czy na pewno chcesz zapisać zmiany?") {
      editHandler();
      closeHandler();
      setConfirm(false);
    }
  };
  const handleNo = () => {
    setConfirm(false);
  };
  const payed = (month, status) => {
    setMonthToPaid(month);
    setPaidStatus(status);
    if (status) {
      setConfirmText("Czy anulować wypłatę?");
    } else {
      setConfirmText("Czy potwierdzasz wypłacenie?");
    }
    setConfirm(true);
  };
  const deleteHandler = () => {
    deleteUser(data.id).then(() => {
      reload();
    });
  };
  const getCategory = (category) => {
    switch (category) {
      case "Barman":
        return { name: "Barman", id: 1 };
      case "Kelner":
        return { name: "Kelner", id: 2 };
      case "Kucharz":
        return { name: "Kucharz", id: 3 };
      case "Manager":
        return { name: "Manager", id: 4 };
      default:
        break;
    }
  };
  const editHandler = () => {
    const user = {
      id: data.id,
      firstName: name,
      lastName: surname,
      email: email,
      phone: phoneNumber,
      category: getCategory(selected),
      hourlyRate: number,
    };
    editUser(user).then(() => {
      reload();
    });
  };
  const paidHandler = (date, userId, paid) => {
    paidUser(date, userId, paid).then(() => {
      fetchData();
    });
  };
  return (
    <>
      <Modal show={confirm} handleClose={handleCloseConfirm}>
        <Confirm
          title={confirmText}
          yesButtonHandler={handleYes}
          noButtonHandler={handleNo}
        />
      </Modal>
      <div className="tableModalWrapper">
        <h1>Informacje o pracowniku</h1>
        <div className="tableModalWrapper__gridWrapper">
          <div className="tableModalWrapper__grid">
            <div className="tableModalWrapper__inputWrapper">
              <h3>Imię</h3>
              <input
                className="tableModalWrapper__input"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>
            <div className="tableModalWrapper__inputWrapper">
              <h3>Nazwisko</h3>
              <input
                className="tableModalWrapper__input"
                type="text"
                value={surname}
                onChange={(e) => {
                  setSurname(e.target.value);
                }}
                required
              />
            </div>
            <div className="tableModalWrapper__inputWrapper">
              <h3>Email</h3>
              <input
                className="tableModalWrapper__input"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
            <div className="tableModalWrapper__inputWrapper">
              <h3>Telefon</h3>
              <input
                className="tableModalWrapper__input"
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                required
              />
            </div>
            <div className="tableModalWrapper__inputWrapper">
              <h3>Przepracowane godziny</h3>
              <input
                className="tableModalWrapper__input "
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                disabled
              />
            </div>
            <div className="tableModalWrapper__inputWrapper">
              <h3>Ilość zmian</h3>
              <input
                className="tableModalWrapper__input "
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                disabled
              />
            </div>
            <div className="tableModalWrapper__inputWrapper">
              <h3>Kategoria</h3>
              <select
                className="tableModalWrapper__input"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option className="homeModalWrapper__option" value="Barman">
                  Barman
                </option>
                <option value="Kelner">Kelner</option>
                <option value="Kucharz">Kucharz</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            <div className="tableModalWrapper__inputWrapper ">
              <h3>Stawka godzinowa </h3>
              <input
                className="tableModalWrapper__input "
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="tableModalWrapper__reportWrapper">
            <h2>Poprzednie miesiące</h2>
            <div className="tableModalWrapper__reportWrapper__container">
              {reportList.length == 0 ? (
                <h3 className="homeModalWrapper__applicationsWrapper__container__emptyList">
                  Brak raportów
                </h3>
              ) : (
                reportList.map((el, index) => {
                  return (
                    <div
                      key={el.month + index}
                      className="tableModalWrapper__reportWrapper__container__singleapp"
                    >
                      <p
                        className="tableModalWrapper__reportWrapper__container__singleapp__month"
                        key={el.month}
                      >
                        {setMonth(new Date(el.month).getMonth())}
                      </p>
                      <p
                        className="tableModalWrapper__reportWrapper__container__singleapp__hours"
                        key={el.hours}
                      >
                        {el.hours} godz.
                      </p>
                      <p
                        className="tableModalWrapper__reportWrapper__container__singleapp__amount"
                        key={el.amount}
                      >
                        {el.amount} zł
                      </p>
                      <div
                        className="tableModalWrapper__reportWrapper__container__singleapp__buttonWrapper"
                        key={el.status + "div"}
                      >
                        <button
                          className={`tableModalWrapper__reportWrapper__container__singleapp__button ${
                            el.status ? "accepted" : ""
                          }`}
                          onClick={() => {
                            payed(el.month, el.status);
                          }}
                          key={el.status + "button"}
                        >
                          {el.status ? "Wypłacone" : "Oczekuje"}
                        </button>
                        {el.status && (
                          <p
                            className="tableModalWrapper__reportWrapper__container__singleapp__button__date"
                            key={el.status + "p"}
                          >
                            {new Date(el.paidDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="tableModalWrapper__buttonContainer">
          <button
            className="tableModalWrapper__button"
            onClick={() => {
              setConfirmText("Czy na pewno chcesz zapisać zmiany?");
              setConfirm(true);
            }}
          >
            Zapisz
          </button>
          <button
            className="tableModalWrapper__button delete"
            onClick={() => {
              setConfirmText("Czy na pewno chcesz usunąć?");
              setConfirm(true);
            }}
          >
            Usuń
          </button>
        </div>
      </div>
    </>
  );
}

export default TableModal;
