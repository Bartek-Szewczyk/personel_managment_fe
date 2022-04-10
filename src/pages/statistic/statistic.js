import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import LineChart from "../../components/charts/line";
import PieChart from "../../components/charts/pie";
import BarChart from "../../components/charts/bar";
import "./statistic.scss";

const Statistic = () => {
  return (
    <div className="statisticWrapper">
      <Layout title="Statystyki">
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
