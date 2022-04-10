import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Kategorie pracowników",
    },
  },
};
const labels = [
  "Barmani",
  "Kelnerzy",
  "Kucharze",
  "Sprzątacze",
  "Zmywak",
  "Ochrona",
];
const data = {
  labels,
  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderWidth: 1,
    },
  ],
};

const PieChart = () => {
  return <Pie options={options} data={data} />;
};
export default PieChart;
