
import React from 'react'
import logo from "../../assets/sece-logo.svg";
import illustrate from "../../assets/application-img.svg";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
export const ApplicationSidebar = () => {
  return (
    <>
     <div className="image-container absolute top-0  p-4">
            <img src={logo} alt="" className="w-40" />
          </div>
          <div className="flex flex-col items-center justify-center text-center h-full px-4">
            <h1 className="text-xl font-bold playfair text-[#282526]">
              SECE Admission Application Details
            </h1>
            <p className="text-sm leading-6 mt-2 roboto text-[#646464]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
              voluptas non neque est,
            </p>
            <img src={illustrate} alt="" className="mt-8 w-60" />
          </div>
          <div className="mt-4 absolute bottom-6 p-2 w-[70%]">
            <div className="social-media flex justify-evenly text-white p-2">
              <Youtube className="w-8 h-8 bg-[#0B56A4] hover:text-white rounded-full p-2 transition duration-200 ease-in-out cursor-pointer" />
              <Instagram className="w-8 h-8 bg-[#0B56A4] hover:text-white rounded-full p-2 transition duration-200 ease-in-out cursor-pointer" />
              <Twitter className="w-8 h-8 bg-[#0B56A4] hover:text-white rounded-full p-2 transition duration-200 ease-in-out cursor-pointer" />
              <Facebook className="w-8 h-8 bg-[#0B56A4] hover:text-white rounded-full p-2 transition duration-200 ease-in-out cursor-pointer" />
            </div>
          </div>
    </>
  )
}
