import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const yearlyData = {
  2023: {
    labels: ["Management Quota", "Government Quota"],
    data: [400, 200],
  },
  2024: {
    labels: ["Management Quota", "Government Quota"],
    data: [600, 250],
  },
  2025: {
    labels: ["Management Quota", "Government Quota"],
    data: [800, 300],
  },
};

const AdminPieChart = () => {
  const years = Object.keys(yearlyData);
  const [selectedYear, setSelectedYear] = useState("2025");

  const chartData = {
    labels: yearlyData[selectedYear].labels,
    datasets: [
      {
        label: `Quota Distribution - ${selectedYear}`,
        data: yearlyData[selectedYear].data,
        backgroundColor: ["#4bc0c0", "#ff6384"],
        hoverBackgroundColor: ["#4bc0c0", "#ff6384"],
        borderWidth: ``,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="h-full bg-white rounded-xl shadow-lg">
      <div className="h-70 lg:w-75  lg:mt-0 rounded-xl p-6 flex flex-col items-center">
        <div className="playfair w-full font-semibold text-[#282526] flex items-center justify-between  mb-6">
          <h2 className="playfair text-xl font-bold text-[#282526]">
            Total Student's 
          </h2>
          {/* Dropdown to select year */}
          <div className="roboto ">
            <select
              className=" border border-gray-300 text-[#282526] font-semibold rounded-lg p-1 px-2 outline-none"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className=" w-full  h-full">
          <Doughnut data={chartData} options={options} />
        </div>
      </div>
      <div className="  w-[100%]  text-center space-y-2">
        <div className="flex items-center justify-center  gap-3">
          <span className="w-6 h-3 rounded-md bg-[#4bc0c0] shadow-lg"></span>
          <span className="font-semibold text-[#282526] text-lg">
            Management Quota
          </span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <span className="w-6 h-3 rounded-md bg-[#ff6384] shadow-lg"></span>
          <span className="font-semibold text-[#282526] text-lg">
            Government Quota
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminPieChart;
