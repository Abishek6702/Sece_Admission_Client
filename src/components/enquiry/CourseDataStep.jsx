import React, { useEffect, useRef } from "react";
import cover from "../../assets/srieshwar_cover.jpg";
import linkedinlogo from "../../assets/linkedin.png";

const courseOptions = [
  { value: "B.E CSE", label: "B.E CSE" },
  { value: "B.E ECE", label: "B.E ECE" },
  { value: "B.E AI-ML", label: "B.E AI-ML" },
  { value: "B.E Cyber Security", label: "B.E Cyber Security" },
  { value: "B.E CCE", label: "B.E CCE" },
  { value: "B.E EEE", label: "B.E EEE" },
  { value: "B.E Mech", label: "B.E Mech" },
  { value: "B.Tech IT", label: "B.Tech IT" },
  { value: "B.Tech CSBS", label: "B.Tech CSBS" },
  { value: "B.Tech AI & DS", label: "B.Tech AI & DS" },
];

function CustomMultiSelect({ selectedValues, onChange }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle checkbox selection
  const toggleOption = (value) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValues.length > 0
          ? selectedValues.join("  / ")
          : "Select courses..."}
      </div>

      {isOpen && (
        <div
          className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded border border-gray-300 bg-white shadow-lg"
          style={{ maxHeight: "12rem" }}
        >
          {courseOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
              style={{ backgroundColor: "transparent" }}
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                readOnly
                className="mr-2 accent-blue-600"
                onClick={(e) => e.stopPropagation()}
                onChange={() => toggleOption(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CourseDataStep({
  data,
  errors,
  onChange,
  linkedin,
  setLinkedin,
  linkedinError,
}) {
  const [linkedinModal, setLinkedinModal] = React.useState(false);
  const [linkedinChoice, setLinkedinChoice] = React.useState("");

  const handleLinkedinSelect = (value) => {
    setLinkedin(value);
    if (value === "yes") {
      setLinkedinModal(true);
    } else {
      setLinkedinModal(false);
      setLinkedinChoice("");
    }
  };

  const handleModalChoice = (choice) => {
    setLinkedinChoice(choice);
    setLinkedinModal(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Courses Multi-Select Dropdown */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Preferred Courses <span className="text-red-600">*</span>
        </label>
        <CustomMultiSelect
          selectedValues={data.courseRequired}
          onChange={(newValues) => onChange("courseRequired", newValues)}
        />
        {errors.courseRequired && (
          <span className="text-red-500">{errors.courseRequired}</span>
        )}
      </div>
      {/* Signature Input */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Signature (Full Name) <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
          name="signature"
          placeholder="Signature"
          value={data.signature}
          onChange={(e) => onChange("signature", e.target.value)}
        />
        {errors.signature && (
          <span className="text-red-500">{errors.signature}</span>
        )}
      </div>
      {/* LinkedIn Availability */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-[#282526]">
          Are you available on LinkedIn? <span className="text-red-600">*</span>
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="linkedin"
              value="yes"
              checked={linkedin === "yes"}
              onChange={() => handleLinkedinSelect("yes")}
              className="accent-[#0B56A4]"
            />
            Yes
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="linkedin"
              value="no"
              checked={linkedin === "no"}
              onChange={() => handleLinkedinSelect("no")}
              className="accent-[#0B56A4]"
            />
            No
          </label>
        </div>
        {linkedinError && <span className="text-red-500">{linkedinError}</span>}
      </div>

      {/* Confirmation Checkbox */}
      <div className="relative flex items-center gap-2">
        <input
          type="checkbox"
          id="confirmation"
          className="accent-[#0B56A4] w-4 h-4"
          checked={data.confirmation}
          onChange={(e) => onChange("confirmation", e.target.checked)}
        />
        <label htmlFor="confirmation" className="text-sm text-gray-700">
          I confirm all my data is true to my knowledge{" "}
          <span className="text-red-600">*</span>
        </label>
        {errors.confirmation && (
          <span className="absolute top-15 text-red-500">
            {errors.confirmation}
          </span>
        )}
      </div>

      {/* LinkedIn Modal */}
      {linkedinModal && (
        <div className="fixed inset-0 tint1 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg md:w-[40%] relative">
            <img src={cover} alt="" className="rounded-t-lg h-[140px] " />
            <div className="w-[82px] h-[82px] rounded-full absolute top-24 left-[50%] -translate-x-1/2 bg-[#ddedff] flex items-center justify-center">
              <img src={linkedinlogo} alt="" className="w-10" />
            </div>

            <div className=" w-[80%] m-auto text-center mt-10">
              <p className="text-xl font-bold playfair text-[#282526] ">
                Follow Us on LinkedIn
              </p>
              <p className="text-[#646464] text-sm leading-6 mt-1">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </p>
            </div>
            <div className="  m-auto mb-4 flex mt-4 gap-4 items-center justify-center ">
              <button
                onClick={() => setLinkedinModal(false)}
                className=" px-4   bg-gray-200 py-2 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    "https://www.linkedin.com/school/srieshwar/posts/?feedView=all",
                    "_blank"
                  );
                }}
                className="px-4 bg-[#0b56a4] text-white font-semibold cursor-pointer py-2 rounded-lg"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
