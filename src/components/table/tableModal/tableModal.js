import React, { useState } from "react";
import Modal from "../../modal/modal";
import Confirm from "../../confirm/confirm";
import "./tableModal.scss";

function TableModal({ data, closeHandler }) {
  const [confirm, setConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("Na pewno zapisać zminay?");
  const [name, setName] = useState(data.firstName);
  const [surname, setSurname] = useState(data.lastName);
  const [email, setEmail] = useState(`${name}.${surname.charAt(0)}@mail.com`);
  const [phoneNumber, setPhoneNumber] = useState(823612394);
  const [selected, setSelected] = useState(data.category);
  const [number, setNumber] = useState(1);
  const [hours, setHours] = useState(data.hours);
  const [count, setCount] = useState(data.count);

  const oldReport = [
    { month: "Styczeń", hours: 154, amount: 3388, status: true },
    { month: "Luty", hours: 120, amount: 2640, status: true },
    { month: "Marzec", hours: 145, amount: 3190, status: false },
  ];
  const handleCloseConfirm = () => {
    setConfirm(false);
  };
  const handleYes = () => {
    setConfirm(false);
    closeHandler();
  };
  const handleNo = () => {
    if (confirmText === "Czy na pewno chcesz usunąć?") {
      setConfirm(false);
      closeHandler();
    } else {
      setConfirm(false);
    }
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
                <option value="Kelnerka">Kelnerka</option>
                <option value="Kucharka">Kucharka</option>
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
                    kay={el.month}
                    className="tableModalWrapper__reportWrapper__container__singleapp"
                  >
                    <p className="tableModalWrapper__reportWrapper__container__singleapp__month">
                      {el.month}
                    </p>
                    <p className="tableModalWrapper__reportWrapper__container__singleapp__hours">
                      {el.hours} godz.
                    </p>
                    <p className="tableModalWrapper__reportWrapper__container__singleapp__amount">
                      {el.amount} zł
                    </p>
                    <div className="tableModalWrapper__reportWrapper__container__singleapp__buttonWrapper">
                      <button
                        className={`tableModalWrapper__reportWrapper__container__singleapp__button ${
                          el.status ? "accepted" : ""
                        }`}
                      >
                        {el.status ? "Wypłacone" : "Oczekuje"}
                      </button>
                      {el.status && (
                        <p className="tableModalWrapper__reportWrapper__container__singleapp__button__date">
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
