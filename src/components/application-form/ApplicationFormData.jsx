import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "./Stepper";
import PersonalDetailStep from "../application-form/PersonalDetailStep";
import PersonalContactStep from "../application-form/PersonalContactStep";
import EducationalStep from "../application-form/EducationalStep";
import ParentsDetailsStep from "../application-form/ParentsDetailsStep";
import AdditionalInformationStep from "../application-form/AdditionalInformationStep";
import DocumentsStep from "../application-form/DocumentsStep";
import { ArrowLeft } from "lucide-react";
import { jwtDecode } from "jwt-decode";

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

// function validate(data, step) {
//   const errors = {};
//   const mobileRegex = /^[1-9][0-9]{9}$/;
//   //personal details step
//   if (step === 0) {
//     if (!data.studentName) errors.studentName = "Name is required";
//     if (!data.gender) errors.gender = "Gender is required";
//     if (!data.dob) errors.dob = "Date of birth is required";
//     if (!data.community) errors.community = "Community is required";
//     if (!data.casteName) errors.casteName = "CasteName is required";
//     if (!data.communityCertificateNo)
//       errors.communityCertificateNo =
//         "Community certificate number is required";
//     if (!data.motherTongue) errors.motherTongue = "Mother tounge is important";
//     if (!data.religion) errors.religion = "Religion is required";
//     if (!data.nationality) errors.nationality = "Nationality is required";
//     if (!data.bloodGroup) errors.bloodGroup = "Blood Group is required";
//     if (!data.aadharNo) errors.aadharNo = "Aadhaar number is important";
//   }
//   // personal contact details
//   if (step === 1) {
//     if (!data.permanentAddress.doorNo)
//       errors.permanentdoorNo = "Door No required";
//     if (!data.permanentAddress.street)
//       errors.permanentstreet = "Street required";
//     if (!data.permanentAddress.taluk) errors.permanenttaluk = "Taluk required";
//     if (!data.permanentAddress.district)
//       errors.permanentdistrict = "District required";
//     if (!data.permanentAddress.state) errors.permanentstate = "State required";
//     if (!data.permanentAddress.pincode)
//       errors.permanentpincode = "Pincode required";

//     if (!data.temporaryAddress.doorNo) errors.doorNo = "Door No required";
//     if (!data.temporaryAddress.street) errors.street = "Street required";
//     if (!data.temporaryAddress.taluk) errors.taluk = "Taluk required";
//     if (!data.temporaryAddress.district) errors.district = "District required";
//     if (!data.temporaryAddress.state) errors.state = "State required";
//     if (!data.temporaryAddress.pincode) errors.pincode = "Pincode required";

//     if (!data.selfEmail) errors.selfEmail = "Email is required";
//     if (!data.selfMobileNo) {
//       errors.selfMobileNo = "Mobile number is required";
//     } else if (!mobileRegex.test(data.selfMobileNo)) {
//       errors.selfMobileNo =
//         "Enter a valid 10-digit mobile number (not starting with 0)";
//     }
//     if (!data.selfWhatsapp) {
//       errors.selfWhatsapp = "Whatsapp number is required";
//     } else if (!mobileRegex.test(data.selfWhatsapp)) {
//       errors.selfWhatsapp =
//         "Enter a valid 10-digit Whatsapp number (not starting with 0)";
//     }
//   }
//   // educational details
//   if (step === 2) {
//     if (!data.courseEntryType)
//       errors.courseEntryType = "Course Entry Type is required";
//     if (!data.preferredCourse)
//       errors.preferredCourse = "Course Prefered is required";
//     // if (!data.insuranceNominee)
//     //   errors.insuranceNominee = "Insurance Nominee is required";
//     if (!data.hostelDayScholar)
//       errors.hostelDayScholar = " Mode of Stay is required";
//     if (!data.emisNo) errors.emisNo = "Emis No is required";
//     // if (!data.siblingsStudyingHere) {
//     //   errors.siblingsStudyingHere = "Sibling details is required";
//     // }

//     // if (data.siblingsStudyingHere === true) {
//     //   // errors.siblingDetails = {};
//     //   if (!data.siblingDetails.name) {
//     //     errors.siblingDetails.name = "Sibling name is required";
//     //   }
//     //   if (!data.siblingDetails.rollNo) {
//     //     errors.siblingDetails.rollNo = "Sibling roll no is required";
//     //   }
//     //   if (!data.siblingDetails.department) {
//     //     errors.siblingDetails.department = "Sibling department is required";
//     //   }
//     //   if (!data.siblingDetails.yearOfAdmission) {
//     //     errors.siblingDetails.yearOfAdmission =
//     //       "Sibling year of admission is required";
//     //   }
//     // }

//     if (!data.careerOption) errors.careerOption = "Carrer option is required";
//   }
//   // parents details
//   if (step === 3) {
//     // Father validation
//     if (!data.father.name) errors.fatherName = "Father's name is required";
//     if (!data.father.qualification)
//       errors.fatherQualification = "Father's qualification is required";
//     if (!data.father.workType)
//       errors.fatherWorkType = "Father's work type is required";
//     // if (!data.father.organizationName)
//     //   errors.fatherOrganization = "Father's organization name is required";
//     // if (!data.father.designation)
//     //   errors.fatherDesignation = "Father's designation is required";
//     if (!data.father.annualIncome)
//       errors.fatherIncome = "Father's annual income is required";
//     if (!data.father.mobile) {
//       errors.fatherMobile = "Father's mobile is required";
//     } else if (!mobileRegex.test(data.father.mobile)) {
//       errors.fatherMobile =
//         "Enter a valid 10-digit mobile number for Father (not starting with 0)";
//     }

