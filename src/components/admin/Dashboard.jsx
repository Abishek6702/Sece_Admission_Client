import React from "react";
import DashboardCard from "./DashboardCard";
import DashboardBarGraph from "./DashboardBarGraph";
import AdminPieChart from "./AdminPieChart";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Cards Section */}
      <div className="card-container  w-full md:h-[25%] mt-10 md:mt-0">
        <DashboardCard />
      </div>

      {/* Graphs Section */}
      <div className="graph-container     w-full mt-6  lg:mt-[-10px] flex flex-col lg:flex-row items-center gap-4 h-full">
        <div className="w-full lg:w-[70%] h-[full]">
          <DashboardBarGraph />
        </div>

        <div className="  h-[394px] mt-2 md:mt-0 ">
          <AdminPieChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
