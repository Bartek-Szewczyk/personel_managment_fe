import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Miesięczne wydatki na pracowników",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";

          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y + " zł";
          }
          return label;
        },
      },
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
      data: labels.map(() => faker.datatype.number({ min: 65000, max: 90000 })),
      backgroundColor: "rgba(117, 139, 255, 0.5)",
    },
  ],
};

const BarChart = () => {
  return <Bar options={options} data={data} />;
};
export default BarChart;
