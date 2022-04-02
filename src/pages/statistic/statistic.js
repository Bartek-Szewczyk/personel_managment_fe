import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import Modal from "../../components/modal/modal";
import "./statistic.scss";

const Statistic = () => {
  const [modal, setModal] = useState(false);
  const handleClose = () => {
    setModal(false);
  };
  const handleOpen = () => {
    setModal(true);
  };
  return (
    <div className="statisticWrapper">
      <Modal show={modal} handleClose={handleClose}></Modal>
      <Layout
        title="Statystyki"
        buttonText="Filtry"
        buttonAction={handleOpen}
      ></Layout>
    </div>
  );
};
export default Statistic;
