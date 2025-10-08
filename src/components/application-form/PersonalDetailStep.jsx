import React from "react";

const PersonalDetailStep = ({
  data = {},
  errors = {},
  onChange = () => {},
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[56vh] pr-6 overflow-auto custom-scroll">
      {/* Student Name */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Student Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          value={data.studentName || ""}
          onChange={(e) => onChange("studentName", e.target.value)}
          placeholder="Enter your name"
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        />
        {errors.studentName && (
          <p className="text-red-500 text-sm">{errors.studentName}</p>
        )}
      </div>

      {/* Gender */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Gender <span className="text-red-600">*</span>
        </label>
        <select
          value={data.gender || ""}
          onChange={(e) => onChange("gender", e.target.value)}
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender}</p>
        )}
      </div>

      {/* DOB */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Date of Birth <span className="text-red-600">*</span>
        </label>
        <input
          type="date"
         value={data.dob ? data.dob.split("T")[0] : ""}
          onChange={(e) => onChange("dob", e.target.value)}
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        />
        {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
      </div>

      {/* Community */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Community <span className="text-red-600">*</span>
        </label>
        <select
          value={data.community || ""}
          onChange={(e) => onChange("community", e.target.value)}
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        >
          <option value="">Select Community</option>
          <option value="OC">OC</option>
          <option value="BC">BC</option>
          <option value="MBC">MBC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
          <option value="Other">Other</option>
        </select>
        {errors.community && (
          <p className="text-red-500 text-sm">{errors.community}</p>
        )}
      </div>

      {/* Caste Name */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Caste Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          placeholder="Caste name  in community certificate"
          value={data.casteName || ""}
          onChange={(e) => onChange("casteName", e.target.value)}
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        />
        {errors.casteName && (
          <p className="text-red-500 text-sm">{errors.casteName}</p>
        )}
      </div>

      {/* Community Certificate Number */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Community Certificate No <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          placeholder="Community certificate no"
          value={data.communityCertificateNo || ""}
          onChange={(e) => onChange("communityCertificateNo", e.target.value)}
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        />
        {errors.communityCertificateNo && (
          <p className="text-red-500 text-sm">
            {errors.communityCertificateNo}
          </p>
        )}
      </div>

      {/* Mother Tongue */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Mother Tongue <span className="text-red-600">*</span>
        </label>
        <select
          value={data.motherTongue || ""}
          onChange={(e) => onChange("motherTongue", e.target.value)}
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        >
          <option value="">Select Mother Tongue</option>
          <option value="Tamil">Tamil</option>
          <option value="Telugu">Telugu</option>
          <option value="Malayalam">Malayalam</option>
          <option value="Kannada">Kannada</option>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
          <option value="Other">Other</option>
        </select>
        {errors.motherTongue && (
          <p className="text-red-500 text-sm">{errors.motherTongue}</p>
        )}
      </div>

      {/* Religion */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Religion <span className="text-red-600">*</span>
        </label>
        <select
          value={data.religion || ""}
          onChange={(e) => onChange("religion", e.target.value)}
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        >
          <option value="">Select Religion</option>
          <option value="Hindu">Hindu</option>
          <option value="Muslim">Muslim</option>
          <option value="Christian">Christian</option>
          <option value="Sikh">Sikh</option>
          <option value="Buddhist">Buddhist</option>
          <option value="Jain">Jain</option>
          <option value="Other">Other</option>
        </select>
        {errors.religion && (
          <p className="text-red-500 text-sm">{errors.religion}</p>
        )}
      </div>

      {/* Nationality */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Nationality <span className="text-red-600">*</span>
        </label>
        <select
          value={data.nationality || ""}
          onChange={(e) => onChange("nationality", e.target.value)}
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        >
          <option value="">Select Nationality</option>
          <option value="Indian">Indian</option>
          <option value="Other">Other</option>
        </select>
        {errors.nationality && (
          <p className="text-red-500 text-sm">{errors.nationality}</p>
        )}
      </div>

      {/* Blood Group */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Blood Group <span className="text-red-600">*</span>
        </label>
        <select
          value={data.bloodGroup || ""}
          onChange={(e) => onChange("bloodGroup", e.target.value)}
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        {errors.bloodGroup && (
          <p className="text-red-500 text-sm">{errors.bloodGroup}</p>
        )}
      </div>

      {/* Aadhaar No */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Aadhaar No <span className="text-red-600">*</span>
        </label>
        <input
          type="number"
          placeholder="Enter your aadhar number"
          value={data.aadharNo || ""}
          onChange={(e) => onChange("aadharNo", e.target.value)}
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        />
        {errors.aadharNo && (
          <p className="text-red-500 text-sm">{errors.aadharNo}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalDetailStep;
