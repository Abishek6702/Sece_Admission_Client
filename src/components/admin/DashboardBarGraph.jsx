import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function useBarThickness() {
  const [thickness, setThickness] = useState(50);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) setThickness(20);
      else if (window.innerWidth < 1024) setThickness(40);
      else setThickness(50);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return thickness;
}

function DashboardBarGraph() {
  const currentYear = new Date().getFullYear().toString();
  const [department, setDepartment] = useState("B.E"); // use "B.Tech" matching preferredCourse prefix
  const [year, setYear] = useState(currentYear);
  const [allData, setAllData] = useState({});
  const barThickness = useBarThickness();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/dashboard/yearly-department-counts`)
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
        if (!data[currentYear]) {
          const firstYear = Object.keys(data)[0];
          if (firstYear) setYear(firstYear);
        }
      })
      .catch((err) => {
        console.error("Error fetching department data", err);
        setAllData({});
      });
  }, []);

  const years = Object.keys(allData).sort();

  const yearDataObj = allData[year]?.[department] || {};

  const labels = Object.keys(yearDataObj);
  const counts = Object.values(yearDataObj);

  const hasData = labels.length > 0;

  const data = hasData
    ? {
        labels,
        datasets: [
          {
            label: `${department} Student Count`,
            data: counts,
            backgroundColor: "#0b56a4",
            borderRadius: 10,
            barThickness,
          },
        ],
      }
    : null;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (ctx) => `Count: ${ctx.parsed.y}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        grid: { color: "#d1d5db", borderDash: [6, 6] },
      },
    },
  };

  return (
    <div className="bg-white p-6 px-6 rounded-xl w-[100%] shadow-lg">
      <div className="md:flex justify-between items-center mb-4">
        <h2 className="playfair text-xl font-bold text-[#282526]">No of Students per Department</h2>
        <div className="flex gap-4 mt-3 md:mt-0">
          <select
            className="border border-gray-300 text-[#282526] font-semibold rounded-lg p-1 px-2 outline-none"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {years.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-300 text-[#282526] font-semibold rounded-lg p-1 px-2 outline-none"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="B.E">B.E</option>
            <option value="B.Tech">B.Tech</option> {/* <-- Corrected */}
            <option value="M.E">M.E</option>
          </select>
        </div>
      </div>

      <div className="chart-container h-[300px] w-full">
        {hasData ? (
          <Bar data={data} options={options} />
        ) : (
          <div className="text-center py-20 text-gray-400 font-semibold text-lg">
            No data found for {department} in {year}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardBarGraph;
