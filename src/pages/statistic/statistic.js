import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import LineChart from "../../components/charts/line";
import PieChart from "../../components/charts/pie";
import BarChart from "../../components/charts/bar";
import "./statistic.scss";
import { getDashboardData } from "../../services/dashboardData";

const Statistic = () => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const response = await getDashboardData();
    setData(response);
    console.log(response);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const labels = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];
  const parseLabel = (arr) => {
    return arr?.map((month) => {
      return labels[month.month - 1];
    });
  };

  const barChartData = {
    labels: parseLabel(data?.costList),
    datasets: [
      {
        data: data?.costList.map((el) => el.costValue),
        backgroundColor: "rgba(117, 139, 255, 0.5)",
      },
    ],
  };
  return (
    <div className="statisticWrapper">
      <Layout title="Statystyki">
        <div className="statisticWrapper__chartWrapper">
          <div className="statisticWrapper__barChart">
            {data?.costList && <BarChart data={barChartData} />}
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
