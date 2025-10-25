import React, { useState, useEffect } from "react";
import Stepper from "../enquiry/Stepper";
import PersonalInfoStep from "../enquiry/PersonalInfoStep";
import EducationDetailStep from "../enquiry/EducationDetailStep";
import CourseDataStep from "../enquiry/CourseDataStep";
import logo from "../../assets/sece-logo.svg";
import { ArrowLeft, X } from "lucide-react";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const titles = [
  {
    heading: "Personal Details",
    description: "Provide your basic personal information.",
  },
  {
    heading: "Educational Details",
    description: "Share your academic qualifications and history.",
  },
  {
    heading: "Course Preferences",
    description: "Choose the courses you wish to pursue.",
  },
];

const initialData = {
  studentName: "",
  dob: "",
  fatherName: "",
  motherName: "",
  isFirstGraduate: false,
  gender: "",
  address: {
    doorNo: "",
    street: "",
    taluk: "",
    district: "",
    state: "",
    pincode: "",
  },
  community: "",
  courseRequired: [],
  twelfthSchoolName: "",
  twelfthSchoolAddress: "",
  twelfthSchoolBoard: "",
  tenthSchoolBoard: "",
  tenthMarks: "",
  twelfthRegisterNo: "",
  twelfthMarks: {
    maths: "",
    physics: "",
    chemistry: "",
    vocationalIfAny: "",
    total: "",
    cutOff: "",
  },
  studentEmail: "",
  studentMobile: "",
  fatherEmail: "",
  fatherMobile: "",
  motherEmail: "",
  motherMobile: "",
  dateOfVisit: new Date().toISOString().split("T")[0],
  signature: "",
  confirmation: "",
  courseEntryType: "",
};

function validate(data, step) {
  return {};
}

export default function EnquiryEditAdmin({open, setOpen}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [enquiryId, setEnquiryId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // ✅ Get ID from URL params
  const selectedOption = location.state?.selectedOption;
  const [linkedin, setLinkedin] = useState("");
  const [linkedinError, setLinkedinError] = useState("");

  console.log("Selected Option from location.state:", selectedOption);

  // ✅ Fetch enquiry data on component mount
  useEffect(() => {
    if (id) {
      setEnquiryId(id);
      console.log("Enquiry ID from params:", id);
    }
  }, [id]);

  useEffect(() => {
    if (enquiryId) {
      fetchEnquiryData();
    }
  }, [enquiryId]);

  // ✅ Fetch enquiry data from backend
  const fetchEnquiryData = async () => {
    try {
      setFetchLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/enquiries/${enquiryId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch enquiry data");
      }

      const enquiryData = await response.json();
      console.log("Fetched enquiry data:", enquiryData);

      // ✅ Clean the fetched data
      const cleanedData = cleanEnquiryData(enquiryData);
      console.log("Cleaned enquiry data:", cleanedData);

      setData(cleanedData);
    } catch (error) {
      console.error(error);
      toast.error("Error loading enquiry data");
    } finally {
      setFetchLoading(false);
    }
  };

  // ✅ Helper function to clean fetched data
  const cleanEnquiryData = (fetchedData) => {
    const cleaned = { ...fetchedData };

    // Remove metadata fields
    delete cleaned._id;
    delete cleaned.__v;
    delete cleaned.createdAt;
    delete cleaned.updatedAt;
    delete cleaned.enquiryPdfUrl;
    delete cleaned.status;

    // ✅ Remove _id from nested objects if present
    if (cleaned.address && cleaned.address._id) {
      delete cleaned.address._id;
    }
    if (cleaned.twelfthMarks && cleaned.twelfthMarks._id) {
      delete cleaned.twelfthMarks._id;
    }
    if (cleaned.dob) {
      cleaned.dob = new Date(cleaned.dob).toISOString().split("T")[0];
    }

    // ✅ Ensure nested objects have all required fields
    cleaned.address = {
      doorNo: cleaned.address?.doorNo || "",
      street: cleaned.address?.street || "",
      taluk: cleaned.address?.taluk || "",
      district: cleaned.address?.district || "",
      state: cleaned.address?.state || "",
      pincode: cleaned.address?.pincode || "",
    };

    cleaned.twelfthMarks = {
      maths: cleaned.twelfthMarks?.maths || "",
      physics: cleaned.twelfthMarks?.physics || "",
      chemistry: cleaned.twelfthMarks?.chemistry || "",
      vocationalIfAny: cleaned.twelfthMarks?.vocationalIfAny || "",
      total: cleaned.twelfthMarks?.total || "",
      cutOff: cleaned.twelfthMarks?.cutOff || "",
    };

    return cleaned;
  };

  const handleChange = (name, value) => {
    if (name.includes(".")) {
      // For nested fields (address, twelfthMarks)
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
    const currentErrors = validate(data, step, linkedin);

    setErrors(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      if (step < 2) {
        setStep(step + 1);
        setErrors({});
      } else {
        // ✅ Final submission - Update enquiry
        const { confirmation, ...restData } = data;
        const payload = {
          ...restData,
          courseEntryType: selectedOption || restData.courseEntryType,
        };

        try {
          setLoading(true);

          // ✅ Send PUT request to update endpoint
          const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/enquiries/${enquiryId}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          );
          const responseData = await res.json();

          if (!res.ok)
            throw new Error(responseData.message || "Failed to update enquiry");

          toast.success("Enquiry updated successfully!");
          console.log("Updated PDF URL:", responseData.pdfUrl);

          // ✅ Navigate to success page or back to list
          navigate("/admin/enquiry_list", {
            state: { message: "Enquiry updated successfully" },
          });
        } catch (err) {
          console.log(err.message);
          toast.error(err.message || "Something went wrong!");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  // ✅ Show loading state while fetching
  if (fetchLoading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading enquiry data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto ">
      <img src={logo} alt="" className="w-40 mb-4 lg:hidden" />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold playfair">{titles[step].heading}</h2>
       <div className="flex items-center gap-4">
       <p className="">{selectedOption || data.courseEntryType}</p>
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
          <PersonalInfoStep
            data={data}
            errors={errors}
            onChange={handleChange}
          />
        )}
        {step === 1 && (
          <EducationDetailStep
            data={data}
            errors={errors}
            onChange={handleChange}
          />
        )}
        {step === 2 && (
          <CourseDataStep
            data={data}
            errors={errors}
            onChange={handleChange}
            linkedin={linkedin}
            setLinkedin={setLinkedin}
            linkedinError={errors.linkedin}
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
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0B56A4] text-white"
            }`}
          >
            {loading
              ? "Updating..."
              : step < 2
              ? "Next Step"
              : "Update Enquiry"}
          </button>
        </div>
      </form>
    </div>
  );
}
