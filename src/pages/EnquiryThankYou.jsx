import React from "react";
import thank from "../assets/thank.svg";
import { useLocation } from "react-router-dom";
import { X, Download } from "lucide-react";

const EnquiryThankYou = () => {
  const location = useLocation();
  const pdfUrl = location.state?.pdfUrl;
  return (
    <>
      <div className="flex items-center justify-center md:min-h-screen">
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

              {pdfUrl ? (
                <div className="text-center space-y-4  ">
                  <p>Your enquiry PDF is ready</p>
                  <div className="flex justify-center">
                    <a
                      href={`${import.meta.env.VITE_API_BASE_URL}${pdfUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#0B56A4] text-center text-white font-semibold ml-1 rounded-xl flex items-center gap-2 w-fit"
                    >
                      Print <Download className="w-5"/>
                    </a>
                  </div>
                  {/* <iframe
                    src={`http://localhost:5000${pdfUrl}`}
                    width="100%"
                    height="600px"
                    title="Enquiry PDF Preview"
                  /> */}
                </div>
              ) : (
                <p className="text-center">No PDF available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnquiryThankYou;
