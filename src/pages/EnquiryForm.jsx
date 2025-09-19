import React from "react";
import { EnquirySideBar } from "../components/enquiry/EnquirySideBar";
import EnquiryFormData from "../components/enquiry/EnquiryFormData";

const EnquiryForm = () => {
  return (
    <>
      <div className="main_conatiner w-full h-[100vh] flex items-center bg-white ">
        <div className="relative static-section bg-[#f6f6f6] w-[25%] h-full hidden lg:block ">
          <EnquirySideBar />
        </div>
        <div className="dynamic-section  h-full lg:w-[75%]  w-full p-6 ">
          <EnquiryFormData />
        </div>
      </div>
    </>
  );
};

export default EnquiryForm;
