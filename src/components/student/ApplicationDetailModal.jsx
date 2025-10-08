// ApplicationDetailModal.jsx
import React from 'react';

const ApplicationDetailModal = ({ application, onClose }) => (
  <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
    <div className="w-full max-w-lg rounded-2xl bg-white bg-opacity-40 backdrop-blur-xl p-8 relative shadow-xl border border-white border-opacity-20">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 text-2xl hover:text-red-400"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-4 text-[#232946]">{application.name}</h2>
      <p className="mb-2 font-medium">ID: {application.id}</p>
      <p className="mb-2">Status: <span className="font-semibold">{application.status}</span></p>
      <p className="mb-2">Submitted: {application.date}</p>
      <div className="mt-4 p-4 bg-[#fff] bg-opacity-20 rounded-lg shadow-inner">
        <h3 className="font-semibold">Details</h3>
        <p>{application.details}</p>
      </div>
      {/* Optionally add file uploads, status timeline, and admin notes here */}
    </div>
  </div>
);

export default ApplicationDetailModal;
