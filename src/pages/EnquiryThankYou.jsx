import React from "react";
import thank from "../assets/thank.svg";
const EnquiryThankYou = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className=" w-[90%] h-[90vh]  md:flex items-center">
          <div className=" imgae-container  md:w-[50%] h-full flex items-center justify-center ">
            <img src={thank} alt="" className="md:w-[75%] m-auto" />
          </div>
          <div className=" md:w-[50%] h-full md:flex items-center justify-center">
            <div className="">
              <h1 className="playfair text-3xl font-bold text-[#0B56A4] text-center">
                Thank You for Submitting !{" "}
              </h1>
              <p className="text-center mt-2 text-[#282526] leading-loose">
                <span className="text-[#0B56A4]">
                  Sri Eshwar Admission Enquiry{" "}
                </span>{" "}
                Form has been successfully submitted. A copy of your form has
                been sent to your email for your future reference. Our team will
                review your submission and get back to you as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnquiryThankYou;
