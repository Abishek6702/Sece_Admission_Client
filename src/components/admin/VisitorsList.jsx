import React, { useEffect, useState } from "react";
import VisitorsListTable from "./VisitorsListTable";
import RevisitedVisitorsTable from "./RevisitedVisitorsTable"; // <-- new component

const VisitorsList = () => {
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'revisited'
  const [count, setCount] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/enquiries/revisited/count`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch revisited count");
        return res.json();
      })
      .then((data) => {
        setCount(data.revisitedCount);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full h-full">
      <p className="text-2xl playfair mb-4">Visitors Log</p>

      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b border-gray-300">
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-2 px-3 font-medium ${
            activeTab === "all"
              ? "border-b-2 border-[#0B56A4] text-[#0B56A4]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setActiveTab("revisited")}
          className={`pb-2 px-3 font-medium ${
            activeTab === "revisited"
              ? "border-b-2 border-[#0B56A4] text-[#0B56A4]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Revisited <span className="text-[#0B56A4]">({count})</span>
        </button>
      </div>

      {/* Conditional Rendering */}
      {activeTab === "all" ? <VisitorsListTable /> : <RevisitedVisitorsTable />}
    </div>
  );
};

export default VisitorsList;
