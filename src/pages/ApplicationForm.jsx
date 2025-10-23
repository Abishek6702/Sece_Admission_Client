import React, { useEffect, useState } from "react";
import { ApplicationSidebar } from "../components/application-form/ApplicationSidebar";
import ApplicationFormData from "../components/application-form/ApplicationFormData";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ApplicationForm = () => {
  const naviagte = useNavigate();
  const [fetchingInitial, setFetchingInitial] = useState(true);
  const [enquiryData, setEnquiryData] = useState(null);
  const token = localStorage.getItem("token");
  let userId = null;
  let enquiryId = null;

  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.id;
    enquiryId = decoded.enquiry;
  }
  console.log("EnquiryID:", enquiryId);

  useEffect(() => {
    async function fetchInitialData() {
      if (!enquiryId) {
        setFetchingInitial(false);
        return;
      }
      setFetchingInitial(true);
      try {
        const resp = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/enquiries/${enquiryId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await resp.json();

        if (resp.ok && result) {
          // Filter only selected fields for prefill
          const filteredInitial = {
            studentName: result.studentName || "",
            gender: result.gender || "",
            dob: result.dob || "",
            community: result.community || "",
            permanentAddress: {
              doorNo: result.address?.doorNo || "",
              street: result.address?.street || "",
              taluk: result.address?.taluk || "",
              district: result.address?.district || "",
              state: result.address?.state || "",
              pincode: result.address?.pincode || "",
            },
            temporaryAddress: {
              doorNo: result.address?.doorNo || "",
              street: result.address?.street || "",
              taluk: result.address?.taluk || "",
              district: result.address?.district || "",
              state: result.address?.state || "",
              pincode: result.address?.pincode || "",
            },
            selfEmail: result.studentEmail || "",
            selfMobileNo: result.studentMobile || "",
            selfWhatsapp: result.studentMobile || "",
            courseEntryType: result.courseEntryType || "",
            preferredCourse: result.finalizedCourse || "",
            finalizedCourse: result.finalizedCourse || "",
            quota: result.allocatedQuota || "",
          };
          setEnquiryData(filteredInitial);
        }
      } catch (err) {
        console.error("Failed to load enquiry data", err);
        setEnquiryData(null);
      }
      setFetchingInitial(false);
    }
    fetchInitialData();
  }, [enquiryId, token]);
  console.log("EnquiryData:", fetchingInitial);

  return (
    <div className="main_conatiner w-full h-[100vh] flex items-center bg-white ">
      <div className="relative static-section bg-[#f6f6f6] w-[25%] h-full hidden lg:block ">
        <ApplicationSidebar />
      </div>
      <div className="dynamic-section  h-full lg:w-[75%]  w-full p-6 ">
        <ApplicationFormData initialData={enquiryData} />
      </div>
    </div>
  );
};

export default ApplicationForm;
