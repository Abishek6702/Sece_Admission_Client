import React from "react";

const states = [
  "Tamil Nadu",
  "Kerala",
  "Karnataka",
  "Andhra Pradesh",
  "Telangana",
  "Maharashtra",
  "Delhi",
  "Other",
];

const districts = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Salem",
  "Tiruchirappalli",
  "Tirunelveli",
  "Erode",
  "Vellore",
  "Other",
];

const PersonalContactStep = ({
  data = {},
  errors = {},
  onChange = () => {},
}) => {
  // Handle checkbox change
  const handleSameAsPermanent = (e) => {
    if (e.target.checked) {
      onChange("temporaryAddress", { ...data.permanentAddress });
    } else {
      onChange("temporaryAddress", {
        doorNo: "",
        street: "",
        taluk: "",
        district: "",
        state: "",
        pincode: "",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[56vh] pr-6 overflow-auto custom-scroll">
      {/* PERMANENT ADDRESS */}
      <div className="md:col-span-3">
        <h3 className="text-xl playfair font-semibold text-gray-700 mb-2">
          Permanent Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Door No */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Door No <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your door no"
              value={data.permanentAddress?.doorNo || ""}
              onChange={(e) =>
                onChange("permanentAddress", {
                  ...data.permanentAddress,
                  doorNo: e.target.value,
                })
              }
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.permanentdoorNo && (
              <p className="text-red-500 text-sm">{errors.permanentdoorNo}</p>
            )}
          </div>

          {/* Street */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Street <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your street"
              value={data.permanentAddress?.street || ""}
              onChange={(e) =>
                onChange("permanentAddress", {
                  ...data.permanentAddress,
                  street: e.target.value,
                })
              }
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.permanentstreet && (
              <p className="text-red-500 text-sm">{errors.permanentstreet}</p>
            )}
          </div>

          {/* Taluk */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Taluk <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your taluk"
              value={data.permanentAddress?.taluk || ""}
              onChange={(e) =>
                onChange("permanentAddress", {
                  ...data.permanentAddress,
                  taluk: e.target.value,
                })
              }
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.permanenttaluk && (
              <p className="text-red-500 text-sm">{errors.permanenttaluk}</p>
            )}
          </div>

          {/* District */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              District <span className="text-red-600">*</span>
            </label>
            <select
              value={data.permanentAddress?.district || ""}
              onChange={(e) =>
                onChange("permanentAddress", {
                  ...data.permanentAddress,
                  district: e.target.value,
                })
              }
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.permanentdistrict && (
              <p className="text-red-500 text-sm">{errors.permanentdistrict}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              State <span className="text-red-600">*</span>
            </label>
            <select
              value={data.permanentAddress?.state || ""}
              onChange={(e) =>
                onChange("permanentAddress", {
                  ...data.permanentAddress,
                  state: e.target.value,
                })
              }
             className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            >
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.permanentstate && (
              <p className="text-red-500 text-sm">{errors.permanentstate}</p>
            )}
          </div>

          {/* Pincode */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Pincode <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your pincode"
              value={data.permanentAddress?.pincode || ""}
              onChange={(e) =>
                onChange("permanentAddress", {
                  ...data.permanentAddress,
                  pincode: e.target.value,
                })
              }
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.permanentpincode && (
              <p className="text-red-500 text-sm">{errors.permanentpincode}</p>
            )}
          </div>
        </div>

        {/* Checkbox */}
        <div className="mt-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={handleSameAsPermanent}
              checked={
                JSON.stringify(data.permanentAddress) ===
                JSON.stringify(data.temporaryAddress)
              }
            />
            <span className="text-sm text-gray-700">
              Temporary address is same as Permanent address
            </span>
          </label>
        </div>
      </div>

      {/* TEMPORARY ADDRESS */}
      <div className="md:col-span-3 ">
        <h3 className="text-xl playfair font-semibold text-gray-700 mb-2">
          Temporary Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Door No */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Door No <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your door no"
              value={data.temporaryAddress?.doorNo || ""}
              onChange={(e) =>
                onChange("temporaryAddress", {
                  ...data.temporaryAddress,
                  doorNo: e.target.value,
                })
              }
             className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.doorNo && (
              <p className="text-red-500 text-sm">{errors.doorNo}</p>
            )}
          </div>

          {/* Street */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Street <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your street"
              value={data.temporaryAddress?.street || ""}
              onChange={(e) =>
                onChange("temporaryAddress", {
                  ...data.temporaryAddress,
                  street: e.target.value,
                })
              }
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.street && (
              <p className="text-red-500 text-sm">{errors.street}</p>
            )}
          </div>

          {/* Taluk */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Taluk <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your taluk"
              value={data.temporaryAddress?.taluk || ""}
              onChange={(e) =>
                onChange("temporaryAddress", {
                  ...data.temporaryAddress,
                  taluk: e.target.value,
                })
              }
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.taluk && (
              <p className="text-red-500 text-sm">{errors.taluk}</p>
            )}
          </div>

          {/* District */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              District <span className="text-red-600">*</span>
            </label>
            <select
              value={data.temporaryAddress?.district || ""}
              onChange={(e) =>
                onChange("temporaryAddress", {
                  ...data.temporaryAddress,
                  district: e.target.value,
                })
              }
             className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-500 text-sm">{errors.district}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              State <span className="text-red-600">*</span>
            </label>
            <select
              value={data.temporaryAddress?.state || ""}
              onChange={(e) =>
                onChange("temporaryAddress", {
                  ...data.temporaryAddress,
                  state: e.target.value,
                })
              }
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            >
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state}</p>
            )}
          </div>

          {/* Pincode */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Pincode <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your pincode"
              value={data.temporaryAddress?.pincode || ""}
              onChange={(e) =>
                onChange("temporaryAddress", {
                  ...data.temporaryAddress,
                  pincode: e.target.value,
                })
              }
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm">{errors.pincode}</p>
            )}
          </div>
        </div>
      </div>

      {/* CONTACT DETAILS */}
      <div className="md:col-span-3">
        <h3 className="text-xl playfair font-semibold text-gray-700 mb-2">
          Contact Details 
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Email */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={data.selfEmail || ""}
              onChange={(e) => onChange("selfEmail", e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.selfEmail && (
              <p className="text-red-500 text-sm">{errors.selfEmail}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Mobile Number <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your mobile number"
              value={data.selfMobileNo || ""}
              onChange={(e) => onChange("selfMobileNo", e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.selfMobileNo && (
              <p className="text-red-500 text-sm">{errors.selfMobileNo}</p>
            )}
          </div>

          {/* Whatsapp */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              WhatsApp Number <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your whatsapp number"
              value={data.selfWhatsapp || ""}
              onChange={(e) => onChange("selfWhatsapp", e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.selfWhatsapp && (
              <p className="text-red-500 text-sm">{errors.selfWhatsapp}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalContactStep;
