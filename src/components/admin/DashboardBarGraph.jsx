import React, { useEffect, useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const allData = {
  2023: {
    BE: { labels: ["ECE", "CSE"], counts: [100, 120] },
    BTech: { labels: ["CSBS"], counts: [80] },
    ME: { labels: [], counts: [] },
  },
  2025: {
    BE: {
      labels: ["ECE", "CSE", "Cyber Security", "EEE", "MECH", "AI-ML", "CCE"],
      counts: [150, 205, 150, 90, 100, 150, 100],
    },
    BTech: { labels: ["CSBS", "AI&DS", "IT"], counts: [70, 80, 65] },
    ME: {
      labels: ["VLSI", "Structural", "Thermal", "Machine Design"],
      counts: [40, 44, 38, 51],
    },
  },
  2024: {
    BE: { labels: [], counts: [] },
    BTech: { labels: ["AI&DS"], counts: [50] },
    ME: { labels: ["Thermal"], counts: [45] },
  },
};

const years = Object.keys(allData).sort();
function useBarThickness() {
  const [thickness, setThickness] = useState(50); // default for desktop

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setThickness(20); // mobile
      } else if (window.innerWidth < 1024) {
        setThickness(40); // tablet
      } else {
        setThickness(50); // laptop/desktop
      }
    }

    handleResize(); // set on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return thickness;
}
function DashboardBarGraph() {
  const currentYear = new Date().getFullYear().toString();
  const [department, setDepartment] = useState("BE");
  const [year, setYear] = useState(currentYear);
  const barThickness = useBarThickness();
  const yearData = allData[year]?.[department];

  const hasData = yearData && yearData.labels.length > 0;

  const data = hasData
    ? {
        labels: yearData.labels,
        datasets: [
          {
            label: `${department} Student Count`,
            data: yearData.counts,
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
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#d1d5db",
          borderDash: [6, 6],
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 px-6 rounded-xl w-[100%] shadow-lg ">
      <div className="md:flex justify-between items-center mb-4">
        <h2 className="playfair text-xl font-bold text-[#282526]">
          No of Students per Department
        </h2>
        <div className=" flex gap-4 mt-3 md:mt-0">
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
            className="border border-gray-300 text-[#282526] font-semibold rounded-lg  p-1 px-2 outline-none"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="BE">BE</option>
            <option value="BTech">BTech</option>
            <option value="ME">ME</option>
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
