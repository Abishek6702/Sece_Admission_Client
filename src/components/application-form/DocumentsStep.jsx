import React, { useRef } from "react";
import { UploadCloud, X } from "lucide-react";

const DocumentsStep = ({ data = {}, errors = {}, onChange = () => {} }) => {
  const inputRefs = {}; // store refs dynamically

  const handleFileChange = (key) => (file) => {
    onChange(key, file ? [file] : []);
  };

  const handleSingleFileChange = (key) => (file) => {
    onChange(key, file ? [file] : []);
  };

  const getFileUrl = (key) => {
    const val = data[key];
    if (Array.isArray(val) && typeof val[0] === "string") return val[0];
    if (typeof val === "string") return val;
    return null;
  };

  const getFileObject = (key) => {
    const val = data[key];
    if (Array.isArray(val) && val[0] instanceof File) return val[0];
    return null;
  };

  const FileUpload = ({ label, file, fileUrl, error, onChange, name }) => {
    if (!inputRefs[name]) inputRefs[name] = useRef();

    const handleRemove = () => onChange(null);

    const handleFileSelect = (e) => {
      const selectedFile = e.target.files[0];
      onChange(selectedFile);
    };

    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (e) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onChange(e.dataTransfer.files[0]);
      }
    };

   const getFileName = (url) => {
  if (!url) return null;
  if (url instanceof File) return url.name; // uploaded file
  return url.split("/").pop(); // existing URL
};


    return (
      <div>
        <label className="font-semibold mb-1 block text-[#282526]">
          {label} <span className="text-red-600">*</span>
        </label>

        {file ? (
          <div className="flex items-center justify-between p-3 border rounded bg-white">
            <span className="truncate">{file.name}</span>
            <button type="button" onClick={handleRemove} className="text-red-500 hover:text-red-700">
              <X size={18} />
            </button>
          </div>
        ) : fileUrl ? (
          <div className="flex items-center justify-between p-3 border rounded bg-gray-50">
            <a
              href={`${import.meta.env.VITE_API_BASE_URL}/${fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 truncate"
            >
              {getFileName(file || fileUrl)}
            </a>
            <button type="button" onClick={handleRemove} className="text-red-500 hover:text-red-700">
              <X/>
            </button>
          </div>
        ) : (
          <div
            onClick={() => inputRefs[name].current.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#0B56A4] transition"
          >
            <UploadCloud size={36} className="text-gray-400 mb-2" />
            <p className="text-gray-500 text-sm text-center">
              Drag & drop your file here or click to upload
            </p>
            <p className="text-gray-400 text-xs mt-1">
              JPEG, PNG, PDF, MP4, up to 5 MB
            </p>
          </div>
        )}

        <input
          type="file"
          ref={inputRefs[name]}
          className="hidden"
          onChange={handleFileSelect}
        />

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[56vh] pr-6 overflow-auto custom-scroll">
      <FileUpload
        label="Student Photo"
        name="studentPhoto"
        file={getFileObject("studentPhoto")}
        fileUrl={getFileUrl("studentPhoto")}
        error={errors.studentPhoto}
        onChange={handleFileChange("studentPhoto")}
      />

      <FileUpload
        label="Father's Photo"
        name="fatherPhoto"
        file={getFileObject("fatherPhoto")}
        fileUrl={getFileUrl("fatherPhoto")}
        error={errors.fatherPhoto}
        onChange={handleFileChange("fatherPhoto")}
      />

      <FileUpload
        label="Mother's Photo"
        name="motherPhoto"
        file={getFileObject("motherPhoto")}
        fileUrl={getFileUrl("motherPhoto")}
        error={errors.motherPhoto}
        onChange={handleFileChange("motherPhoto")}
      />

      <FileUpload
        label="10th Mark Sheet"
        name="tenthMarkSheet"
        file={getFileObject("tenthMarkSheet")}
        fileUrl={getFileUrl("tenthMarkSheet")}
        error={errors.tenthMarkSheet}
        onChange={handleSingleFileChange("tenthMarkSheet")}
      />

      <FileUpload
        label="11th Mark Sheet"
        name="eleventhMarkSheet"
        file={getFileObject("eleventhMarkSheet")}
        fileUrl={getFileUrl("eleventhMarkSheet")}
        error={errors.eleventhMarkSheet}
        onChange={handleSingleFileChange("eleventhMarkSheet")}
      />

      <FileUpload
        label="12th Mark Sheet"
        name="twelthMarkSheet"
        file={getFileObject("twelthMarkSheet")}
        fileUrl={getFileUrl("twelthMarkSheet")}
        error={errors.twelthMarkSheet}
        onChange={handleSingleFileChange("twelthMarkSheet")}
      />

      <FileUpload
        label="Transfer Certificate"
        name="transferCertificate"
        file={getFileObject("transferCertificate")}
        fileUrl={getFileUrl("transferCertificate")}
        error={errors.transferCertificate}
        onChange={handleSingleFileChange("transferCertificate")}
      />

      <FileUpload
        label="Community Certificate"
        name="communityCertificate"
        file={getFileObject("communityCertificate")}
        fileUrl={getFileUrl("communityCertificate")}
        error={errors.communityCertificate}
        onChange={handleSingleFileChange("communityCertificate")}
      />

      <FileUpload
        label="Income Certificate"
        name="incomeCertificate"
        file={getFileObject("incomeCertificate")}
        fileUrl={getFileUrl("incomeCertificate")}
        error={errors.incomeCertificate}
        onChange={handleSingleFileChange("incomeCertificate")}
      />

      <FileUpload
        label="Aadhar Copy"
        name="aadharCopy"
        file={getFileObject("aadharCopy")}
        fileUrl={getFileUrl("aadharCopy")}
        error={errors.aadharCopy}
        onChange={handleSingleFileChange("aadharCopy")}
      />

      {(data.nationality !== "Indian" || data.permanentAddress?.state !== "Tamil Nadu") && (
        <FileUpload
          label="Migration Certificate"
          name="migrationCertificate"
          file={getFileObject("migrationCertificate")}
          fileUrl={getFileUrl("migrationCertificate")}
          error={errors.migrationCertificate}
          onChange={handleSingleFileChange("migrationCertificate")}
        />
      )}

      {data.quota === "Government Quota" && (
        <>
          <FileUpload
            label="Allotment Order"
            name="allotmentOrder"
            file={getFileObject("allotmentOrder")}
            fileUrl={getFileUrl("allotmentOrder")}
            error={errors.allotmentOrder}
            onChange={handleSingleFileChange("allotmentOrder")}
          />
          <FileUpload
            label="Declaration Form"
            name="declarationForm"
            file={getFileObject("declarationForm")}
            fileUrl={getFileUrl("declarationForm")}
            error={errors.declarationForm}
            onChange={handleSingleFileChange("declarationForm")}
          />
          <FileUpload
            label="Physical Fitness Form"
            name="physicalFitnessForm"
            file={getFileObject("physicalFitnessForm")}
            fileUrl={getFileUrl("physicalFitnessForm")}
            error={errors.physicalFitnessForm}
            onChange={handleSingleFileChange("physicalFitnessForm")}
          />
        </>
      )}

      {data.isFirstGraduate && (
        <FileUpload
          label="First Graduate Certificate"
          name="firstGraduateCertificate"
          file={getFileObject("firstGraduateCertificate")}
          fileUrl={getFileUrl("firstGraduateCertificate")}
          error={errors.firstGraduateCertificate}
          onChange={handleSingleFileChange("firstGraduateCertificate")}
        />
      )}
    </div>
  );
};

export default DocumentsStep;
