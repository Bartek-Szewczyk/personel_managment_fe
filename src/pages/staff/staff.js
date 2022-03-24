import React, { useMemo } from "react";
import Layout from "../../components/layout/layout";
import Table from "../../components/table/table";
import "./staff.scss";

const Staff = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Pracownik",
        columns: [
          {
            Header: "Imię",
            accessor: "firstName",
          },
          {
            Header: "Nazwisko",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Informacje",
        columns: [
          {
            Header: "Stanowisko",
            accessor: "category",
          },
          {
            Header: "Suma godzin",
            accessor: "hours",
          },
          {
            Header: "Liczba zmian",
            accessor: "count",
          },
        ],
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        firstName: "Alek",
        lastName: "Sobczak",
        category: "Kelner",
        hours: "97",
        count: "12",
      },
      {
        firstName: "Piotr",
        lastName: "Sokołowski",
        category: "Barman",
        hours: "103",
        count: "15",
      },
      {
        firstName: "Aleksandra",
        lastName: "Michalak",
        category: "Kelnerka",
        hours: "135",
        count: "17",
      },
      {
        firstName: "Elena",
        lastName: "Kubiak",
        category: "Kucharka",
        hours: "142",
        count: "19",
      },
    ],
    []
  );
  return (
    <div className="staffWrapper">
      <Layout title="Personel" buttonText="Dodaj pracownika">
        <Table columns={columns} data={data} />
      </Layout>
    </div>
  );
};

export default Staff;
