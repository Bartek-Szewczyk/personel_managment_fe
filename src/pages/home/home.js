import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "../../components/modal/modal";
import Delete from "./modalState/deleteEvent";
import AddEvent from "./modalState/addEvent";
import { allEvents } from "../../services/callendarData";
import { deletedEvent } from "../../services/callendarData";
import useAuth from "../../services/auth/hooks";

import "./home.scss";

function Home() {
  const { onLogout } = useAuth();
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
    const evs = await allEvents().catch((e) => {
      onLogout();
    });
    setEvents(convertData(evs));
  };
  useEffect(() => {
    fetchData();
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
    deletedEvent(deletedEv.event.id).then(() => {
      fetchData();
    });
    setModal(false);
  };
  return (
    <div className="homeContainer">
      <Modal show={modal} handleClose={handleClose}>
        {modalState === "add" ? (
          <AddEvent
            info={selectedInfo}
            closeModal={handleClose}
            reload={() => fetchData()}
          />
        ) : (
          <Delete
            info={deletedEv}
            deleteHandler={deleteHandler}
            closeModal={handleClose}
            reload={() => fetchData()}
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
