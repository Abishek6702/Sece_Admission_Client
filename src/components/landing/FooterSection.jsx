import React from "react";
import logo from "../../assets/sece-logo.svg";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
const FooterSection = () => {
  return (
    <>
      <div className="w-full py-4 bg-[#f6f6f636]  text-gray-300  ">
        <div className="head m-auto text-center">
          <img src={logo} alt="" className="w-30 m-auto" />
          <h1 className="playfair text-2xl text-[#0B56A4] font-bold mt-4">
            Sri Eshwar Admission Portal
          </h1>
        </div>
        <p className="w-[50%] m-auto text-center text-gray-600 mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
        <div className="icon flex items-center justify-center gap-4 mt-4 text-white">
          <div className="rounded-full p-2 bg-[#0b56a4] cursor-pointer">
            <Facebook/>
          </div>
          <div className="rounded-full p-2 bg-[#0b56a4] cursor-pointer">
            <Instagram />
          </div>
          <div className="rounded-full p-2 bg-[#0b56a4] cursor-pointer">
            <Youtube />
          </div>
          <div className="rounded-full p-2 bg-[#0b56a4] cursor-pointer">
            <Twitter />
          </div>
        </div>
        <div className="w-[100%]  border-t border-gray-300  mt-5"></div>
        <p className="text-center mt-3 text-gray-800">
          © 2025 Sri Eshwar Admission Portal. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default FooterSection;
