import React, { useState } from "react";
import Stepper from "./Stepper";
import PersonalInfoStep from "./PersonalInfoStep";
import EducationDetailStep from "./EducationDetailStep";
import CourseDataStep from "./CourseDataStep";
import logo from "../../assets/sece-logo.svg";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
};
function validate(data,step){
  return{};
}

// function validate(data, step) {
//   const errors = {};
//   const mobileRegex = /^[1-9][0-9]{9}$/;
//   // Personal Info validation
//   if (step === 0) {
//     if (!data.studentName) errors.studentName = "Name is required";
//     if (!data.dob) errors.dob = "Date of birth required";
//     if (!data.gender) errors.gender = "Gender is required";
//     if (!data.fatherName) errors.fatherName = "Father name required";
//     if (!data.motherName) errors.motherName = "Mother name required";
//     if (!data.address.doorNo) errors.doorNo = "Door No required";
//     if (!data.address.street) errors.street = "Street required";
//     if (!data.address.taluk) errors.taluk = "Taluk required";
//     if (!data.address.district) errors.district = "District required";
//     if (!data.address.state) errors.state = "State required";
//     if (!data.address.pincode) errors.pincode = "Pincode required";
//     if (!data.community) errors.community = "Community required";
//     if (!data.studentEmail) errors.studentEmail = "Student Email required";
//     if (!data.studentMobile) {
//       errors.studentMobile = "Student Mobile required";
//     } else if (!mobileRegex.test(data.studentMobile)) {
//       errors.studentMobile =
//         "Enter a valid 10-digit mobile number (not starting with 0)";
//     }

//     if (!data.fatherMobile) {
//       errors.fatherMobile = "Father Mobile required";
//     } else if (!mobileRegex.test(data.fatherMobile)) {
//       errors.fatherMobile =
//         "Enter a valid 10-digit mobile number (not starting with 0)";
//     }

//     if (!data.motherMobile) {
//       errors.motherMobile = "Mother Mobile required";
//     } else if (!mobileRegex.test(data.motherMobile)) {
//       errors.motherMobile =
//         "Enter a valid 10-digit mobile number (not starting with 0)";
//     }
//   }
//   // Educational Details validation
//   if (step === 1) {
//     if (!data.twelfthSchoolName)
//       errors.twelfthSchoolName = "School name required";
//     if (!data.twelfthSchoolAddress)
//       errors.twelfthSchoolAddress = "School address required";
//     if (!data.twelfthSchoolBoard) errors.twelfthSchoolBoard = "Board required";
//     if (!data.twelfthRegisterNo)
//       errors.twelfthRegisterNo = "Register No required";
//     if (!data.twelfthMarks.maths) {
//       errors.maths = "Maths marks required";
//     } else if (
//       isNaN(data.twelfthMarks.maths) ||
//       data.twelfthMarks.maths > 100
//     ) {
//       errors.maths = "Should not exceed 100";
//     }

//     if (!data.twelfthMarks.physics) {
//       errors.physics = "Physics marks required";
//     } else if (
//       isNaN(data.twelfthMarks.physics) ||
//       data.twelfthMarks.physics > 100
//     ) {
//       errors.physics = "Should not exceed 100";
//     }

//     if (!data.twelfthMarks.chemistry) {
//       errors.chemistry = "Chemistry marks required";
//     } else if (
//       isNaN(data.twelfthMarks.chemistry) ||
//       data.twelfthMarks.chemistry > 100
//     ) {
//       errors.chemistry = "Should not exceed 100";
//     }

//     if (!data.twelfthMarks.total) {
//       errors.total = "Total required";
//     } else if (
//       isNaN(data.twelfthMarks.total > 600) ||
//       data.twelfthMarks.total > 600
//     ) {
//       errors.total = "Should not exceed 600";
//     }
//     if (!data.twelfthMarks.cutOff) {
//       errors.cutOff = "Cut Off required";
//     } else if (
//       isNaN(data.twelfthMarks.cutOff > 200) ||
//       data.twelfthMarks.cutOff > 200
//     ) {
//       errors.cutOff = "Should not exceed 200";
//     }
//     if (!data.tenthSchoolBoard) errors.tenthSchoolBoard = "10th Board required";
//     if (!data.tenthMarks) {
//       errors.tenthMarks = "10th marks required";
//     } else if (isNaN(data.tenthMarks > 500) || data.tenthMarks > 500) {
//       errors.tenthMarks = "Should not exceed 500";
//     }
//   }
//   // Course Preferences validation
//   if (step === 2) {
//     if (!data.courseRequired.length)
//       errors.courseRequired = "Select at least one course";
//     if (!data.signature) errors.signature = "Signature is required";
//     if (!data.confirmation)
//       errors.confirmation = "Please confirm all data are correct";
//   }

//   return errors;
// }

export default function EnquiryFormData() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    const currentErrors = validate(data, step);
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      if (step < 2) {
        setStep(step + 1);
        setErrors({});
      } else {
        const { confirmation, ...payload } = data;
        console.log("Data Submitted: ", payload);

        try {
          setLoading(true);

          const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/enquiries`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          );
          const responseData = await res.json();

          if (!res.ok)
            throw new Error(responseData.message || "Failed to submit enquiry");

          toast.success("Enquiry submitted successfully!");
          console.log(responseData.pdfUrl);
          navigate("/enquiry-thank-you");
        } catch (err) {
          console.log(err.message);
          toast.error(err.message || "Something went wrong!");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto ">
      <img src={logo} alt="" className="w-40 mb-4 lg:hidden" />
      <h2 className="text-2xl font-bold playfair">{titles[step].heading}</h2>
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
          <CourseDataStep data={data} errors={errors} onChange={handleChange} />
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
              ? "Submitting..."
              : step < 2
              ? "Next Step"
              : "Complete Submission"}
          </button>
        </div>
      </form>
    </div>
  );
}