//     // Mother validation
//     if (!data.mother.name) errors.motherName = "Mother's name is required";
//     if (!data.mother.qualification)
//       errors.motherQualification = "Mother's qualification is required";
//     if (!data.mother.workType)
//       errors.motherWorkType = "Mother's work type is required";
//     // if (!data.mother.organizationName)
//     //   errors.motherOrganization = "Mother's organization name is required";
//     // if (!data.mother.designation)
//     //   errors.motherDesignation = "Mother's designation is required";
//     if (!data.mother.annualIncome)
//       errors.motherIncome = "Mother's annual income is required";
//     if (!data.mother.mobile) {
//       errors.motherMobile = "Mother's mobile is required";
//     } else if (!mobileRegex.test(data.mother.mobile)) {
//       errors.motherMobile =
//         "Enter a valid 10-digit mobile number for Mother (not starting with 0)";
//     }
//   }
//   // Additional Infromation
//   if (step === 4) {
//     if (!data.quota) {
//       errors.quota = "Quota selection is required";
//     }

//     if (!data.familyIncomeAsPerCertificate) {
//       errors.familyIncomeAsPerCertificate =
//         "Family income (as per certificate) is required";
//     }

//     if (!data.incomeCertificateNo) {
//       errors.incomeCertificateNo = "Income certificate number is required";
//     }

//     // Conditional for Government Quota
//     if (data.quota === "Government Quota") {
//       if (!data.counsellingApplicationNo) {
//         errors.counsellingApplicationNo =
//           "Counselling application number is required";
//       }
//       if (!data.counsellingOverallRank) {
//         errors.counsellingOverallRank = "Counselling overall rank is required";
//       }
//       if (!data.counsellingCommunityRank) {
//         errors.counsellingCommunityRank =
//           "Counselling community rank is required";
//       }

//       // Conditional for First Graduate
//       if (data.isFirstGraduate && !data.firstGraduateNumber) {
//         errors.firstGraduateNumber =
//           "First Graduate Certificate Number is required";
//       }
//     }
//   }
//   // Student documents
//   if (step === 5) {
//     if (!data.studentPhoto || data.studentPhoto.length === 0)
//       errors.studentPhoto = "Student photo is required";
//     if (!data.fatherPhoto || data.fatherPhoto.length === 0)
//       errors.fatherPhoto = "Father's photo is required";
//     if (!data.motherPhoto || data.motherPhoto.length === 0)
//       errors.motherPhoto = "Mother's photo is required";

//     if (!data.tenthMarkSheet)
//       errors.tenthMarkSheet = "10th Mark Sheet is required";
//     if (!data.eleventhMarkSheet)
//       errors.eleventhMarkSheet = "11th Mark Sheet is required";
//     if (!data.twelthMarkSheet)
//       errors.twelthMarkSheet = "12th Mark Sheet is required";
//     if (!data.transferCertificate)
//       errors.transferCertificate = "Transfer Certificate is required";

//     if (data.quota === "Government Quota") {
//       if (!data.allotmentOrder)
//         errors.allotmentOrder = "Allotment Order is required";
//       if (!data.declarationForm)
//         errors.declarationForm = "Declaration Form is required";
//       if (!data.physicalFitnessForm)
//         errors.physicalFitnessForm = "Physical Fitness Form is required";
//     }
//     if (!data.communityCertificate)
//       errors.communityCertificate = "Community Certificate is required";
//     if (!data.incomeCertificate)
//       errors.incomeCertificate = "Income Certificate is required";

//     if (!data.aadharCopy) errors.aadharCopy = "Aadhar copy is required";

//     // if (
//     //   data.nationality !== "India" ||
//     //   data.permanentAddress.state !== "Tamil Nadu"
//     // ) {
//     //   if (!data.migrationCertificate)
//     //     errors.migrationCertificate = "Migration Certificate is required";
//     // }

//     if (data.isFirstGraduate) {
//       if (!data.firstGraduateCertificate)
//         errors.firstGraduateCertificate =
//           "First Graduate Certificate is required";
//     }
//   }
//   return errors;
// }
const ApplicationFormData = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let userId = null;

  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.id;
  }

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
      if (step < 5) {
        setStep(step + 1);
        setErrors({});
      } else {
        setLoading(true);
        try {
          const formData = new FormData();
          formData.append("userId", userId);

          // Append regular fields
          for (const key in data) {
            const value = data[key];
            if (
              typeof value === "object" &&
              !Array.isArray(value) &&
              value !== null
            ) {
              // Nested objects (like father, mother, addresses)
              for (const subKey in value) {
                formData.append(`${key}.${subKey}`, value[subKey]);
              }
            } else if (Array.isArray(value)) {
              // For file arrays
              value.forEach((file) => formData.append(key, file));
            } else {
              formData.append(key, value);
            }
          }

          // Send POST request
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/application/`,
            {
              method: "POST",
              body: formData,
            }
          );

          const result = await response.json();

          if (!response.ok) {
            console.error("Error:", result.message);
            alert(result.message);
          } else {
            console.log("Success:", result);
            navigate("/application-thank-you");
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
      <div className="max-w-4xl mx-auto ">
        <h2 className="text-2xl font-bold playfair">{titles[step].heading}</h2>
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
                : step < 5
                ? "Next Step"
                : "Complete Submission"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ApplicationFormData;
