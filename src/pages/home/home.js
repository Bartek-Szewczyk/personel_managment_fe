import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS } from "./event-utils";
import Modal from "../../components/modal/modal";
import Delete from "./modalState/deleteEvent";
import AddEvent from "./modalState/addEvent";
import { allEvents } from "../../services/callendarData";
import { deletedEvent } from "../../services/callendarData";

import "./home.scss";

function Home() {
  const [modal, setModal] = useState(false);
  const [modalState, setModalState] = useState("add");
  const [deletedEv, setDeletedEv] = useState();
  const [selectedInfo, setSelectedInfo] = useState();
  const [events, setEvents] = useState();
  const handleClose = () => {
    setModal(false);
  };
  const convertData = (data) => {
    return data.map((item) => {
      return {
        id: item.id,
        title: item.title,
        start: item.dateStart,
        end: item.dateEnd,
        allDay: item.allDay,
        category: item.category.name,
        staffnumber: item.staffNumber,
        backgroundColor: item.backgroundColor,
        borderColor: item.backgroundColor,
      };
    });
  };
  const fetchData = async () => {
    const evs = await allEvents();
    setEvents(convertData(evs));
  };
  useEffect(() => {
    setInterval(fetchData, 2000);
  }, []);
  const handleDateSelect = (selectInfo) => {
    setModal(true);
    setModalState("add");
    setSelectedInfo(selectInfo);
  };

  const handleEventClick = (clickInfo) => {
    setModal(true);
    setModalState("delete");
    setDeletedEv(clickInfo);
  };
  const deleteHandler = () => {
    deletedEvent(deletedEv.event.id);
    setModal(false);
  };
  return (
    <div className="homeContainer">
      <Modal show={modal} handleClose={handleClose}>
        {modalState === "add" ? (
          <AddEvent info={selectedInfo} closeModal={handleClose} />
        ) : (
          <Delete
            info={deletedEv}
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
          events={events}
        />
      </Layout>
    </div>
  );
}

export default Home;
