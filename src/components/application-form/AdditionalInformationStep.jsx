import React from "react";

const AdditionalInformationStep = ({ data = {}, errors = {}, onChange = () => {} }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pr-6 overflow-auto custom-scroll">

      {/* Quota */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">Quota <span className="text-red-600">*</span></label>
        <select
          value={data.quota || ""}
          onChange={(e) => onChange("quota", e.target.value)}
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        >
          <option value="">Select Quota</option>
          <option value="Government Quota">Government Quota</option>
          <option value="Management Quota">Management Quota</option>
        </select>
        {errors.quota && <p className="text-red-500 text-sm">{errors.quota}</p>}
      </div>

      {/* Family Income */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Family Income (as per certificate) <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter your income"
          value={data.familyIncomeAsPerCertificate || ""}
          onChange={(e) => onChange("familyIncomeAsPerCertificate", e.target.value)}
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        />
        {errors.familyIncomeAsPerCertificate && (
          <p className="text-red-500 text-sm">{errors.familyIncomeAsPerCertificate}</p>
        )}
      </div>

      {/* Income Certificate Number */}
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          Income Certificate Number <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter income certificate number"
          value={data.incomeCertificateNo || ""}
          onChange={(e) => onChange("incomeCertificateNo", e.target.value)}
          className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
        />
        {errors.incomeCertificateNo && (
          <p className="text-red-500 text-sm">{errors.incomeCertificateNo}</p>
        )}
      </div>

      {/* Conditional Fields for Government Quota */}
      {data.quota === "Government Quota" && (
        <>
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Counselling Application Number <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your application number"
              value={data.counsellingApplicationNo || ""}
              onChange={(e) => onChange("counsellingApplicationNo", e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.counsellingApplicationNo && (
              <p className="text-red-500 text-sm">{errors.counsellingApplicationNo}</p>
            )}
          </div>

          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Counselling Overall Rank <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your overall rank"
              value={data.counsellingOverallRank || ""}
              onChange={(e) => onChange("counsellingOverallRank", e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.counsellingOverallRank && (
              <p className="text-red-500 text-sm">{errors.counsellingOverallRank}</p>
            )}
          </div>

          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Counselling Community Rank <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your community rank"
              value={data.counsellingCommunityRank || ""}
              onChange={(e) => onChange("counsellingCommunityRank", e.target.value)}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            />
            {errors.counsellingCommunityRank && (
              <p className="text-red-500 text-sm">{errors.counsellingCommunityRank}</p>
            )}
          </div>

          {/* First Graduate Selection */}
          <div>
            <label className="font-semibold mb-1 block text-[#282526]">
              Is this a First Graduate Student? <span className="text-red-600">*</span>
            </label>
            <select
              value={data.isFirstGraduate ? "Yes" : "No"}
              onChange={(e) => onChange("isFirstGraduate", e.target.value === "Yes")}
              className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {/* First Graduate Certificate Number */}
          {data.isFirstGraduate && (
            <div>
              <label className="font-semibold mb-1 block text-[#282526]">
                First Graduate Certificate Number <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your first graduate certificate no"
                value={data.firstGraduateNumber || ""}
                onChange={(e) => onChange("firstGraduateNumber", e.target.value)}
                className="w-full px-2 py-2 rounded-lg border border-gray-300 bg-[#f6f6f6] outline-none focus:border-2 focus:bg-white focus:border-[#0B56A4] placeholder-gray-400 text-sm"
              />
              {errors.firstGraduateNumber && (
                <p className="text-red-500 text-sm">{errors.firstGraduateNumber}</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdditionalInformationStep;
