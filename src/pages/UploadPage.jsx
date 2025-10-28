import React, { useState, useEffect } from "react";
import { FilterX, Download, Search, Upload } from "lucide-react";
import { toast } from "react-toastify";
import nodata from "../assets/no-data.svg";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(null);
  const [courseFilter, setCourseFilter] = useState("");

  // Fetch user list from backend
  const fetchUsers = async () => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/users`
      );
      const data = await resp.json();
      if (resp.ok) setUsers(data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      handleImport(selected);
    }
  };

  const handleImport = async (selectedFile) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("excel", selectedFile);

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/import-users-excel`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await resp.json();

      if (resp.ok) {
        toast.success(` Import successful! ${result.count} users created.`);
        fetchUsers();
      } else {
        toast.error(` Import failed: ${result.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Import error", err);
      toast.error("Import failed due to network error");
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  // Filtering and searching
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());

    const matchesCourse = courseFilter
      ? u.prefillData?.finalizedCourse === courseFilter
      : true;

    const hasPrefillData =
      u.prefillData?.finalizedCourse || u.prefillData?.courseEntryType;

    return matchesSearch && matchesCourse && hasPrefillData;
  });

  const uniqueCourses = [
    ...new Set(
      users.map((u) => u.prefillData?.finalizedCourse).filter(Boolean)
    ),
  ];
  const uniqueQuotas = [
    ...new Set(users.map((u) => u.prefillData?.quota).filter(Boolean)),
  ];

  const clearFilters = () => {
    setSearch("");
    setCourseFilter("");
    setQuotaFilter("");
  };

  return (
    <>
      <p className="text-2xl playfair px-6">Uploads</p>
      <div className="px-6 py-3 max-w-6xl mx-auto ">
        <div className="flex items-center justify-between mb-4">
          {/* Search Input */}
          <div className="relative w-72">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="border bg-white border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#0b56a4]"
            />
            <Search className="absolute top-2 right-2 text-gray-400 w-4" />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={clearFilters}
              className="bg-[#0b56a4] text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <FilterX className="w-4" />
              Clear Filter
            </button>

            <label
              htmlFor="file-upload"
              className={`px-4 py-2 rounded-lg text-white flex items-center gap-2 cursor-pointer ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              <Upload className="w-4" />
              {loading ? "Importing..." : "Import Excel"}
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".xls,.xlsx"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-sm">
          <table className="min-w-full border-collapse bg-white">
            <thead className="bg-[#393738] text-white text-left text-sm font-medium">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>

                {/* Quota Filter */}
                <th className="px-5 py-3 relative cursor-pointer">
                  <div className="flex items-center space-x-1">
                    <span>Quota</span>
                  </div>
                </th>

                {/* Course Filter */}
                <th
                  className="px-5 py-3 relative cursor-pointer"
                  onClick={() =>
                    setFilterOpen(filterOpen === "course" ? null : "course")
                  }
                >
                  <div className="flex items-center space-x-1">
                    <span>Finalized Course</span>
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
                    <div className="absolute top-full mt-1 w-52 bg-white text-gray-800 border border-gray-200 shadow-lg rounded-md z-10 p-2">
                      <ul className="max-h-60 overflow-y-auto">
                        {uniqueCourses.map((c) => (
                          <li
                            key={c}
                            className={`px-3 py-2 cursor-pointer ${
                              courseFilter === c
                                ? "bg-gray-200 font-medium"
                                : ""
                            }`}
                            onClick={() => {
                              setCourseFilter(c);
                              setFilterOpen(null);
                            }}
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </th>

                <th className="px-5 py-3">Course Entry Type</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-700">
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    <img src={nodata} alt="" c className="w-[25%] m-auto" />
                    <p className="mt-4">No Data Found</p>
                  </td>
                </tr>
              )}
              {filteredUsers.map((user, idx) => (
                <tr
                  key={user._id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-5 py-3 border-gray-200">{user.name}</td>
                  <td className="px-5 py-3 border-gray-200">{user.email}</td>
                  <td className="px-5 py-3 border-gray-200">
                    {user.prefillData?.quota || "-"}
                  </td>
                  <td className="px-5 py-3 border-gray-200">
                    {user.prefillData?.finalizedCourse || "-"}
                  </td>
                  <td className="px-5 py-3 border-gray-200">
                    {user.prefillData?.courseEntryType || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
