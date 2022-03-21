import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS } from "./event-utils";
import Modal from "../../components/modal/modal";
import Delete from "./modalState/deleteEvent";
import AddEvent from "./modalState/addEvent";

import "./home.scss";

function Home() {
  const [modal, setModal] = useState(false);
  const [modalState, setModalState] = useState("add");
  const [deletedEvent, setDeletedEvent] = useState();
  const [selectedInfo, setSelectedInfo] = useState();
  const handleClose = () => {
    setModal(false);
  };
  const handleDateSelect = (selectInfo) => {
    setModal(true);
    setModalState("add");
    setSelectedInfo(selectInfo);
  };

  const handleEventClick = (clickInfo) => {
    setModal(true);
    setModalState("delete");
    setDeletedEvent(clickInfo);
  };
  const deleteHandler = () => {
    deletedEvent.event.remove();
    setModal(false);
  };
  return (
    <div className="homeContainer">
      <Modal show={modal} handleClose={handleClose}>
        {modalState === "add" ? (
          <AddEvent info={selectedInfo} closeModal={handleClose} />
        ) : (
          <Delete
            info={deletedEvent}
            deleteHandler={deleteHandler}
            closeModal={handleClose}
          />
        )}
      </Modal>
      <Layout title="Kalendarz">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          locale="pl"
          firstDay={1}
          height="90vh"
          select={handleDateSelect}
          eventClick={handleEventClick}
          events={INITIAL_EVENTS}
        />
      </Layout>
    </div>
  );
}

export default Home;
