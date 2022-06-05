import React, { useMemo, useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import Table from "../../components/table/table";
import Modal from "../../components/modal/modal";
import "./staff.scss";
import { addUser, allUsers } from "../../services/usersData";

const Staff = () => {
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [selected, setSelected] = useState("Barman");
  const [number, setNumber] = useState(1);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const handleClose = () => {
    setModal(false);
  };
  const handleCloseConfirm = () => {
    setConfirm(false);
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
  const parseUser = (userArr) => {
    return userArr.map((user) => {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        category: user.category.name,
        hours: "97",
        count: "12",
      };
    });
  };

  const fetchData = async () => {
    const data = await allUsers();
    const parsedData = parseUser(data);
    setData(parsedData);
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

  const newUser = async () => {
    await addUser({
      firstName: name,
      lastName: surname,
      email: email,
      phone: phone,
      category: getCategory(selected),
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    newUser().then(() => {
      fetchData();
    });

    handleClose();
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="staffWrapper">
      <Modal show={confirm} handleClose={handleCloseConfirm} />
      <Modal show={modal} handleClose={handleClose}>
        <form className="staffModal" onSubmit={handleSubmit}>
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
          <div className="staffWrapper__inputWrapper">
            <h3>Phone</h3>
            <input
              className="staffWrapper__input"
              type="tel"
              onChange={(e) => {
                setPhone(e.target.value);
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
                <option className="homeModalWrapper__option" value="Barman">
                  Barman
                </option>
                <option value="Kelner">Kelner</option>
                <option value="Kucharz">Kucharz</option>
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
        <Table
          columns={columns}
          data={data}
          reload={() => {
            fetchData();
          }}
        />
      </Layout>
    </div>
  );
};

export default Staff;
