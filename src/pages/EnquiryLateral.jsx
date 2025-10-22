import React from "react";
import { useLocation } from "react-router-dom";

const EnquiryLateral = () => {
  const location = useLocation();
  const selectedOption = location.state?.selectedOption;
  console.log("Selected Option from location.state:", selectedOption);
  return <div>EnquiryLateral</div>;
};

export default EnquiryLateral;
