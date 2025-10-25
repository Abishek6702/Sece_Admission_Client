import React, { useState, useEffect } from "react";

const qualificationOptions = [
  "High School",
  "Intermediate",
  "Graduate",
  "Postgraduate",
  "Doctorate",
];

const workTypeOptions = [
  "Private",
  "Government",
  "Farmer",
  "Business",
  "HouseWife",
  "Other",
];

const incomeOptions = [
  "Below 1 Lakh",
  "1-5 Lakh",
  "5-10 Lakh",
  "10-20 Lakh",
  "Above 20 Lakh",
];

const incomeMapping = {
  "Below 1 Lakh": 100000,
  "1-5 Lakh": 300000,
  "5-10 Lakh": 750000,
  "10-20 Lakh": 1500000,
  "Above 20 Lakh": 2500000,
};

const ParentsDetailsStep = ({
  data = {},
  errors = {},
  onChange = () => {},
}) => {
  // ✅ State to track if "Other" is selected
  const [fatherOtherWorkType, setFatherOtherWorkType] = useState("");
  const [motherOtherWorkType, setMotherOtherWorkType] = useState("");

  const [showFatherOtherInput, setShowFatherOtherInput] = useState(false);
  const [showMotherOtherInput, setShowMotherOtherInput] = useState(false);
  // ✅ Initialize custom work type if it's not in predefined options
  useEffect(() => {
    if (data.father?.workType) {
      if (!workTypeOptions.includes(data.father.workType)) {
        setFatherOtherWorkType(data.father.workType);
        setShowFatherOtherInput(true);
      } else {
        setShowFatherOtherInput(false);
      }
    }
  }, [data.father?.workType]);
  useEffect(() => {
    if (data.mother?.workType) {
      if (!workTypeOptions.includes(data.mother.workType)) {
        setMotherOtherWorkType(data.mother.workType);
        setShowMotherOtherInput(true);
      } else {
        setShowMotherOtherInput(false);
      }
    }
  }, [data.mother?.workType]);
  const handleFatherWorkTypeChange = (value) => {
    if (value === "Other") {
      setShowFatherOtherInput(true);
      onChange("father.workType", "");
      setFatherOtherWorkType("");
    } else {
      setShowFatherOtherInput(false);
      onChange("father.workType", value);
      setFatherOtherWorkType("");
    }
  };

  const handleMotherWorkTypeChange = (value) => {
    if (value === "Other") {
      setShowMotherOtherInput(true);
      onChange("mother.workType", "");
      setMotherOtherWorkType("");
    } else {
      setShowMotherOtherInput(false);
      onChange("mother.workType", value);
      setMotherOtherWorkType("");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[56vh] pr-6 overflow-auto custom-scroll">
      {/* FATHER DETAILS */}
      <div className="md:col-span-3 ">
        <h3 className="text-xl playfair font-semibold text-gray-700 mb-4">
          Father's Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={data.father?.name || ""}
              onChange={(e) => onChange("father.name", e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.fatherName && (
              <p className="text-red-500 text-sm">{errors.fatherName}</p>
            )}
          </div>

          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Qualification <span className="text-red-600">*</span>
            </label>
            <select
              value={data.father?.qualification || ""}
              onChange={(e) => onChange("father.qualification", e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            >
              <option value="">Select Qualification</option>
              {qualificationOptions.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
            {errors.fatherQualification && (
              <p className="text-red-500 text-sm">
                {errors.fatherQualification}
              </p>
            )}
          </div>

          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Work Type <span className="text-red-600">*</span>
            </label>
            <select
              value={
                data.father?.workType && workTypeOptions.includes(data.father.workType)
                  ? data.father.workType
                  : data.father?.workType
                  ? "Other"
                  : ""
              }
              onChange={(e) => handleFatherWorkTypeChange(e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            >
              <option value="">Select Work Type</option>
              {workTypeOptions.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
            {errors.fatherWorkType && (
              <p className="text-red-500 text-sm">{errors.fatherWorkType}</p>
            )}
          </div>

          {/* ✅ Show input field based on state */}
          {showFatherOtherInput && (
            <div>
              <label className="font-semibold mb-1 block text-[#282526]">
                Specify Work Type <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter work type"
                value={data.father?.workType || fatherOtherWorkType}
                onChange={(e) => {
                  onChange("father.workType", e.target.value);
                  setFatherOtherWorkType(e.target.value);
                }}
                className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
              />
            </div>
          )}

          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Organization Name
            </label>
            <input
              type="text"
              placeholder="Enter your work organization"
              value={data.father?.organizationName || ""}
              onChange={(e) =>
                onChange("father.organizationName", e.target.value)
              }
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.fatherOrganization && (
              <p className="text-red-500 text-sm">
                {errors.fatherOrganization}
              </p>
            )}
          </div>

          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Designation
            </label>
            <input
              type="text"
              placeholder="Enter your designation"
              value={data.father?.designation || ""}
              onChange={(e) => onChange("father.designation", e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.fatherDesignation && (
              <p className="text-red-500 text-sm">{errors.fatherDesignation}</p>
            )}
          </div>

          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Annual Income <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={data.father?.annualIncome || ""}
              onChange={(e) => onChange("father.annualIncome", e.target.value)}
              placeholder="Enter annual income"
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.fatherIncome && (
              <p className="text-red-500 text-sm">{errors.fatherIncome}</p>
            )}
          </div>

          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Mobile <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your mobile no"
              value={data.father?.mobile || ""}
              onChange={(e) => onChange("father.mobile", e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.fatherMobile && (
              <p className="text-red-500 text-sm">{errors.fatherMobile}</p>
            )}
          </div>

          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              WhatsApp
            </label>
            <input
              type="text"
              placeholder="Enter your whatsapp no"
              value={data.father?.whatsapp || ""}
              onChange={(e) => onChange("father.whatsapp", e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
          </div>

          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={data.father?.email || ""}
              onChange={(e) => onChange("father.email", e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
          </div>
        </div>
      </div>

      {/* MOTHER DETAILS */}
      <div className="md:col-span-3 ">
        <h3 className="text-xl playfair font-semibold text-gray-700 mb-4">
          Mother's Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={data.mother?.name || ""}
              onChange={(e) => onChange("mother.name", e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.motherName && (
              <p className="text-red-500 text-sm">{errors.motherName}</p>
            )}
          </div>

          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Qualification <span className="text-red-600">*</span>
            </label>
            <select
              value={data.mother?.qualification || ""}
              onChange={(e) => onChange("mother.qualification", e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            >
              <option value="">Select Qualification</option>
              {qualificationOptions.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
            {errors.motherQualification && (
              <p className="text-red-500 text-sm">
                {errors.motherQualification}
              </p>
            )}
          </div>

          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Work Type <span className="text-red-600">*</span>
            </label>
            <select
              value={
                data.mother?.workType && workTypeOptions.includes(data.mother.workType)
                  ? data.mother.workType
                  : data.mother?.workType
                  ? "Other"
                  : ""
              }
              onChange={(e) => handleMotherWorkTypeChange(e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            >
              <option value="">Select Work Type</option>
              {workTypeOptions.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>

          {/* ✅ Show input field based on state */}
          {showMotherOtherInput && (
            <div>
              <label className="font-semibold mb-1 block text-[#282526]">
                Specify Work Type <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter work type"
                value={data.mother?.workType || motherOtherWorkType}
                onChange={(e) => {
                  onChange("mother.workType", e.target.value);
                  setMotherOtherWorkType(e.target.value);
                }}
                className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
              />
            </div>
          )}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Organization Name
            </label>
            <input
              type="text"
              placeholder="Enter your work organization name"
              value={data.mother?.organizationName || ""}
              onChange={(e) =>
                onChange("mother.organizationName", e.target.value)
              }
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.motherOrganization && (
              <p className="text-red-500 text-sm">
                {errors.motherOrganization}
              </p>
            )}
          </div>

          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Designation
            </label>
            <input
              type="text"
              placeholder="Enter your designation"
              value={data.mother?.designation || ""}
              onChange={(e) => onChange("mother.designation", e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.motherDesignation && (
              <p className="text-red-500 text-sm">{errors.motherDesignation}</p>
            )}
          </div>

          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Annual Income <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={data.mother?.annualIncome || ""}
              onChange={(e) => onChange("mother.annualIncome", e.target.value)}
              placeholder="Enter annual income"
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.motherIncome && (
              <p className="text-red-500 text-sm">{errors.motherIncome}</p>
            )}
          </div>

          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Mobile
            </label>
            <input
              type="text"
              placeholder="Enter your mobile no"
              value={data.mother?.mobile || ""}
              onChange={(e) => onChange("mother.mobile", e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
          </div>

          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              WhatsApp
            </label>
            <input
              type="text"
              placeholder="Enter your whatsapp no"
              value={data.mother?.whatsapp || ""}
              onChange={(e) => onChange("mother.whatsapp", e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
          </div>

          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={data.mother?.email || ""}
              onChange={(e) => onChange("mother.email", e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.motherEmail && (
              <p className="text-red-500 text-sm">{errors.motherEmail}</p>
            )}
          </div>
        </div>
      </div>

      {/* GUARDIAN DETAILS */}
      {data.guardian && (
        <div className="md:col-span-3 ">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 playfair">
            Guardian Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold mb-1 block text-[#282526]">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={data.guardian?.name || ""}
                onChange={(e) => onChange("guardian.name", e.target.value)}
                className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
              />
            </div>

            <div>
              <label className="font-semibold mb-1 block text-[#282526]">
                Mobile
              </label>
              <input
                type="text"
                placeholder="Enter your mobile no"
                value={data.guardian?.mobile || ""}
                onChange={(e) => onChange("guardian.mobile", e.target.value)}
                className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentsDetailsStep;
