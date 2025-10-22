import { useEffect, useState, useRef } from "react";

function SchoolSelect({ data, onChange, errors }) {
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const selectRef = useRef();

  // Fetch schools from backend
  const fetchSchools = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/school?search=${search}`);
      const data = await res.json();
      setSchools(data);
    } catch (err) {
      console.error("Error fetching schools:", err);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => fetchSchools(), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative w-full" ref={selectRef}>
      <label className="font-semibold mb-1 block text-[#282526]">
        12th School Name <span className="text-red-600">*</span>
      </label>
      <div
        className={`flex items-center px-2 py-2 rounded-lg border ${
          open ? "border-[#0B56A4] border-2 bg-white" : "border-gray-300 bg-[#f6f6f6]"
        } text-sm cursor-pointer`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={`text-gray-800 ${!data?.twelfthSchoolName ? "text-gray-400" : ""}`}>
          {data?.twelfthSchoolName || "Search and select school"}
        </span>
        <span className="ml-auto text-gray-400">▼</span>
      </div>

      {open && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow z-20 max-h-60 overflow-auto">
          <input
            autoFocus
            className="w-full px-2 py-2 mb-1 rounded border border-gray-200 outline-none text-gray-700 text-sm"
            placeholder="Type to search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {schools.length === 0 && <div className="p-2 text-gray-400">No results</div>}
          {schools.map((s) => (
            <div
              key={s._id}
              className={`p-2 hover:bg-gray-100 cursor-pointer text-sm ${
                s.school_name === data?.twelfthSchoolName ? "bg-[#e0e7ef] font-semibold" : ""
              }`}
              onClick={() => {
                onChange("twelfthSchoolName", s.school_name);
                setOpen(false);
                setSearch("");
              }}
            >
              {s.school_name}
            </div>
          ))}
        </div>
      )}

      {errors?.twelfthSchoolName && <span className="text-red-500 mt-1 block">{errors.twelfthSchoolName}</span>}
    </div>
  );
}

export default SchoolSelect;
