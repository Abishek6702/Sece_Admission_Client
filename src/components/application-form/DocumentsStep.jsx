import React, { useRef } from "react";
import { UploadCloud, X } from "lucide-react";

const FileUpload = ({ label, file, error, onChange }) => {
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    onChange(selectedFile);
  };

  const handleRemove = () => {
    onChange(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div>
      <label className="font-semibold mb-1 block text-[#282526]">{label} <span className="text-red-600">*</span></label>
      {file ? (
        <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white  ">
          <span className="truncate">{file.name}</span>
          <button
            type="button"
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
          className={`flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#0B56A4] transition `}
        >
          <UploadCloud size={36} className="text-gray-400 mb-2" />
          <p className="text-gray-500 text-sm text-center">
            Drag & drop your file here
          </p>
          <p className="text-gray-400 text-xs mt-1">
            JPEG, PNG, PDF, MP4, up to 5 MB
          </p>
        </div>
      )}
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

const DocumentsStep = ({ data = {}, errors = {}, onChange = () => {} }) => {
  const handleFileChange = (key) => (file) => {
    onChange(key, file ? [file] : []);
  };

  const handleSingleFileChange = (key) => (file) => {
    onChange(key, file ? [file] : []);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[64vh] pr-6 overflow-auto custom-scroll">
      <FileUpload
        label="Student Photo"
        file={data.studentPhoto?.[0] || null}
        error={errors.studentPhoto}
        onChange={handleFileChange("studentPhoto")}
      />

      <FileUpload
        label="Father's Photo"
        file={data.fatherPhoto?.[0] || null}
        error={errors.fatherPhoto}
        onChange={handleFileChange("fatherPhoto")}
      />

      <FileUpload
        label="Mother's Photo"
        file={data.motherPhoto?.[0] || null}
        error={errors.motherPhoto}
        onChange={handleFileChange("motherPhoto")}
      />

      <FileUpload
        label="10th Mark Sheet"
        file={data.tenthMarkSheet?.[0] || null}
        error={errors.tenthMarkSheet}
        onChange={handleSingleFileChange("tenthMarkSheet")}
      />

      <FileUpload
        label="11th Mark Sheet"
        file={data.eleventhMarkSheet?.[0] || null}
        error={errors.eleventhMarkSheet}
        onChange={handleSingleFileChange("eleventhMarkSheet")}
      />

      <FileUpload
        label="12th Mark Sheet"
        file={data.twelthMarkSheet?.[0] || null}
        error={errors.twelthMarkSheet}
        onChange={handleSingleFileChange("twelthMarkSheet")}
      />

      <FileUpload
        label="Transfer Certificate"
        file={data.transferCertificate?.[0] || null}
        error={errors.transferCertificate}
        onChange={handleSingleFileChange("transferCertificate")}
      />

      <FileUpload
        label="Community Certificate"
        file={data.communityCertificate?.[0] || null}
        error={errors.communityCertificate}
        onChange={handleSingleFileChange("communityCertificate")}
      />

      <FileUpload
        label="Income Certificate"
        file={data.incomeCertificate?.[0] || null}
        error={errors.incomeCertificate}
        onChange={handleSingleFileChange("incomeCertificate")}
      />

      <FileUpload
        label="Aadhar Copy"
        file={data.aadharCopy?.[0] || null}
        error={errors.aadharCopy}
        onChange={handleSingleFileChange("aadharCopy")}
      />

      {(data.nationality !== "Indian" ||
        data.permanentAddress.state !== "Tamil Nadu") && (
        <FileUpload
          label="Migration Certificate"
          file={data.migrationCertificate?.[0] || null}
          error={errors.migrationCertificate}
          onChange={handleSingleFileChange("migrationCertificate")}
        />
      )}

      {data.quota === "Government Quota" && (
        <>
          <FileUpload
            label="Allotment Order"
            file={data.allotmentOrder?.[0] || null}
            error={errors.allotmentOrder}
            onChange={handleSingleFileChange("allotmentOrder")}
          />
          <FileUpload
            label="Declaration Form"
            file={data.declarationForm?.[0] || null}
            error={errors.declarationForm}
            onChange={handleSingleFileChange("declarationForm")}
          />
          <FileUpload
            label="Physical Fitness Form"
            file={data.physicalFitnessForm?.[0] || null}
            error={errors.physicalFitnessForm}
            onChange={handleSingleFileChange("physicalFitnessForm")}
          />
        </>
      )}

      {data.isFirstGraduate && (
        <FileUpload
          label="First Graduate Certificate"
          file={data.firstGraduateCertificate?.[0] || null}
          error={errors.firstGraduateCertificate}
          onChange={handleSingleFileChange("firstGraduateCertificate")}
        />
      )}
    </div>
  );
};

export default DocumentsStep;
