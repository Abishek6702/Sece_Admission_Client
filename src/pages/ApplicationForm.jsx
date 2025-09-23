import React from "react";
import { ApplicationSidebar } from "../components/application-form/ApplicationSidebar";
import ApplicationFormData from "../components/application-form/ApplicationFormData";

const ApplicationForm = () => {
  return (
    <div className="main_conatiner w-full h-[100vh] flex items-center bg-white ">
      <div className="relative static-section bg-[#f6f6f6] w-[25%] h-full hidden lg:block ">
        <ApplicationSidebar />
      </div>
      <div className="dynamic-section  h-full lg:w-[75%]  w-full p-6 ">
        <ApplicationFormData/>
      </div>
    </div>
  );
};

export default ApplicationForm;
