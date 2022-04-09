import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import Modal from "../../components/modal/modal";
import LineChart from "../../components/charts/line";
import PieChart from "../../components/charts/pie";
import BarChart from "../../components/charts/bar";
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
      <Layout title="Statystyki" buttonText="Filtry" buttonAction={handleOpen}>
        <div className="statisticWrapper__chartWrapper">
          <div className="statisticWrapper__barChart">
            <BarChart />
          </div>
          <div className="statisticWrapper__doughnutChart">
            <PieChart />
          </div>
        </div>
        <div className="statisticWrapper__lineChart">
          <LineChart />
        </div>
      </Layout>
    </div>
  );
};
export default Statistic;
