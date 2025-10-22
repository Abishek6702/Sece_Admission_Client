import { X } from "lucide-react";
import React, { useState } from "react";

const ScholorshipModal = ({ setScholorModalOpen, onSave }) => {
  const [hasScholarship, setHasScholarship] = useState(false);
  const [scholarshipType, setScholarshipType] = useState("");
  const [amount, setAmount] = useState("");
  const [allocatedStaff, setAllocatedStaff] = useState("");
  const [feesPaid, setFeesPaid] = useState(false);
  const [transactionNo, setTransactionNo] = useState("");
  const [finalizedCourse, setFinalizedCourse] = useState("");
  // Example dropdown options
  const scholarshipTypes = ["Merit-based", "Sports", "Need-based", "Community"];
  const staffMembers = ["John Doe", "Priya Sharma", "Ravi Kumar", "Anita Das"];
  const courseOptions = [
   "B.E CSE",
    "B.E ECE",
    "B.E AI-ML",
    "B.E Cyber Security",
    "B.E CCE",
    "B.E EEE",
    "B.E Mech",
    "B.Tech IT",
    "B.Tech CSBS",
    "B.Tech AI & DS"
  ];

  const handleSave = () => {
    const data = {
      hasScholarship,
      scholarshipType,
      amount,
      allocatedStaff,
      feesPaid,
      transactionNo,
      finalizedCourse,
    };
    onSave(data);
    console.log("Form Data:", data);
    setScholorModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white w-[95%] md:w-[50%] rounded-2xl shadow-2xl p-8 relative  overflow-hidden">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-2 transition"
          onClick={() => setScholorModalOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b pb-2 border-gray-300 mb-4 playfair">
          <h2 className="text-2xl font-bold playfair">
            Scholarship & Fees Details
          </h2>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          {/* Scholarship Availed */}
          <div className="col-span-1">
            <label className="font-semibold mb-1 block text-[#282526]">
              Scholarship Availed:
            </label>
            <div className="flex items-center gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="scholarship"
                  checked={hasScholarship === true}
                  onChange={() => setHasScholarship(true)}
                  className="accent-[#0b56a4]"
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="scholarship"
                  checked={hasScholarship === false}
                  onChange={() => setHasScholarship(false)}
                  className="accent-[#0b56a4]"
                />
                No
              </label>
            </div>
          </div>

          {/* Staff Allocation — always visible */}
          <div className="col-span-1">
            <label className="font-semibold mb-1 block text-[#282526]">
              Allocated Staff Member:
            </label>
            <select
              value={allocatedStaff}
              onChange={(e) => setAllocatedStaff(e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            >
              <option value="">Select Staff Member</option>
              {staffMembers.map((staff) => (
                <option key={staff} value={staff}>
                  {staff}
                </option>
              ))}
            </select>
          </div>

          {/* Scholarship Type & Amount (if Yes) */}
          {hasScholarship && (
            <>
              <div className="col-span-1">
                <label className="font-semibold mb-1 block text-[#282526]">
                  Scholarship Type:
                </label>
                <select
                  value={scholarshipType}
                  onChange={(e) => setScholarshipType(e.target.value)}
                  className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
                >
                  <option value="">Select Type</option>
                  {scholarshipTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-1">
                <label className="font-semibold mb-1 block text-[#282526]">
                  Amount:
                </label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
                />
              </div>
            </>
          )}

          {/* Fees Paid */}
          {/* Fees Paid & Finalized Course side by side */}
          <div className="col-span-1">
            <label className="font-semibold mb-1 block text-[#282526]">
              Fees Paid:
            </label>
            <div className="flex items-center gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="fees"
                  checked={feesPaid === true}
                  onChange={() => setFeesPaid(true)}
                  className="accent-[#0b56a4]"
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="fees"
                  checked={feesPaid === false}
                  onChange={() => setFeesPaid(false)}
                  className="accent-[#0b56a4]"
                />
                No
              </label>
            </div>
          </div>

          {/* Finalized Course (to the right of Fees Paid) */}
          <div className="col-span-1">
            <label className="font-semibold mb-1 block text-[#282526]">
              Finalized Course:
            </label>
            <select
              value={finalizedCourse}
              onChange={(e) => setFinalizedCourse(e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] 
               outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] 
               placeholder-gray-400 text-sm"
            >
              <option value="">Select Course</option>
              {courseOptions.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* Transaction No (if Fees Paid) */}
          {feesPaid && (
            <div className="col-span-1 md:col-span-2">
              <label className="font-semibold mb-1 block text-[#282526]">
                Unique Number:
              </label>
              <input
                type="text"
                placeholder="Enter unique number"
                value={transactionNo}
                onChange={(e) => setTransactionNo(e.target.value)}
                className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
              />
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className=" flex justify-end gap-3  pt-5">
          <button
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium"
            onClick={() => setScholorModalOpen(false)}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-lg bg-[#0b56a4] text-white hover:bg-[#094a8a] transition font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholorshipModal;
