import { useState, useEffect } from "react";
import {
  Eye,
  Search,
  FilterX,
  Check,
  MessageSquareWarning,
  Download,
  ChevronLast,
  ChevronRight,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import nodata from "../../assets/no-data.svg";
import { toast } from "react-toastify";

// Filter dropdown for select/dropdown/date inputs
function FilterMenu({ options, selected, onChange, onClose, customContent }) {
  return (
    <div className="absolute top-full mt-1 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10 p-2">
      {customContent ? (
        customContent
      ) : (
        <ul className="max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <li
              key={opt}
              className={`px-3 py-2 cursor-pointer text-[#282526] ${
                selected === opt ? "bg-gray-200 font-medium" : ""
              }`}
              onClick={() => {
                onChange(opt);
                onClose();
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Pagination controller
function Pagination({ currentPage, totalPages, onPageChange }) {
  const visiblePages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) visiblePages.push(i);
  } else {
    visiblePages.push(1);
    if (currentPage > 4) visiblePages.push("ellipsisL");
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    for (let i = startPage; i <= endPage; i++) visiblePages.push(i);
    if (currentPage < totalPages - 3) visiblePages.push("ellipsisR");
    visiblePages.push(totalPages);
  }
  return (
    <div className="flex items-center space-x-2 justify-end mt-4 select-none">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`px-1.5 py-1 rounded-full ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-[#0b56a4] text-white"
        }`}
      >
        <ChevronsLeft className="w-5" />
      </button>
      {visiblePages.map((page, idx) =>
        page === "ellipsisL" || page === "ellipsisR" ? (
          <span key={idx} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-full ${
              page === currentPage
                ? "bg-[#0b56a4] text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-1.5 py-1 rounded-full ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-[#0b56a4] text-white"
        }`}
      >
        <ChevronsRight className="w-5" />
      </button>
    </div>
  );
}

export default function ApplicationListTable() {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(null);
  const [courseFilter, setCourseFilter] = useState(null);
  const [quotaFilter, setQuotaFilter] = useState(null);
  const [hostelFilter, setHostelFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remarkModalOpen, setRemarkModalOpen] = useState(false);
  const [remarkText, setRemarkText] = useState("");
  const [currentRemarkId, setCurrentRemarkId] = useState(null);
  const [remarkSubmitting, setRemarkSubmitting] = useState(false);

  const rowsPerPage = 6;

  const courseOptions = ["B.E CSE", "B.E ECE", "B.E EEE", "B.E CCE"];
  const quotaOptions = ["Management Quota", "Government Quota"];
  const hostelOptions = ["Hostel", "Day Scholar"];
  const statusOptions = ["Pending", "Remark", "Admitted"];

  const openRemarkModal = (id) => {
    setCurrentRemarkId(id);
    setRemarkText("");
    setRemarkModalOpen(true);
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/application/")
      .then((res) => res.json())
      .then((json) => {
        setData(json.data || []);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const changeStatus = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/application/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Admitted" }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      const data = await res.json();
      setData((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: data.status } : item
        )
      );
      toast.success("Status Updated Sucessfully");
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };
  // bulk status chnage
  const bulkChangeStatus = async (selectedIds) => {
    try {
      // console.log("Bulk Change Status for IDs:", selectedIds, "to", newStatus);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/application/bulk/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: selectedIds,
            status: "Admitted",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update status");
      }

      const result = await response.json();
      console.log("Bulk update success:", result);
      toast.success(`Status updated successfully for ${result.modifiedCount}`, {
        onClose: () => window.location.reload(),
      });

      return result;
    } catch (error) {
      console.error("Bulk update failed:", error.message);
      throw error;
    }
  };

  const handleExport = async () => {
    let exportIds = [];

    if (selectedRows.length > 0) {
      exportIds = selectedRows;
    } else {
      exportIds = sortedData.map((row) => row._id);
    }

    console.log("Exporting IDs:", exportIds);

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/application/export`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ids: exportIds.length > 0 ? exportIds : null,
          }),
        }
      );

      if (!response.ok) throw new Error("Export failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "enquiries.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Export successful 🎉");
    } catch (err) {
      console.error(err);
      toast.error("Export failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const submitRemark = async () => {
    setRemarkSubmitting(true);
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/application/${currentRemarkId}/remark`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ remark: remarkText }),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to add remark");
      }

      const updated = await res.json();

      setData((prev) =>
        prev.map((item) =>
          item._id === currentRemarkId ? { ...item, ...updated } : item
        )
      );

      setRemarkModalOpen(false);
      toast.success(`Remark added & status set to Remark!`, {
        onClose: () => window.location.reload(),
      });
    } catch (err) {
      console.error(err);
      setRemarkSubmitting(false);
      setRemarkModalOpen(false);
      toast.error(err.message);
    }
  };

  // Filtering, with date logic
  const filteredData = data.filter((row) => {
    const courseMatch = courseFilter
      ? row.preferredCourse === courseFilter
      : true;
    const quotaMatch = quotaFilter ? row.Quota === quotaFilter : true;
    const hostelMatch = hostelFilter
      ? row.hostelDayScholar === hostelFilter
      : true;
    const statusMatch = statusFilter ? row.status === statusFilter : true;
    const searchMatch = search
      ? row.studentName?.toLowerCase().includes(search.toLowerCase())
      : true;
    let dateMatch = true;
    if (dateFilter.from) {
      dateMatch = new Date(row.createdAt) >= new Date(dateFilter.from);
    }
    if (dateFilter.to && dateMatch) {
      dateMatch = new Date(row.createdAt) <= new Date(dateFilter.to);
    }
    return (
      courseMatch &&
      quotaMatch &&
      hostelMatch &&
      statusMatch &&
      searchMatch &&
      dateMatch
    );
  });

  // Sorted and paginated
  const statusPriority = { Pending: 1, Selected: 2, Rejected: 3 };
  const sortedData = filteredData
    .slice()
    .sort(
      (a, b) =>
        (statusPriority[a.status] || 99) - (statusPriority[b.status] || 99)
    );
  const totalPages = Math.max(1, Math.ceil(sortedData.length / rowsPerPage));
  const currentRows = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Selection logic
  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };
  const toggleSelectAll = () => {
    if (selectedRows.length === currentRows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentRows.map((d) => d._id));
    }
  };

  // Clear filters
  const clearFilters = () => {
    setCourseFilter(null);
    setQuotaFilter(null);
    setHostelFilter(null);
    setStatusFilter(null);
    setDateFilter({ from: "", to: "" });
    setSearch("");
    setCurrentPage(1);
  };

  // UI Rendering
  if (loading)
    return (
      <div className="m-auto text-center md:mt-20">
        <div className="loader m-auto"></div>
        <p className="mt-4">Loading...</p>
      </div>
    );
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3  justify-between w-full">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name..."
              className="border bg-white border-gray-300 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-[#0b56a4]"
            />
            <Search className="absolute top-2 right-2 text-gray-400 w-4" />
          </div>
          <div className="flex gap-4">
            {selectedRows.length > 0 && (
              <button
                className="px-4 py-2 rounded-lg  border border-[#0b56a4] text-[#0b56a4] cursor-pointer"
                onClick={() => bulkChangeStatus(selectedRows)}
              >
                Change Status ({selectedRows.length})
              </button>
            )}
            <button
              onClick={clearFilters}
              className="bg-[#0b56a4] text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FilterX className="w-4" />
              Clear Filter
            </button>
            <button
              className=" bg-[#0b56a4] text-white  px-4 py-1 rounded-lg flex items-center gap-2 cursor-pointer"
              onClick={handleExport}
            >
              <Download className="w-4" />
              Export{" "}
              {selectedRows.length > 0 && (
                <span className="badge">({selectedRows.length})</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-sm  h-64">
        <table className="min-w-full border-collapse bg-white">
          <thead className="bg-[#393738] text-white text-left text-sm font-medium">
            <tr>
              <th className="px-5 py-3">
                <input
                  type="checkbox"
                  checked={
                    selectedRows.length === currentRows.length &&
                    currentRows.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300 accent-white"
                />
              </th>
              <th className="px-5 py-3 border-gray-300">Name</th>
              {/* Preferred Course filter */}
              <th
                className="px-5 py-3 relative border-gray-300 cursor-pointer"
                onClick={() =>
                  setFilterOpen(filterOpen === "course" ? null : "course")
                }
              >
                <div className="flex items-center space-x-1 select-none">
                  <span>Preferred Course</span>
                  <svg
                    className={`w-4 h-4 ${
                      filterOpen === "course" ? "rotate-180" : "rotate-0"
                    } transition-transform duration-300`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 8l4 4 4-4"
                    />
                  </svg>
                </div>
                {filterOpen === "course" && (
                  <FilterMenu
                    options={courseOptions}
                    selected={courseFilter}
                    onChange={(val) => {
                      setCourseFilter(val);
                      setCurrentPage(1);
                    }}
                    onClose={() => setFilterOpen(null)}
                  />
                )}
              </th>
              {/* Quota filter */}
              <th
                className="px-5 py-3 relative border-gray-300 cursor-pointer"
                onClick={() =>
                  setFilterOpen(filterOpen === "quota" ? null : "quota")
                }
              >
                <div className="flex items-center space-x-1 select-none">
                  <span>Quota</span>
                  <svg
                    className={`w-4 h-4 ${
                      filterOpen === "quota" ? "rotate-180" : "rotate-0"
                    } transition-transform duration-300`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 8l4 4 4-4"
                    />
                  </svg>
                </div>
                {filterOpen === "quota" && (
                  <FilterMenu
                    options={quotaOptions}
                    selected={quotaFilter}
                    onChange={(val) => {
                      setQuotaFilter(val);
                      setCurrentPage(1);
                    }}
                    onClose={() => setFilterOpen(null)}
                  />
                )}
              </th>
              {/* Hostel/Day Scholar filter */}
              <th
                className="px-5 py-3 relative border-gray-300 cursor-pointer"
                onClick={() =>
                  setFilterOpen(filterOpen === "hostel" ? null : "hostel")
                }
              >
                <div className="flex items-center space-x-1 select-none">
                  <span>Hostel/Day Scholar</span>
                  <svg
                    className={`w-4 h-4 ${
                      filterOpen === "hostel" ? "rotate-180" : "rotate-0"
                    } transition-transform duration-300`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 8l4 4 4-4"
                    />
                  </svg>
                </div>
                {filterOpen === "hostel" && (
                  <FilterMenu
                    options={hostelOptions}
                    selected={hostelFilter}
                    onChange={(val) => {
                      setHostelFilter(val);
                      setCurrentPage(1);
                    }}
                    onClose={() => setFilterOpen(null)}
                  />
                )}
              </th>
              {/* Created At filter */}
              <th
                className="px-5 py-3 relative border-gray-300 cursor-pointer"
                onClick={() =>
                  setFilterOpen(filterOpen === "date" ? null : "date")
                }
              >
                <div className="flex items-center space-x-1 select-none">
                  <span>Created At</span>
                  <svg
                    className={`w-4 h-4 ${
                      filterOpen === "date" ? "rotate-180" : "rotate-0"
                    } transition-transform duration-300`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 8l4 4 4-4"
                    />
                  </svg>
                </div>
                {filterOpen === "date" && (
                  <FilterMenu
                    customContent={
                      <div
                        className="flex flex-col space-y-2 bg-white rounded-md p-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <label className="text-sm text-gray-800 font-medium">
                          From
                        </label>
                        <input
                          type="date"
                          value={dateFilter.from}
                          onChange={(e) => {
                            setDateFilter((prev) => {
                              const newFrom = e.target.value;
                              if (newFrom && prev.to) {
                                setFilterOpen(null);
                                setCurrentPage(1);
                              }
                              return { ...prev, from: newFrom };
                            });
                          }}
                          className="rounded px-2 py-1 border border-gray-400 text-sm bg-gray-50 text-gray-900"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <label className="text-sm text-gray-800 font-medium">
                          To
                        </label>
                        <input
                          type="date"
                          value={dateFilter.to}
                          onChange={(e) => {
                            setDateFilter((prev) => {
                              const newTo = e.target.value;
                              if (prev.from && newTo) {
                                setFilterOpen(null);
                                setCurrentPage(1);
                              }
                              return { ...prev, to: newTo };
                            });
                          }}
                          className="border border-gray-400 rounded px-2 py-1 text-sm bg-gray-50 text-gray-900"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    }
                    onClose={() => setFilterOpen(null)}
                  />
                )}
              </th>
              {/* Status filter */}
              <th
                className="px-5 py-3 relative border-gray-300 cursor-pointer"
                onClick={() =>
                  setFilterOpen(filterOpen === "status" ? null : "status")
                }
              >
                <div className="flex items-center space-x-1 select-none">
                  <span>Status</span>
                  <svg
                    className={`w-4 h-4 ${
                      filterOpen === "status" ? "rotate-180" : "rotate-0"
                    } transition-transform duration-300`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 8l4 4 4-4"
                    />
                  </svg>
                </div>
                {filterOpen === "status" && (
                  <FilterMenu
                    options={statusOptions}
                    selected={statusFilter}
                    onChange={(val) => {
                      setStatusFilter(val);
                      setCurrentPage(1);
                    }}
                    onClose={() => setFilterOpen(null)}
                  />
                )}
              </th>
              <th className="px-5 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {currentRows.map((row, idx) => (
              <tr
                key={row._id}
                className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-5 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row._id)}
                    onChange={() => toggleRowSelection(row._id)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="px-5 py-3 border-gray-200">{row.studentName}</td>
                <td className="px-5 py-3 border-gray-200">
                  {row.preferredCourse}
                </td>
                <td className="px-5 py-3 border-gray-200">{row.Quota}</td>
                <td className="px-5 py-3 border-gray-200">
                  {row.hostelDayScholar}
                </td>
                <td className="px-5 py-3 border-gray-200">
                  {row.createdAt
                    ? new Date(row.createdAt).toISOString().split("T")[0]
                    : ""}
                </td>
                <td className="px-5 py-3 border-gray-200">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      row.status === "Admitted"
                        ? "bg-green-100 text-green-700"
                        : ""
                    }
                    ${
                      row.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : ""
                    }
                    ${
                      row.status === "Remark" ? "bg-red-100 text-red-700" : ""
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-5 py-3 flex items-center space-x-2 justify-center">
                  {row.status === "Pending" ? (
                    <>
                      <button
                        className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                        onClick={() => changeStatus(row._id)}
                        title="Approve"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-100"
                        onClick={() => openRemarkModal(row._id)}
                        title="Add Remark"
                      >
                        <MessageSquareWarning size={14} />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/admin/application_list/${row._id}`)
                        }
                        className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                        title="View Details"
                      >
                        <Eye size={14} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() =>
                        navigate(`/admin/application_list/${row._id}`)
                      }
                      className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                      title="View Details"
                    >
                      <Eye size={14} />
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {currentRows.length === 0 && (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-10 text-gray-500 text-lg"
                >
                  <img src={nodata} alt="" className="w-[25%] m-auto" />
                  <p className="mt-4">No Data Found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {remarkModalOpen && (
          <div className="fixed inset-0 tint flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-lg font-medium mb-3">Add Remark</h2>
              <textarea
                value={remarkText}
                onChange={(e) => setRemarkText(e.target.value)}
                placeholder="Enter your remark..."
                className="w-full border border-gray-300 rounded-md p-2 mb-4 h-24 resize-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded-lg bg-gray-500 text-white cursor-pointer"
                  onClick={() => setRemarkModalOpen(false)}
                >
                  Close
                </button>

                <button
                  className={`px-4 py-2 rounded-lg text-white cursor-pointer ${
                    remarkSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  onClick={submitRemark}
                  disabled={remarkSubmitting}
                >
                  {remarkSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
