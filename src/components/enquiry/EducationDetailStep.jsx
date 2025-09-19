import { useState, useRef, useEffect } from "react";

const schools = [
  "Kendriya Vidyalaya",
  "DAV Senior Secondary School",
  "St. Joseph's Higher Secondary School",
  "Chinmaya Vidyalaya",
  "National Public School",
  "Bharatiya Vidya Bhavan",
  "Padma Seshadri Bala Bhavan",
  "Other School",
];
const schoolAddresses = [
  "Address 1",
  "Address 2",
  "Address 3",
  "Address 4",
  "Address 5",
  "Address 6",
  "Address 7",
];
export default function EducationDetailStep({ data, errors, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openAddress, setOpenAddress] = useState(false);
  const [searchAddress, setSearchAddress] = useState("");
  const selectRef = useRef();
  const addressRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
      if (addressRef.current && !addressRef.current.contains(e.target)) {
        setOpenAddress(false);
        setSearchAddress("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredSchools = schools.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  );
  const filteredAddresses = schoolAddresses.filter((a) =>
    a.toLowerCase().includes(searchAddress.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="relative w-full" ref={selectRef}>
        <label className="font-semibold mb-1 block text-[#282526]">
          12th School Name <span className="text-red-600">*</span>
        </label>
        <div
          className={`flex items-center px-2 py-2 rounded-lg border ${
            open
              ? "border-[#0B56A4] border-2 bg-white"
              : "border-gray-300 bg-[#f6f6f6]"
          } text-sm cursor-pointer`}
          onClick={() => setOpen((o) => !o)}
          tabIndex={0}
        >
          <span
            className={`text-gray-800 ${
              !data.twelfthSchoolName ? "text-gray-400" : ""
            }`}
          >
            {data.twelfthSchoolName || "Search and select school"}
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
            {filteredSchools.length === 0 && (
              <div className="p-2 text-gray-400">No results</div>
            )}
            {filteredSchools.map((school) => (
              <div
                key={school}
                className={`p-2 hover:bg-gray-100 cursor-pointer ${
                  school === data.twelfthSchoolName
                    ? "bg-[#e0e7ef] font-semibold"
                    : ""
                }`}
                onClick={() => {
                  onChange("twelfthSchoolName", school);
                  setOpen(false);
                  setSearch("");
                }}
              >
                {school}
              </div>
            ))}
          </div>
        )}
        {errors.twelfthSchoolName && (
          <span className="text-red-500 mt-1 block">
            {errors.twelfthSchoolName}
          </span>
        )}
      </div>
      <div className="relative w-full" ref={addressRef}>
        <label className="font-semibold mb-1 block text-[#282526]">
          12th School Address <span className="text-red-600">*</span>
        </label>
        <div
          className={`flex items-center px-2 py-2 rounded-lg border ${
            openAddress
              ? "border-[#0B56A4] border-2 bg-white"
              : "border-gray-300 bg-[#f6f6f6]"
          } text-sm cursor-pointer`}
          onClick={() => setOpenAddress((o) => !o)}
          tabIndex={0}
        >
          <span
            className={`text-gray-800 ${
              !data.twelfthSchoolAddress ? "text-gray-400" : ""
            }`}
          >
            {data.twelfthSchoolAddress || "Search and select address"}
          </span>
          <span className="ml-auto text-gray-400">▼</span>
        </div>
        {openAddress && (
          <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow z-20 max-h-60 overflow-auto">
            <input
              autoFocus
              className="w-full px-2 py-2 mb-1 rounded border border-gray-200 outline-none text-gray-700 text-sm"
              placeholder="Type to search…"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
            />
            {filteredAddresses.length === 0 && (
              <div className="p-2 text-gray-400">No results</div>
            )}
            {filteredAddresses.map((address) => (
              <div
                key={address}
                className={`p-2 hover:bg-gray-100 cursor-pointer ${
                  address === data.twelfthSchoolAddress
                    ? "bg-[#e0e7ef] font-semibold"
                    : ""
                }`}
                onClick={() => {
                  onChange("twelfthSchoolAddress", address);
                  setOpenAddress(false);
                  setSearchAddress("");
                }}
              >
                {address}
              </div>
            ))}
          </div>
        )}
        {errors.twelfthSchoolAddress && (
          <span className="text-red-500 mt-1 block">
            {errors.twelfthSchoolAddress}
          </span>
        )}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          12th School Board <span className="text-red-600">*</span>
        </label>
        <select
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] text-sm"
          name="twelfthSchoolBoard"
          value={data.twelfthSchoolBoard}
          onChange={(e) => onChange("twelfthSchoolBoard", e.target.value)}
        >
          <option value="">Select Board</option>
          <option value="CBSE">CBSE</option>
          <option value="ICSE">ICSE</option>
          <option value="TN-HSC">TN-HSC</option>
          <option value="ISC">IB</option>
          <option value="Other">Other</option>
        </select>
        {errors.twelfthSchoolBoard && (
          <span className="text-red-500">{errors.twelfthSchoolBoard}</span>
        )}
      </div>

      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          12th Register No <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          name="twelfthRegisterNo"
          value={data.twelfthRegisterNo}
          placeholder="12th Registeration Number"
          onChange={(e) => onChange("twelfthRegisterNo", e.target.value)}
        />
        {errors.twelfthRegisterNo && (
          <span className="text-red-500">{errors.twelfthRegisterNo}</span>
        )}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Maths (out of 100) <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          type="number"
          name="twelfthMarks.maths"
          value={data.twelfthMarks.maths}
          placeholder="12th Maths Mark"
          onChange={(e) => onChange("twelfthMarks.maths", e.target.value)}
        />
        {errors.maths && <span className="text-red-500">{errors.maths}</span>}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Physics (out of 100) <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          type="number"
          name="twelfthMarks.physics"
          placeholder="12th Physics Mark"
          value={data.twelfthMarks.physics}
          onChange={(e) => onChange("twelfthMarks.physics", e.target.value)}
        />
        {errors.physics && (
          <span className="text-red-500">{errors.physics}</span>
        )}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Chemistry (out of 100) <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          type="number"
          name="twelfthMarks.chemistry"
          placeholder="12th Chemistry Mark"
          value={data.twelfthMarks.chemistry}
          onChange={(e) => onChange("twelfthMarks.chemistry", e.target.value)}
        />
        {errors.chemistry && (
          <span className="text-red-500">{errors.chemistry}</span>
        )}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Vocational If Any 
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          type="number"
          name="twelfthMarks.vocationalIfAny"
          placeholder="12th Vocational Subject Mark"
          value={data.twelfthMarks.vocationalIfAny}
          onChange={(e) =>
            onChange("twelfthMarks.vocationalIfAny", e.target.value)
          }
        />
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Total (out of 600) <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          type="number"
          name="twelfthMarks.total"
          placeholder="12th Total Mark"
          value={data.twelfthMarks.total}
          onChange={(e) => onChange("twelfthMarks.total", e.target.value)}
        />
        {errors.total && <span className="text-red-500">{errors.total}</span>}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Cut Off (out of 200) <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          type="number"
          name="twelfthMarks.cutOff"
          placeholder="12th Cutt-Off"
          value={data.twelfthMarks.cutOff}
          onChange={(e) => onChange("twelfthMarks.cutOff", e.target.value)}
        />
        {errors.cutOff && <span className="text-red-500">{errors.cutOff}</span>}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          10th School Board <span className="text-red-600">*</span>
        </label>
        <select
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          name="tenthSchoolBoard"
          placeholder="10th Board Studied"
          value={data.tenthSchoolBoard}
          onChange={(e) => onChange("tenthSchoolBoard", e.target.value)}
        >
          <option value="">Select Board</option>
          <option value="CBSE">CBSE</option>
          <option value="ICSE">ICSE</option>
          <option value="TN-HSC">TN-SSLC</option>
          <option value="ISC">IB</option>
          <option value="Other">Other</option>
        </select>

        {errors.tenthSchoolBoard && (
          <span className="text-red-500">{errors.tenthSchoolBoard}</span>
        )}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          10th Marks (Out of 500) <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          name="tenthMarks"
          placeholder="10th Total Mark"
          value={data.tenthMarks}
          onChange={(e) => onChange("tenthMarks", e.target.value)}
        />
        {errors.tenthMarks && (
          <span className="text-red-500">{errors.tenthMarks}</span>
        )}
      </div>
    </div>
  );
}
