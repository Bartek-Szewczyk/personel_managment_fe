import React, { useEffect, useState, useMemo } from "react";
import Layout from "../../components/layout/layout";
import Loader from "../../components/loader/loader";
import Table from "../../components/table/table";
import { getUserEvents } from "../../services/callendarData";
import { MyEventContainer } from "./styleMyEvents";

export default function MyEvents() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const modalType = "myEvents";
  const columns = useMemo(
    () => [
      {
        Header: "Raporty",
        columns: [
          {
            Header: "Data",
            accessor: "date",
          },
          {
            Header: "Nazwa",
            accessor: "eventName",
          },
          {
            Header: "Godziny",
            accessor: "hours",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Wypłacone?",
            accessor: "paid",
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await getUserEvents()
      .then((response) => {
        setEvents(parseData(response));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const parseData = (data) => {
    return data.map((item) => {
      return {
        eventId: item.eventId,
        date: eventDate(item.dateStart),
        dateStart: item.dateStart,
        eventName: item.eventName,
        hours: item.hours,
        status: item.status !== 1 ? "Nadchodzące" : "Zakończone",
        paid: item.paid ? "Tak" : "Nie",
      };
    });
  };

  const eventDate = (date) => {
    const eventDate = new Date(date);
    return eventDate.toLocaleDateString();
  };

  return (
    <MyEventContainer>
      <Loader loading={loading} />
      <Layout title={"Moje zmiany"}>
        <Table
          columns={columns}
          data={events}
          modalType={modalType}
          reload={() => {
            fetchData();
          }}
        />
      </Layout>
    </MyEventContainer>
  );
}
