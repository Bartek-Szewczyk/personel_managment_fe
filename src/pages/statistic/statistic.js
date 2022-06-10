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
  const pieChartData = {
    labels: data?.personnelCount.map((el) => el.name),
    datasets: [
      {
        data: data?.personnelCount.map((el) => el.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: parseLabel(data?.eventCount),
    datasets: [
      {
        label: "Ilość pracowników",
        data: data?.personnelByMonth.map((el) => el.costValue),
        borderColor: "rgba(75, 192, 192, 0.5)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.2,
      },
      {
        label: "Ilość eventów",
        data: data?.eventCount.map((el) => el.costValue),
        borderColor: "rgb(53, 162, 235, 0.5)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.2,
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
            {data?.personnelCount && <PieChart data={pieChartData} />}
          </div>
        </div>
        <div className="statisticWrapper__lineChart">
          {data?.eventCount && data?.personnelByMonth && (
            <LineChart data={lineChartData} />
          )}
        </div>
      </Layout>
    </div>
  );
};
export default Statistic;
