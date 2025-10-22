import React from 'react'
import { useLocation } from 'react-router-dom';

const EnquiryPg = () => {
     const location = useLocation();
  const selectedOption = location.state?.selectedOption;
  console.log("Selected Option from location.state:", selectedOption);
  return (
    <div>EnquiryPg</div>
  )
}

export default EnquiryPg