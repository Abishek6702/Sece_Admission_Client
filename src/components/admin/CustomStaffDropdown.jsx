import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
const CustomStaffDropdown = ({ allocatedStaff, setAllocatedStaff }) => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [addStaffMode, setAddStaffMode] = useState(false);
  const [newStaffName, setNewStaffName] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staff`)
      .then((res) => res.json())
      .then((data) => setStaffMembers(data.map((s) => s.name)));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setAddStaffMode(false);
        setNewStaffName("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddStaff = async () => {
    if (!newStaffName.trim()) return;
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staff`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newStaffName.trim() }),
      });
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/staff`);
      const data = await res.json();
      setStaffMembers(data.map((s) => s.name));
      setAllocatedStaff(newStaffName.trim());
      setAddStaffMode(false);
      setNewStaffName("");
      setIsOpen(false);
      toast.success("Staff added successfully!");
    } catch (error) {
      toast.error("Failed to add staff.");
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <p className="font-semibold mb-1 block text-[#282526]">Allocated Staff Member:</p>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm flex"
        type="button"
      >
        {allocatedStaff || "Select Staff Member"}
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full max-h-48 overflow-auto mt-1 border-gray-300 bg-[#f6f6f6] border rounded-lg shadow-lg">
         

          {addStaffMode ? (
            <div className="p-2  mt-2">
              <input
                type="text"
                value={newStaffName}
                onChange={(e) => setNewStaffName(e.target.value)}
                placeholder="Enter new staff name"
                className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => {
                    setAddStaffMode(false);
                    setNewStaffName("");
                  }}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddStaff}
                  className="px-5 py-2 rounded-lg bg-[#0b56a4] text-white hover:bg-[#094a8a] transition font-medium"
                >
                  Add
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setAddStaffMode(true)}
              className="px-4 py-2  cursor-pointer hover:bg-blue-100 text-blue-600 font-semibold"
            >
              + Add Staff
            </div>
          )}
           {staffMembers.map((staff) => (
            <div
              key={staff}
              onClick={() => {
                setAllocatedStaff(staff);
                setIsOpen(false);
                setAddStaffMode(false);
              }}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {staff}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomStaffDropdown;
