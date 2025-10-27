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
  RotateCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import nodata from "../../assets/no-data.svg";
function FilterMenu({ options, selected, onChange, onClose, customContent }) {
  return (
    <div className="absolute top-full mt-1 w-52 bg-white border border-gray-200 shadow-lg rounded-md z-10 p-2 ">
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
const ScholarshipListTable = () => {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [graduateFilter, setGraduateFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exporting, setExporting] = useState(false);


  const rowsPerPage = 6;
  const [data, setData] = useState([]);
  const categoryOptions = ["MBC", "BCM", "SCA", "SC", "ST", "OC", "BC"];
 

  const graduateOptions = ["Merit-based","Yes", "No","Sports"];
  const statusOptions = ["Selected", "Pending", "Rejected"];
  
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

  // Filtered data by filters and also search data
  const filteredData = data.filter((d) => {
    //
    const courseMatch = categoryFilter
      ? d.community?.includes(categoryFilter)
      : true;

    const graduateMatch = graduateFilter
      ? d.scholarshipType?.includes(graduateFilter)
      : true;


    const statusMatch = statusFilter ? d.status === statusFilter : true;

    const searchMatch = search
      ? d.studentName.toLowerCase().includes(search.toLowerCase())
      : true;

    const hasScholarshipMatch = d.hasScholarship === true;

    return (
      courseMatch &&
      // departmentMatch &&
      graduateMatch &&
      statusMatch &&
      // cutOffMatch &&
      // dateMatch &&
      searchMatch &&
      hasScholarshipMatch
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
    // setDepartmentFilter(null);
    setStatusFilter(null);
    // setCutOffFilter({ from: "", to: "" });
    // setDateFilter({ from: "", to: "" });
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

  if (loading)
    return (
      <div className=" m-auto text-center md:mt-20">
        <div className="loader m-auto text-center"></div>
        <p className="mt-4">Loading...</p>
      </div>
    );
  if (error) return <div>Error loading data: {error}</div>;

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
        `${import.meta.env.VITE_API_BASE_URL}/api/enquiries/export`,
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
    const handleExportPDF = async () => {
    setExporting(true);
    let exportPayload;

    if (selectedRows.length > 0) {
      // Export only selected rows by their _id
      exportPayload = { selectedIds: selectedRows };
    } else {
    // No checkboxes: export PDF of visible/filtered/paged rows only
    const pageRowIds = currentRows.map(row => row._id);
    exportPayload = { selectedIds: pageRowIds };
  }

    try {
      // Send payload to backend PDF endpoint
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/enquiries/scholarpdf`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(exportPayload),
        }
      );

      if (!response.ok) throw new Error("Failed to export PDF");

      // Download the PDF file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "enquiries.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success("PDF export successful");
    } catch (err) {
      console.error(err);
      toast.error("Export failed: " + err.message);
    } finally {
      setExporting(false);
    }
  };
  return (
    <div>
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
              className=" bg-[#0b56a4] text-white  px-4 py-1 rounded-lg flex items-center gap-2 cursor-pointer"
              onClick={handleExport}
            >
              <Download className="w-4" />
              Export{" "}
              {selectedRows.length > 0 && (
                <span className="badge">({selectedRows.length})</span>
              )}
            </button>
            <button
              className={`bg-[#0b56a4] text-white px-4 py-1 rounded-lg flex items-center gap-2 cursor-pointer ${
                exporting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleExportPDF}
              disabled={exporting}
            >
              <Download className="w-4" />
              {exporting ? "Exporting..." : "Export PDF"}
              {selectedRows.length > 0 && (
                <span className="badge">({selectedRows.length})</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Table with filters in headers */}
      <div className="overflow-x-auto rounded-lg shadow-sm ">
        <table className="min-w-full border-collapse bg-white ">
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
              <th className="px-5 py-3">
                ID
              </th>
              <th className="px-5 py-3  border-gray-300">Name</th>
              <th
                className="px-5 py-3 relative  border-gray-300 cursor-pointer"
                onClick={() =>
                  setFilterOpen(filterOpen === "category" ? null : "category")
                }
              >
                <div className="flex items-center space-x-1 select-none">
                  <span>Community</span>
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

              {/* Replace "Preferred Course" header */}

              {/* Graduate Filter */}
              {/* <th
                className="px-5 py-3 relative  border-gray-300 cursor-pointer"
                onClick={() =>
                  setFilterOpen(filterOpen === "graduate" ? null : "graduate")
                }
              >
                <div className="flex items-center space-x-1 select-none whitespace-nowrap">
                  <span>Scholorship Type </span>
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
              </th> */}
              {/* <th
                className="px-5 py-3 relative border-gray-300 cursor-pointer"
                onClick={() =>
                  setFilterOpen(filterOpen === "amount" ? null : "amount")
                }
              >
                <div className="flex items-center space-x-1 select-none whitespace-nowrap">
                  <span>Scholarship Amount</span>
                </div>
              </th> */}
              {/* Cutoff Filter */}
              {/* Replace "Cut Off" header with "Fees Paid" */}
              <th
                className="px-5 py-3 relative border-gray-300 cursor-pointer"
                onClick={() =>
                  setFilterOpen(filterOpen === "feesPaid" ? null : "feesPaid")
                }
              >
                <div className="flex items-center space-x-1 select-none">
                  <span>Fees Paid</span>
                </div>
              </th>

              {/* Date Filter */}
              {/* Replace "Date" header with "Allocated Staff" */}
              <th
                className="px-5 py-3 relative border-gray-300 cursor-pointer"
                onClick={() =>
                  setFilterOpen(
                    filterOpen === "allocatedStaff" ? null : "allocatedStaff"
                  )
                }
              >
                <div className="flex items-center space-x-1 select-none">
                  <span>Allocated Staff</span>
                </div>
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
                <td className="px-5 py-3  border-gray-200 whitespace-nowrap">
                  {row.enquiryId}
                </td>
                <td className="px-5 py-3  border-gray-200">
                  {row.studentName}
                </td>
                <td className="px-5 py-3  border-gray-200">{row.community}</td>

                {/* <td className="px-5 py-3 border-gray-200">
                  {row.scholarshipType }
                </td> */}
                {/* <td className="px-5 py-3 border-gray-200 truncate">
                  {row.amount || "-"}
                </td> */}

                <td className="px-5 py-3 border-gray-200">
                  {row.feesPaid ? "Yes" : "No"}
                </td>

                <td className="px-5 py-3 border-gray-200">
                  {row.allocatedStaff || "-"}
                </td>

                <td className="px-5 py-3  border-gray-200">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
      ${row.status === "Selected" ? "bg-green-100 text-green-700" : ""}
      ${row.status === "Pending" ? "bg-yellow-100 text-yellow-700" : ""}
      ${row.status === "UserCreated" ? "bg-blue-100 text-blue-700" : ""}

      ${row.status === "Rejected" ? "bg-red-100 text-red-700" : ""}`}
                  >
                    {row.status}
                  </span>
                </td>

                <td className="px-5 py-3 flex items-center space-x-2 justify-center">
                  <button
                    onClick={() => navigate(`/admin/scholarship_list/${row._id}`)}
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
                  className="text-center py-10 text-gray-500 text-lg "
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
};

export default ScholarshipListTable;
