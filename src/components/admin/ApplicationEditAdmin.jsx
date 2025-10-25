import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Stepper from "../application-form/Stepper";
import PersonalDetailStep from "../application-form/PersonalDetailStep";
import PersonalContactStep from "../application-form/PersonalContactStep";
import EducationalStep from "../application-form/EducationalStep";
import ParentsDetailsStep from "../application-form/ParentsDetailsStep";
import AdditionalInformationStep from "../application-form/AdditionalInformationStep";
import DocumentsStep from "../application-form/DocumentsStep";
import { ArrowLeft, X } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const titles = [
  {
    heading: "Personal Details",
    description: "Provide your basic personal information",
  },
  {
    heading: "Personal Contact Details",
    description: "Provide your personal contact details",
  },
  {
    heading: "Education Details",
    description: "Furnish your educational details",
  },
  {
    heading: "Parents Details",
    description: "Provide Parents Details",
  },
  {
    heading: "Additional Information",
    description: "Provide all the below details.",
  },
  {
    heading: "Documents",
    description: "Furnish all the required documents with proper formatting",
  },
];

function validate(data, step) {
  return {}; // skip all validation for now
}

const ApplicationEditAdmin = ({ open, setOpen }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [applicationId, setApplicationId] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let userId = null;

  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.id;
  }

  useEffect(() => {
    if (id) {
      setApplicationId(id);
      console.log("params set from id:", id);
    }
  }, [id]);

  useEffect(() => {
    if (applicationId) {
      const fetchApplicationData = async () => {
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/application/${applicationId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch application data");
          }
          const applicationData = await response.json();
          console.log("Raw data from API:", applicationData.data);

          // ✅ Clean the fetched data before setting to state
          const cleanedData = cleanApplicationData(applicationData.data);
          console.log("Cleaned data for form:", cleanedData);

          setData(cleanedData);
        } catch (error) {
          console.error(error);
          toast.error("Error loading application data");
        }
      };

      fetchApplicationData();
    }
  }, [applicationId]);

  // In ApplicationEditAdmin.jsx

  // ✅ Update cleanApplicationData function
  const cleanApplicationData = (fetchedData) => {
    const cleaned = {};
  
    // List of fields to keep (all your form fields)
    const formFields = [
      "courseEntryType",
      "studentName",
      "gender",
      "preferredCourse",
      "Quota",
      "permanentAddress",
      "temporaryAddress",
      "dob",
      "community",
      "casteName",
      "communityCertificateNo",
      "motherTongue",
      "religion",
      "nationality",
      "bloodGroup",
      "aadharNo",
      "selfMobileNo",
      "selfWhatsapp",
      "selfEmail",
      "insuranceNominee",
      "hostelDayScholar",
      "emisNo",
      "siblingsStudyingHere",
      "siblingDetails",
      "careerOption",
      "father",
      "mother",
      "guardian",
      "familyIncomeAsPerCertificate",
      "incomeCertificateNo",
      "counsellingApplicationNo",
      "counsellingOverallRank",
      "counsellingCommunityRank",
      "isFirstGraduate",
      "firstGraduateNumber",
      "studentPhoto",
      "fatherPhoto",
      "motherPhoto",
      "tenthMarkSheet",
      "eleventhMarkSheet",
      "twelthMarkSheet",
      "transferCertificate",
      "communityCertificate",
      "incomeCertificate",
      "migrationCertificate",
      "aadharCopy",
      "allotmentOrder",
      "firstGraduateCertificate",
      "declarationForm",
      "physicalFitnessForm",
    ];
  
    // ✅ Nested object fields that need _id removed
    const nestedObjectFields = [
      'permanentAddress',
      'temporaryAddress',
      'siblingDetails',
      'father',
      'mother',
      'guardian'
    ];
  
    // Copy only form fields and clean nested objects
    formFields.forEach((field) => {
      if (fetchedData.hasOwnProperty(field)) {
        // ✅ Remove _id from nested objects
        if (nestedObjectFields.includes(field) && typeof fetchedData[field] === 'object' && fetchedData[field] !== null) {
          const cleanedNested = { ...fetchedData[field] };
          delete cleanedNested._id;
          cleaned[field] = cleanedNested;
        } else {
          cleaned[field] = fetchedData[field];
        }
      }
    });
  
    return cleaned;
  };
  

  const handleChange = (name, value) => {
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleStepSubmit = async (e) => {
    e.preventDefault();
    const currentErrors = validate(data, step);
    setErrors(currentErrors);
  
    if (Object.keys(currentErrors).length === 0) {
      if (step < 5) {
        setStep(step + 1);
        setErrors({});
      } else {
        setLoading(true);
        try {
          const formData = new FormData();
  
          // ✅ Track files to be deleted
          const filesToDelete = [];
  
          // List of file fields
          const singleFileFields = [
            'tenthMarkSheet',
            'eleventhMarkSheet',
            'twelthMarkSheet',
            'transferCertificate',
            'communityCertificate',
            'incomeCertificate',
            'migrationCertificate',
            'aadharCopy',
            'allotmentOrder',
            'firstGraduateCertificate',
            'declarationForm',
            'physicalFitnessForm'
          ];
  
          const multiFileFields = [
            'studentPhoto',
            'fatherPhoto',
            'motherPhoto'
          ];
  
          // ✅ Append all form data
          for (const key in data) {
            const value = data[key];
  
            // ✅ Handle new file uploads (File objects)
            if (value instanceof File) {
              formData.append(key, value);
            }
            // ✅ Handle photo arrays
            else if (Array.isArray(value)) {
              const hasFiles = value.some((item) => item instanceof File);
              if (hasFiles) {
                value.forEach((item) => {
                  if (item instanceof File) {
                    formData.append(key, item);
                  }
                });
              } else if (value.length === 0 && multiFileFields.includes(key)) {
                // ✅ Array is empty - mark for deletion
                filesToDelete.push(key);
              }
            }
            // ✅ Handle single file fields
            else if (singleFileFields.includes(key)) {
              if (value === '' || value === null || value === undefined) {
                // ✅ Field is empty - mark for deletion
                filesToDelete.push(key);
              }
              // If it's a string path, don't send it (keep existing)
            }
            // ✅ Handle nested objects
            else if (typeof value === "object" && value !== null) {
              formData.append(key, JSON.stringify(value));
            }
            // ✅ Handle regular fields
            else if (value !== "" && value !== null && value !== undefined) {
              formData.append(key, value);
            }
          }
  
          // ✅ Send list of files to delete
          if (filesToDelete.length > 0) {
            formData.append('filesToDelete', JSON.stringify(filesToDelete));
          }
  
          console.log("Files to delete:", filesToDelete);
          console.log("FormData being sent:");
          for (let pair of formData.entries()) {
            console.log(pair[0], ":", pair[1]);
          }
  
          const response = await fetch(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/application/${applicationId}`,
            {
              method: "PUT",
              body: formData,
            }
          );
  
          const result = await response.json();
  
          if (!response.ok) {
            console.error("Error:", result.message);
            toast.error(result.message || "Failed to update application");
          } else {
            toast.success("Application updated successfully!", {
              onClose: () => {
                setOpen(false);
                window.location.reload();
              },
            });
          }
        } catch (err) {
          console.error("Update failed", err);
          toast.error("Update failed. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    }
  };
  
console.log("data from back:",data)
  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-2xl font-bold playfair">
              {titles[step].heading}
            </h2>

            <div
              className="bg-gray-300 text-gray-700 cursor-pointer rounded-full p-1"
              onClick={() => setOpen(false)}
            >
              <X />
            </div>
          </div>
        </div>

        <p className="text-gray-500 mb-4">{titles[step].description}</p>

        <Stepper currentStep={step} />
        <form onSubmit={handleStepSubmit}>
          {step === 0 && (
            <PersonalDetailStep
              data={data}
              errors={errors}
              onChange={handleChange}
            />
          )}
          {step === 1 && (
            <PersonalContactStep
              data={data}
              errors={errors}
              onChange={handleChange}
            />
          )}
          {step === 2 && (
            <EducationalStep
              data={data}
              errors={errors}
              onChange={handleChange}
            />
          )}
          {step === 3 && (
            <ParentsDetailsStep
              data={data}
              errors={errors}
              onChange={handleChange}
            />
          )}
          {step === 4 && (
            <AdditionalInformationStep
              data={data}
              errors={errors}
              onChange={handleChange}
            />
          )}
          {step === 5 && (
            <DocumentsStep
              data={data}
              errors={errors}
              onChange={handleChange}
            />
          )}

          <div className="flex justify-end gap-4 mt-8">
            {step > 0 && (
              <button
                type="button"
                className="text-gray-700 px-4 py-2 flex items-center justify-center gap-2 rounded-lg bg-gray-200"
                onClick={() => setStep(step - 1)}
                disabled={loading}
              >
                <ArrowLeft />
                Back
              </button>
            )}

            {step < 5 && (
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#0B56A4] text-white"
                }`}
              >
                {loading ? "Processing..." : "Next Step"}
              </button>
            )}

            {step === 5 && (
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#0B56A4] text-white"
                }`}
              >
                {loading ? "Updating..." : "Update Application"}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ApplicationEditAdmin;
