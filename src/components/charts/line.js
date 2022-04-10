import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Ogólne liczby",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const labels = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
];

const data = {
  labels,
  datasets: [
    {
      label: "Ilość pracowników",
      data: labels.map(() => faker.datatype.number({ min: 20, max: 35 })),
      borderColor: "rgba(75, 192, 192, 0.5)",
      backgroundColor: "rgba(75, 192, 192, 0.5)",
      tension: 0.2,
    },
    {
      label: "Ilość eventów",
      data: labels.map(() => faker.datatype.number({ min: 8, max: 15 })),
      borderColor: "rgb(53, 162, 235, 0.5)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      tension: 0.2,
    },
  ],
};

const LineChart = () => {
  return <Line options={options} data={data} />;
};
export default LineChart;
