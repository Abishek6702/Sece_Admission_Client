import React from "react";

const courseEntryTypes = ["I Year B.E / B.Tech", "Lateral Entry", "I Year M.E"];
const preferredCourses = ["B.Tech IT", "B.E CSE", "B.E ECE", "B.Com", "MBA"];
const hostelOptions = ["Hostel", "DayScholar"];
const yesNoOptions = ["Yes", "No"];
const departments = ["IT", "CSE", "ECE", "EEE", "Mechanical", "Civil", "MBA"];
const years = ["2020", "2021", "2022", "2023", "2024"];
const careerOptions = [
  "Placement",
  "Government Job",
  "Higher Studies",
  "Entrepreneurship",
  "Other",
];

const EducationalStep = ({ data = {}, errors = {}, onChange = () => {} }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6  pr-6 overflow-auto custom-scroll">
      {/* Course Entry Type */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Course Entry Type <span className="text-red-600">*</span>
        </label>
        <select
          value={data.courseEntryType || ""}
          onChange={(e) => onChange("courseEntryType", e.target.value)}
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        >
          <option value="">Select Course Entry Type</option>
          {courseEntryTypes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.courseEntryType && (
          <p className="text-red-500 text-sm">{errors.courseEntryType}</p>
        )}
      </div>

      {/* Preferred Course */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Preferred Course <span className="text-red-600">*</span>
        </label>
        <select
          value={data.preferredCourse || ""}
          onChange={(e) => onChange("preferredCourse", e.target.value)}
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        >
          <option value="">Select Preferred Course</option>
          {preferredCourses.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.preferredCourse && (
          <p className="text-red-500 text-sm">{errors.preferredCourse}</p>
        )}
      </div>

      {/* Insurance Nominee */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Insurance Nominee
        </label>
        <input
          type="text"
          placeholder="Sece insurance nominee"
          value={data.insuranceNominee || ""}
          onChange={(e) => onChange("insuranceNominee", e.target.value)}
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        />
        {errors.insuranceNominee && (
          <p className="text-red-500 text-sm">{errors.insuranceNominee}</p>
        )}
      </div>

      {/* Hostel / Day Scholar */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Mode of Stay <span className="text-red-600">*</span>
        </label>
        <select
          value={data.hostelDayScholar || ""}
          onChange={(e) => onChange("hostelDayScholar", e.target.value)}
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        >
          <option value="">Select Mode of Stay</option>
          {hostelOptions.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        {errors.hostelDayScholar && (
          <p className="text-red-500 text-sm">{errors.hostelDayScholar}</p>
        )}
      </div>
      {/* EMIS No */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          EMIS No <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter your EMIS no"
          value={data.emisNo || ""}
          onChange={(e) => onChange("emisNo", e.target.value)}
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        />
        {errors.emisNo && (
          <p className="text-red-500 text-sm">{errors.emisNo}</p>
        )}
      </div>

      {/* Siblings Studying Here */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Any Siblings Studying Here? <span className="text-red-600">*</span>
        </label>
        <select
          value={data.siblingsStudyingHere ? "Yes" : "No"} // show Yes/No
          onChange={(e) =>
            onChange("siblingsStudyingHere", e.target.value === "Yes")
          } // convert to Boolean
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        >
          <option value="">Select Option</option>
          {yesNoOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {errors.siblingsStudyingHere && (
          <p className="text-red-500 text-sm">{errors.siblingsStudyingHere}</p>
        )}
      </div>

      {/* Show sibling fields if Yes */}
      {data.siblingsStudyingHere === true && (
        <>
          {/* Sibling Name */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Sibling Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your sibling name"
              value={data.siblingDetails?.name || ""}
              onChange={(e) =>
                onChange("siblingDetails", {
                  ...data.siblingDetails,
                  name: e.target.value,
                })
              }
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors?.siblingDetails?.name && (
              <p className="text-red-500 text-sm">
                {errors.siblingDetails.name}
              </p>
            )}
          </div>

          {/* Sibling Roll No */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Sibling Roll No <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your sibling roll no"
              value={data.siblingDetails?.rollNo || ""}
              onChange={(e) =>
                onChange("siblingDetails", {
                  ...data.siblingDetails,
                  rollNo: e.target.value,
                })
              }
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors?.siblingDetails?.rollNo && (
              <p className="text-red-500 text-sm">
                {errors.siblingDetails.rollNo}
              </p>
            )}
          </div>

          {/* Sibling Department */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Sibling Department <span className="text-red-600">*</span>
            </label>
            <select
              value={data.siblingDetails?.department || ""}
              onChange={(e) =>
                onChange("siblingDetails", {
                  ...data.siblingDetails,
                  department: e.target.value,
                })
              }
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors?.siblingDetails?.department && (
              <p className="text-red-500 text-sm">
                {errors.siblingDetails.department}
              </p>
            )}
          </div>

          {/* Year of Admission */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Year of Admission <span className="text-red-600">*</span>
            </label>
            <select
              value={data.siblingDetails?.yearOfAdmission || ""}
              onChange={(e) =>
                onChange("siblingDetails", {
                  ...data.siblingDetails,
                  yearOfAdmission: e.target.value,
                })
              }
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            >
              <option value="">Select Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            {errors?.siblingDetails?.yearOfAdmission && (
              <p className="text-red-500 text-sm">
                {errors.siblingDetails.yearOfAdmission}
              </p>
            )}
          </div>
        </>
      )}

      {/* Career Option */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Career Option <span className="text-red-600">*</span>
        </label>
        <select
          value={data.careerOption || ""}
          onChange={(e) => onChange("careerOption", e.target.value)}
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        >
          <option value="">Select Career Option</option>
          {careerOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.careerOption && (
          <p className="text-red-500 text-sm">{errors.careerOption}</p>
        )}
      </div>
    </div>
  );
};

export default EducationalStep;
