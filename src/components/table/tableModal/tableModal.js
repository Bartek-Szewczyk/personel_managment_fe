import React, { useEffect, useState } from "react";
import Modal from "../../modal/modal";
import Confirm from "../../confirm/confirm";
import "./tableModal.scss";
import { deleteUser, editUser, getUserById } from "../../../services/usersData";

function TableModal({ data, closeHandler, reload }) {
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

  const fetchData = async () => {
    const res = await getUserById(data.id);
    setName(res.firstName);
    setSurname(res.lastName);
    setEmail(res.email);
    setPhoneNumber(res.phone);
    setSelected(res.category.name);
    setNumber(res.hourlyRate);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const oldReport = [
    { month: "Styczeń", hours: 154, amount: 3388, status: true },
    { month: "Luty", hours: 120, amount: 2640, status: true },
    { month: "Marzec", hours: 145, amount: 3190, status: false },
  ];
  const handleCloseConfirm = () => {
    setConfirm(false);
  };
  const handleYes = () => {
    if (confirmText === "Czy na pewno chcesz usunąć?") {
      deleteHandler();
      setConfirm(false);
      closeHandler();
    } else if (confirmText === "Czy potwierdzasz wypłacenie?") {
      setConfirm(false);
    } else if (confirmText === "Czy na pewno chcesz zapisać zmiany?") {
      editHandler();
      closeHandler();
      setConfirm(false);
    }
  };
  const handleNo = () => {
    if (confirmText === "Czy na pewno chcesz usunąć?") {
      setConfirm(false);
    } else if (confirmText === "Czy potwierdzasz wypłacenie?") {
      setConfirm(false);
    } else {
      setConfirm(false);
    }
  };
  const payed = () => {
    setConfirmText("Czy potwierdzasz wypłacenie?");
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
              />
            </div>
            <div className="tableModalWrapper__inputWrapper">
              <h3>Ilość zmian</h3>
              <input
                className="tableModalWrapper__input "
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
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
              {oldReport.map((el, index) => {
                return (
                  <div
                    key={el.month + index}
                    className="tableModalWrapper__reportWrapper__container__singleapp"
                  >
                    <p
                      className="tableModalWrapper__reportWrapper__container__singleapp__month"
                      key={el.month}
                    >
                      {el.month}
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
                          !el.status ? payed() : setConfirm(false);
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
                          02.0{index + 1}.2022
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
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
