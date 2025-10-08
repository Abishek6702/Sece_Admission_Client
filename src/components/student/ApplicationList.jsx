// ApplicationList.jsx
import React from 'react';

const statusColors = {
  Pending: 'bg-yellow-200 text-yellow-800',
  Approved: 'bg-green-200 text-green-800',
  Rejected: 'bg-red-200 text-red-800',
};

const ApplicationList = ({ applications, onViewDetails }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {applications.map(app => (
      <div
        key={app.id}
        className="rounded-2xl bg-white bg-opacity-30 backdrop-blur-lg shadow-lg p-6 flex flex-col gap-2 border border-white border-opacity-30"
      >
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-[#232946]">{app.name}</span>
          <span className={`px-3 py-1 rounded-full text-xs ${statusColors[app.status]}`}>
            {app.status}
          </span>
        </div>
        <div className="text-sm opacity-80 mb-1">Submitted: {app.date}</div>
        <button
          className="mt-3 bg-gradient-to-r from-[#2256ad] to-[#3aa0ef] text-white font-medium px-4 py-2 rounded-lg shadow-md transition hover:scale-105"
          onClick={() => onViewDetails(app)}
        >
          View Details
        </button>
      </div>
    ))}
  </div>
);

export default ApplicationList;
