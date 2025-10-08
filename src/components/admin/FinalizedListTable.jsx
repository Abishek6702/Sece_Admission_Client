import { useEffect, useState } from "react";
import {
  Check,
  X,
  Eye,
  Search,
  FilterX,
  ChevronsLeft,
  ChevronsRight,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import nodata from "../../assets/no-data.svg";
function FilterMenu({ options, selected, onChange, onClose, customContent }) {
  return (
    <div className="absolute top-full mt-1 w-52 bg-white border border-gray-200 shadow-lg rounded-md z-10 p-2">
      {customContent ? (
        customContent
      ) : (
        <ul className="max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <li
              key={opt}
              className={`px-3 py-2 cursor-pointer text-[#282526]  ${
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

function Pagination({ currentPage, totalPages, onPageChange }) {
  // Helper to build page numbers with ellipsis
  const visiblePages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) visiblePages.push(i);
  } else {
    visiblePages.push(1);
    if (currentPage > 4) visiblePages.push("start-ellipsis");
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    for (let i = startPage; i <= endPage; i++) visiblePages.push(i);
    if (currentPage < totalPages - 3) visiblePages.push("end-ellipsis");
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

      {visiblePages.map((page, idx) => {
        if (page === "start-ellipsis" || page === "end-ellipsis") {
          return (
            <span key={idx} className="px-2">
              ...
            </span>
          );
        }
        return (
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
        );
      })}

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

export default function FinalizedListTable() {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [graduateFilter, setGraduateFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [cutOffFilter, setCutOffFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState(null);
  const [generating, setGenerating] = useState(false);

  const rowsPerPage = 10;
  const [data, setData] = useState([]);
  const categoryOptions = ["B.E ECE", "B.E CSE", "B.E EEE", "B.E CCE"];
  const graduateOptions = ["Yes", "No"];
  const statusOptions = ["Selected", "UserCreated"];
  const cutOffRanges = [
    { label: "190 - 200", min: 190, max: 200 },
    { label: "150 - 190", min: 150, max: 190 },
    { label: "100 - 150", min: 100, max: 150 },
    { label: "0 - 100", min: 0, max: 100 },
  ];
  // fetching table data
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/enquiries`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Http error status:${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        setError(null);
        setCurrentPage(1);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const allowedStatuses = ["Selected", "UserCreated"];
  // Filtered data by filters and also search data
  const filteredData = data.filter((d) => {
    const courseMatch = categoryFilter
      ? d.courseRequired?.includes(categoryFilter)
      : true;

    const graduateMatch = graduateFilter
      ? graduateFilter === "Yes"
        ? d.isFirstGraduate === true
        : d.isFirstGraduate === false
      : true;
    // Replace "UserCreated" below with your actual custom status value if different
    const statusMatch = allowedStatuses.includes(d.status);

    const cutOffMatch = cutOffFilter
      ? d.twelfthMarks?.cutOff >= cutOffFilter.min &&
        d.twelfthMarks?.cutOff <= cutOffFilter.max
      : true;

    const dateMatch =
      dateFilter.from || dateFilter.to
        ? (!dateFilter.from ||
            new Date(d.dateOfVisit) >= new Date(dateFilter.from)) &&
          (!dateFilter.to || new Date(d.dateOfVisit) <= new Date(dateFilter.to))
        : true;

    const searchMatch = search
      ? d.studentName.toLowerCase().includes(search.toLowerCase())
      : true;

    return (
      courseMatch &&
      graduateMatch &&
      statusMatch &&
      cutOffMatch &&
      dateMatch &&
      searchMatch
    );
  });

  const statusPriority = { Pending: 1, Selected: 2, Rejected: 3 };

  const sortedData = filteredData.slice().sort((a, b) => {
    return (statusPriority[a.status] || 99) - (statusPriority[b.status] || 99);
  });
  const totalPages = Math.max(1, Math.ceil(sortedData.length / rowsPerPage));
  if (currentPage > totalPages) setCurrentPage(totalPages);

  const currentRows = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const clearFilters = () => {
    setCategoryFilter(null);
    setGraduateFilter(null);
    setStatusFilter(null);
    setCutOffFilter(null);
    setDateFilter({ from: "", to: "" });
    setSearch("");
    setCurrentPage(1);
  };

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

  const handleExport = async () => {
    let exportIds = [];

    if (selectedRows.length > 0) {
      exportIds = selectedRows;
    } else {
      exportIds = sortedData.map((row) => row._id);
    }

    try {
      setExporting(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/enquiries/export`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: exportIds }),
        }
      );

      if (!res.ok) throw new Error("Failed to export file");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "enquiries.xlsx";
      link.click();
      window.URL.revokeObjectURL(url);

      toast.success("Export successful 🎉");
    } catch (err) {
      toast.error("Export failed: " + err.message);
    } finally {
      setExporting(false);
    }
  };

  const handleGenerateUsers = async () => {
    let generateIds = [];

    if (selectedRows.length > 0) {
      generateIds = currentRows
        .filter(
          (row) =>
            selectedRows.includes(row._id) && row.status !== "UserCreated"
        )
        .map((row) => row._id);
    } else {
      generateIds = sortedData
        .filter((row) => row.status !== "UserCreated")
        .map((row) => row._id);
    }

    console.log(generateIds);
    try {
      setGenerating(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/create-from-enquiries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: generateIds }),
        }
      );

      if (!res.ok) throw new Error("Failed to generate users");

      toast.success(`Users generated successfully 🎉`, {
        onClose: () => window.location.reload(),
      });
    } catch (err) {
      toast.error("Generation failed: " + err.message);
    } finally {
      setGenerating(false);
    }
  };
  const validGenerateCount =
    selectedRows.length > 0
      ? currentRows.filter(
          (row) =>
            selectedRows.includes(row._id) && row.status !== "UserCreated"
        ).length
      : sortedData.filter((row) => row.status !== "UserCreated").length;

  if (loading)
    return (
      <div className=" m-auto text-center md:mt-40">
        <div className="loader m-auto text-center"></div>
        <p className="mt-4">Loading...</p>
      </div>
    );
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <div>
      <p className="text-2xl playfair mb-2">Finalized Enquiries</p>
      {/* Controls above table */}
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
          <div className=" flex gap-4">
            <button
              onClick={() => {
                clearFilters();
                setSelectedRows([]);
              }}
              className=" bg-[#0b56a4] text-white  px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <FilterX className="w-4" />
              Clear Filter
            </button>
            <button
              disabled={generating || validGenerateCount === 0}
              onClick={handleGenerateUsers}
              className="bg-[#0b56a4] text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer
             disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {generating ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                <>Generate Users ({validGenerateCount})</>
              )}
            </button>

            <button
              className={`bg-[#0b56a4] text-white px-4 py-1 rounded-lg flex items-center gap-2 cursor-pointer ${
                exporting ? "opacity-60 cursor-not-allowed" : ""
              }`}
              onClick={handleExport}
              disabled={exporting}
            >
              {exporting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Exporting...
                </span>
              ) : (
                <>
                  <Download className="w-4" />
                  Export{" "}
                  {selectedRows.length > 0 && (
                    <span className="badge">({selectedRows.length})</span>
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Table with filters in headers */}
      <div className="overflow-x-auto rounded-lg shadow-sm h-80">
        <table className="min-w-full border-collapse bg-white">
          <thead className="bg-[#393738] text-white text-left text-sm font-medium ">
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
              <th className="px-5 py-3  border-gray-300">Name</th>
              {/* Course Filter */}
              <th
                className="px-5 py-3 relative  border-gray-300 cursor-pointer"
                onClick={() =>
                  setFilterOpen(filterOpen === "category" ? null : "category")
                }
              >
                <div className="flex items-center space-x-1 select-none">
                  <span>Course</span>
                  <svg
                    className={`w-4 h-4  ${
                      filterOpen === "category" ? "rotate-180" : "rotate-0"
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
                {filterOpen === "category" && (
                  <FilterMenu
                    options={categoryOptions}
                    selected={categoryFilter}
                    onChange={(val) => {
                      setCategoryFilter(val);
                      setCurrentPage(1);
                    }}
                    onClose={() => setFilterOpen(null)}
                  />
                )}
              </th>
              {/* Graduate Filter */}
              <th
                className="px-5 py-3 relative  border-gray-300 cursor-pointer"
                onClick={() =>
                  setFilterOpen(filterOpen === "graduate" ? null : "graduate")
                }
              >
                <div className="flex items-center space-x-1 select-none">
                  <span>First Graduate</span>
                  <svg
                    className={`w-4 h-4  ${
                      filterOpen === "graduate" ? "rotate-180" : "rotate-0"
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
                {filterOpen === "graduate" && (
                  <FilterMenu
                    options={graduateOptions}
                    selected={graduateFilter}
                    onChange={(val) => {
                      setGraduateFilter(val);
                      setCurrentPage(1);
                    }}
                    onClose={() => setFilterOpen(null)}
                  />
                )}
              </th>
              {/* Cutoff Filter */}
              <th
                className="px-5 py-3 relative  border-gray-300 cursor-pointer"
                onClick={() =>
                  setFilterOpen(filterOpen === "cutoff" ? null : "cutoff")
                }
              >
                <div className="flex items-center space-x-1 select-none">
                  <span>Cut Off</span>
                  <svg
                    className={`w-4 h-4  ${
                      filterOpen === "cutoff" ? "rotate-180" : "rotate-0"
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
                {filterOpen === "cutoff" && (
                  <FilterMenu
                    options={cutOffRanges.map((r) => r.label)}
                    selected={cutOffFilter?.label || null}
                    onChange={(label) => {
                      const range = cutOffRanges.find((r) => r.label === label);
                      setCutOffFilter(range || null);
                      setCurrentPage(1);
                    }}
                    onClose={() => setFilterOpen(null)}
                  />
                )}
              </th>
              {/* Date Filter */}
              <th
                className="px-5 py-3 relative  border-gray-300 cursor-pointer"
                onClick={() =>
                  setFilterOpen(filterOpen === "date" ? null : "date")
                }
              >
                <div className="flex items-center space-x-1 select-none">
                  <span>Date</span>
                  <svg
                    className={`w-4 h-4  ${
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
                          className=" rounded px-2 py-1 border border-gray-400 text-sm bg-gray-50 text-gray-900"
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
              {/* Status Filter */}
              <th
                className="px-5 py-3 relative  border-gray-300 cursor-pointer"
                onClick={() =>
                  setFilterOpen(filterOpen === "status" ? null : "status")
                }
              >
                <div className="flex items-center space-x-1 select-none">
                  <span>Status</span>
                  <svg
                    className={`w-4 h-4  ${
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
                <td className="px-5 py-3  border-gray-200">
                  {row.studentName}
                </td>
                <td className="px-5 py-3  border-gray-200">
                  {row.courseRequired}
                </td>
                <td className="px-5 py-3 border-gray-200">
                  {row.isFirstGraduate ? "Yes" : "No"}
                </td>

                <td className="px-5 py-3  border-gray-200">
                  {row.twelfthMarks?.cutOff}
                </td>
                <td className="px-5 py-3 border-gray-200">
                  {new Date(row.dateOfVisit).toISOString().split("T")[0]}
                </td>

                <td className="px-5 py-3  border-gray-200">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
      ${row.status === "UserCreated" ? "bg-green-100 text-green-700" : ""}
      ${row.status === "Selected" ? "bg-yellow-100 text-yellow-700" : ""}
      ${row.status === "Rejected" ? "bg-red-100 text-red-700" : ""}`}
                  >
                    {row.status}
                  </span>
                </td>

                <td className="px-5 py-3 flex items-center space-x-2 justify-center">
                  <button
                    onClick={() => navigate(`/admin/enquiry_list/${row._id}`)}
                    className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                  >
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {currentRows.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-14 text-gray-500 text-lg "
                >
                  <img src={nodata} alt="" c className="w-[25%] m-auto" />
                  <p className="mt-4">No Data Found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
