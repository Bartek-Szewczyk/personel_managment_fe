import React, { useMemo, useState } from "react";
import Layout from "../../components/layout/layout";
import Table from "../../components/table/table";
import Modal from "../../components/modal/modal";
import "./staff.scss";

const Staff = () => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [selected, setSelected] = useState("option1");
  const [number, setNumber] = useState(1);
  const [error, setError] = useState(false);

  const handleClose = () => {
    setModal(false);
  };

  const handleOpen = () => {
    setModal(true);
  };

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
      <Modal show={modal} handleClose={handleClose}>
        <form className="staffModal">
          <h1>Dodaj nowego pracownika</h1>
          <div className="staffWrapper__inputWrapper">
            <h3>Imię</h3>
            <input
              className="staffWrapper__input"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div className="staffWrapper__inputWrapper">
            <h3>Nazwisko</h3>
            <input
              className="staffWrapper__input"
              type="text"
              onChange={(e) => {
                setSurname(e.target.value);
              }}
              required
            />
          </div>
          <div className="staffWrapper__inputWrapper">
            <h3>Email</h3>
            <input
              className="staffWrapper__input"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="staffWrapper__categoryWrapper">
            <div className="staffWrapper__inputWrapper singleColumn">
              <h3>Kategoria pracownika</h3>
              <select
                className="staffWrapper__input"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option className="homeModalWrapper__option" value="option1">
                  kategoria 1
                </option>
                <option value="option2">kategoria 2</option>
                <option value="option3">kategoria 3</option>
                <option value="option4">kategoria 4</option>
              </select>
            </div>
            <div className="staffWrapper__inputWrapper singleColumn">
              <h3>Stawka godzinowa </h3>
              <input
                className="staffWrapper__input "
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </div>
          <input
            type="submit"
            className="staffWrapper__button"
            value="Dodaj pracownika"
          ></input>
          {error && (
            <p className="staffWrapper__error">Podaj nazwę wydarzenia</p>
          )}
        </form>
      </Modal>
      <Layout
        title="Personel"
        buttonText="Dodaj pracownika"
        buttonAction={handleOpen}
      >
        <Table columns={columns} data={data} />
      </Layout>
    </div>
  );
};

export default Staff;
