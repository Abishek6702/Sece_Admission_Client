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
const initialData = {
  courseEntryType: "",
  studentName: "",
  gender: "",
  preferredCourse: "",
  quota: "",
  permanentAddress: {
    doorNo: "",
    street: "",
    taluk: "",
    district: "",
    state: "",
    pincode: "",
  },
  temporaryAddress: {
    doorNo: "",
    street: "",
    taluk: "",
    district: "",
    state: "",
    pincode: "",
  },
  dob: "",
  community: "",
  casteName: "",
  communityCertificateNo: "",
  motherTongue: "",
  religion: "",
  nationality: "",
  bloodGroup: "",
  aadharNo: "",
  selfMobileNo: "",
  selfWhatsapp: "",
  selfEmail: "",
  insuranceNominee: "",
  hostelDayScholar: "",
  emisNo: "",
  siblingsStudyingHere: false,
  siblingDetails: {
    name: "",
    rollNo: "",
    department: "",
    yearOfAdmission: "",
  },
  careerOption: "",
  father: {
    name: "",
    qualification: "",
    workType: "",
    organizationName: "",
    designation: "",
    annualIncome: 0,
    mobile: "",
    whatsapp: "",
    email: "",
  },
  mother: {
    name: "",
    qualification: "",
    workType: "",
    organizationName: "",
    designation: "",
    annualIncome: 0,
    mobile: "",
    whatsapp: "",
    email: "",
  },
  guardian: {
    name: "",
    mobile: "",
  },
  familyIncomeAsPerCertificate: 0,
  incomeCertificateNo: "",
  counsellingApplicationNo: "",
  counsellingOverallRank: "",
  counsellingCommunityRank: "",
  isFirstGraduate: false,
  firstGraduateNumber: "",
  studentPhoto: [],
  fatherPhoto: [],
  motherPhoto: [],
  tenthMarkSheet: "",
  eleventhMarkSheet: "",
  twelthMarkSheet: "",
  transferCertificate: "",
  communityCertificate: "",
  incomeCertificate: "",
  migrationCertificate: "",
  aadharCopy: "",
  allotmentOrder: "",
  firstGraduateCertificate: "",
  declarationForm: "",
  physicalFitnessForm: "",
};
function validate(data, step) {
  return {}; // skip all validation for now
}

const ApplicationEditAdmin = ({ initialData, open, setOpen }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
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
      setApplicationId(id); // ✅ Correct usage of setState
      console.log("params set from id:", id);
    }
  }, [id]);

  useEffect(() => {
    if (applicationId) {
      // Fetch application data
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
          console.log("data from ak",applicationData.data);
          setData(applicationData.data); // Update form state with fetched data
        } catch (error) {
          console.error(error);
          alert("Error loading application data");
        }
      };

      fetchApplicationData();
    }
  }, [applicationId]);
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
          //   formData.append("userId", userId);

          // Append regular fields
          for (const key in data) {
            // Skip remarks entirely
            if (key === "remarks") continue;

            const value = data[key];

            if (Array.isArray(value)) {
              // For files or arrays of primitives
              value.forEach((item) => formData.append(key, item));
            } else if (typeof value === "object" && value !== null) {
              // Nested object, convert to JSON string
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, value);
            }
          }

          // Send POST request
          // const response = await fetch(
          //   `${
          //     import.meta.env.VITE_API_BASE_URL
          //   }/api/application/${applicationId}/resubmit`,
          //   {
          //     method: "PUT",
          //     body: formData,
          //   }
          // );

          const result = await response.json();

          if (!response.ok) {
            console.error("Error:", result.message);
            alert(result.message);
          } else {
            toast.success(`Remark Submitted Sucessfully`, {
              onClose: () => window.location.reload(),
            });
            // console.log("Success:", result);
            // navigate("/dashboard");
          }
        } catch (err) {
          console.error("Submission failed", err);
          alert("Submission failed. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex justify-between items-center  w-full">
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
                {loading ? "Submitting..." : "Next Step"}
              </button>
            )}

            {/* Only show Complete Submission button if NOT disabled */}
            {step === 5  && (
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#0B56A4] text-white"
                }`}
              >
                {loading ? "Submitting..." : "Complete Submission"}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ApplicationEditAdmin;
