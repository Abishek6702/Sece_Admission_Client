import { useState, useRef, useEffect } from "react";

const districts = [
  "Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", // Add all needed districts
];

const states = [
  "Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana", // Add needed states
];

export default function PersonalInfoStep({ data, errors, onChange }) {
  const [openDistrict, setOpenDistrict] = useState(false);
  const [searchDistrict, setSearchDistrict] = useState("");
  const [openState, setOpenState] = useState(false);
  const [searchState, setSearchState] = useState("");
  const districtRef = useRef();
  const stateRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (districtRef.current && !districtRef.current.contains(e.target)) {
        setOpenDistrict(false);
        setSearchDistrict("");
      }
      if (stateRef.current && !stateRef.current.contains(e.target)) {
        setOpenState(false);
        setSearchState("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredDistricts = districts.filter((d) =>
    d.toLowerCase().includes(searchDistrict.toLowerCase())
  );
  const filteredStates = states.filter((s) =>
    s.toLowerCase().includes(searchState.toLowerCase())
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6  h-[64vh] pr-6 overflow-auto custom-scroll">
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Student Name <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          name="studentName"
          placeholder="Student Name"
          value={data.studentName}
          onChange={(e) => onChange("studentName", e.target.value)}
        />
        {errors.studentName && (
          <span className="text-red-500">{errors.studentName}</span>
        )}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Date of Birth <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          type="date"
          name="dob"
          value={data.dob}
          onChange={(e) => onChange("dob", e.target.value)}
        />
        {errors.dob && <span className="text-red-500">{errors.dob}</span>}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Gender <span className="text-red-600">*</span>
        </label>
        <select
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          name="gender"
          value={data.gender}
          onChange={(e) => onChange("gender", e.target.value)}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.gender && <span className="text-red-500">{errors.gender}</span>}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Father Name <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          name="fatherName"
          placeholder="Father Name"
          value={data.fatherName}
          onChange={(e) => onChange("fatherName", e.target.value)}
        />
        {errors.fatherName && (
          <span className="text-red-500">{errors.fatherName}</span>
        )}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Mother Name <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          name="motherName"
          placeholder="Mother Name"
          value={data.motherName}
          onChange={(e) => onChange("motherName", e.target.value)}
        />
        {errors.motherName && (
          <span className="text-red-500">{errors.motherName}</span>
        )}
      </div>

      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Door No <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          name="address.doorNo"
          placeholder="Door No"
          value={data.address.doorNo}
          onChange={(e) => onChange("address.doorNo", e.target.value)}
        />
        {errors.doorNo && <span className="text-red-500">{errors.doorNo}</span>}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Street <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          name="address.street"
          placeholder="Street"
          value={data.address.street}
          onChange={(e) => onChange("address.street", e.target.value)}
        />
        {errors.street && <span className="text-red-500">{errors.street}</span>}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">Taluk <span className="text-red-600">*</span></label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          name="address.taluk"
          placeholder="Taluk"
          value={data.address.taluk}
          onChange={(e) => onChange("address.taluk", e.target.value)}
        />
        {errors.taluk && <span className="text-red-500">{errors.taluk}</span>}
      </div>
      <div className="relative" ref={districtRef}>
        <label className="font-semibold mb-1 block text-[#282526]">
          District <span className="text-red-600">*</span>
        </label>
        <div
          className={`flex items-center px-2 py-2 rounded-lg border ${
            openDistrict ? "border-[#0B56A4] border-2 bg-white" : "border-gray-300 bg-[#f6f6f6]"
          } text-sm cursor-pointer`}
          tabIndex={0}
          onClick={() => setOpenDistrict((o) => !o)}
        >
          <span className={`text-gray-800 ${!data.address.district ? "text-gray-400" : ""}`}>
            {data.address.district || "Search and select district"}
          </span>
          <span className="ml-auto text-gray-400">▼</span>
        </div>
        {openDistrict && (
          <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow z-20 max-h-60 overflow-auto">
            <input
              autoFocus
              className="w-full px-2 py-2 mb-1 rounded border border-gray-200 outline-none text-gray-700 text-sm"
              placeholder="Type to search…"
              value={searchDistrict}
              onChange={(e) => setSearchDistrict(e.target.value)}
            />
            {filteredDistricts.length === 0 && (
              <div className="p-2 text-gray-400">No results</div>
            )}
            {filteredDistricts.map((district) => (
              <div
                key={district}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                  district === data.address.district ? "bg-[#e0e7ef] font-semibold" : ""
                }`}
                onClick={() => {
                  onChange("address.district", district);
                  setOpenDistrict(false);
                  setSearchDistrict("");
                }}
              >
                {district}
              </div>
            ))}
          </div>
        )}
        {errors.district && <span className="text-red-500">{errors.district}</span>}
      </div>

      {/* State dropdown */}
      <div className="relative" ref={stateRef}>
        <label className="font-semibold mb-1 block text-[#282526]">
          State <span className="text-red-600">*</span>
        </label>
        <div
          className={`flex items-center px-2 py-2 rounded-lg border ${
            openState ? "border-[#0B56A4] border-2 bg-white" : "border-gray-300 bg-[#f6f6f6]"
          } text-sm cursor-pointer`}
          tabIndex={0}
          onClick={() => setOpenState((o) => !o)}
        >
          <span className={`text-gray-800 ${!data.address.state ? "text-gray-400" : ""}`}>
            {data.address.state || "Search and select state"}
          </span>
          <span className="ml-auto text-gray-400">▼</span>
        </div>
        {openState && (
          <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow z-20 max-h-60 overflow-auto">
            <input
              autoFocus
              className="w-full px-2 py-2 mb-1 rounded border border-gray-200 outline-none text-gray-700 text-sm"
              placeholder="Type to search…"
              value={searchState}
              onChange={(e) => setSearchState(e.target.value)}
            />
            {filteredStates.length === 0 && (
              <div className="p-2 text-gray-400">No results</div>
            )}
            {filteredStates.map((state) => (
              <div
                key={state}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                  state === data.address.state ? "bg-[#e0e7ef] font-semibold" : ""
                }`}
                onClick={() => {
                  onChange("address.state", state);
                  setOpenState(false);
                  setSearchState("");
                }}
              >
                {state}
              </div>
            ))}
          </div>
        )}
        {errors.state && <span className="text-red-500">{errors.state}</span>}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Pincode <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          type="number"
          name="address.pincode"
          placeholder="Pincode"
          value={data.address.pincode}
          onChange={(e) => onChange("address.pincode", e.target.value)}
        />
        {errors.pincode && (
          <span className="text-red-500">{errors.pincode}</span>
        )}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Community <span className="text-red-600">*</span>
        </label>
        <select
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          name="community"
          placeholder="Community"
          value={data.community}
          onChange={(e) => onChange("community", e.target.value)}
        >
          <option value="">Select Community</option>
          <option value="OC">OC</option>
          <option value="BC">BC</option>
          <option value="BCM">BCM</option>
          <option value="MBC">MBC</option>
          <option value="SCA">SCA</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>

        </select>
        {errors.community && (
          <span className="text-red-500">{errors.community}</span>
        )}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Student Email <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          type="email"
          name="studentEmail"
          placeholder="Student Email"
          value={data.studentEmail}
          onChange={(e) => onChange("studentEmail", e.target.value)}
        />
        {errors.studentEmail && (
          <span className="text-red-500">{errors.studentEmail}</span>
        )}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Student Mobile <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          name="studentMobile"
          placeholder="Student Mobile"
          value={data.studentMobile}
          onChange={(e) => onChange("studentMobile", e.target.value)}
        />
        {errors.studentMobile && (
          <span className="text-red-500">{errors.studentMobile}</span>
        )}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Father Email
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          type="email"
          name="fatherEmail"
          placeholder="Father Email"
          value={data.fatherEmail}
          onChange={(e) => onChange("fatherEmail", e.target.value)}
        />
        {errors.fatherEmail && (
          <span className="text-red-500">{errors.fatherEmail}</span>
        )}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Father Mobile <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          name="fatherMobile"
          placeholder="Father Mobile"
          value={data.fatherMobile}
          onChange={(e) => onChange("fatherMobile", e.target.value)}
        />
        {errors.fatherMobile && (
          <span className="text-red-500">{errors.fatherMobile}</span>
        )}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Mother Email 
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          type="email"
          name="motherEmail"
          placeholder="Mother Email"
          value={data.motherEmail}
          onChange={(e) => onChange("motherEmail", e.target.value)}
        />
        {errors.motherEmail && (
          <span className="text-red-500">{errors.motherEmail}</span>
        )}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Mother Mobile <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          name="motherMobile"
          placeholder="Mother Mobile"
          value={data.motherMobile}
          onChange={(e) => onChange("motherMobile", e.target.value)}
        />
        {errors.motherMobile && (
          <span className="text-red-500">{errors.motherMobile}</span>
        )}
      </div>
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          First Graduate <span className="text-red-600">*</span>
        </label>

        <div className="flex items-center">
          {/* Radio Button for "No" */}
          <label className="flex items-center mr-4">
            <input
              type="radio"
              name="isFirstGraduate"
              value="no"
              checked={!data.isFirstGraduate}
              onChange={(e) => onChange("isFirstGraduate", false)}
              className="mr-2 form-radio accent-[#0B56A4]"
            />
            No
          </label>

          {/* Radio Button for "Yes" */}
          <label className="flex items-center">
            <input
              type="radio"
              name="isFirstGraduate"
              value="yes"
              checked={data.isFirstGraduate}
              onChange={(e) => onChange("isFirstGraduate", true)}
              className="mr-2 form-radio accent-[#0B56A4] "
            />
            Yes
          </label>
        </div>
      </div>
    </div>
  );
}
