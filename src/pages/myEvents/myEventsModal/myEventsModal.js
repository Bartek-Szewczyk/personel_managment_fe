import React, { useState } from "react";
import { reportHours } from "../../../services/callendarData";
import "./myEventsModal.scss";

function MyEventsModal({ data, closeHandler, reload }) {
  const [number, setNumber] = useState(data.hours);
  const submit = (e) => {
    e.preventDefault();
    reportHours(data.eventId, number).then(() => {
      reload();
    });
    closeHandler();
  };
  return (
    <form className="myEventsModalWrapper" onSubmit={submit}>
      <h1>{data.eventName}</h1>
      <div className="row">
        <h3 className="spaceRight">Data:</h3>
        <p className="myEventsModalWrapper__input">
          {new Date(data.dateStart).toLocaleString()}
        </p>
      </div>
      <div className="row">
        <h3>Ilość przepracowanych godzin:</h3>
        <input
          className="myEventsModalWrapper__input number"
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          disabled={data.paid != "Nie"}
        />
      </div>
      {data.paid == "Nie" && (
        <div className="myEventsModalWrapper__buttonContainer">
          <button className="myEventsModalWrapper__button" type="submit">
            Zapisz
          </button>
        </div>
      )}
    </form>
  );
}

export default MyEventsModal;
