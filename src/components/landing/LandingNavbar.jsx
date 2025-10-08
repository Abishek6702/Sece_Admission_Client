import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Logo from "../../assets/sece-logo.svg";
import MenuIcon from "../../assets/menu.svg";
import { useNavigate } from "react-router-dom";

export default function LandingNavbar({scrolled}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const navLinks = ["Home", "About Us", "Features"];

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-500 px-6 py-4 transition-colors duration-300 ${
        scrolled ? "bg-[#d9eeff]" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div>
          <img className="h-[50px]" src={Logo} alt="logo" />
        </div>

        {/* Center: Nav Links (Desktop) */}
        <div className="hidden md:flex gap-10 ">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() =>
                handleScrollToSection(link.toLowerCase().replace(" ", ""))
              }
              className={`font-bold text-xl playfair transition-colors cursor-pointer ${
                scrolled
                  ? "text-gray-900 hover:text-[#0b56a4]"
                  : "text-gray-700 hover:text-[#0b56a4]"
              }`}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right: Login Button (Desktop) */}
        <div className="hidden md:flex">
          <button
            className={`px-5 py-1.5 rounded-lg text-xl playfair transition-colors cursor-pointer ${
              scrolled
                ? "bg-[#0B56A4] text-white "
                : "bg-[#0B56A4] text-white "
            }`}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

        {/* Mobile: Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X
                className={`w-7 h-7 ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              />
            ) : (
              <img className="w-7 h-7" src={MenuIcon} alt="menu" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-0 right-0 h-full w-2/3 sm:w-1/2 md:hidden bg-white shadow-lg z-50 p-6 flex flex-col">
          {/* Close Button */}
          <div className="flex justify-end items-center mb-8">
            <X
              className="w-7 h-7 cursor-pointer text-gray-900"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() =>
                  handleScrollToSection(link.toLowerCase().replace(" ", ""))
                }
                className="text-lg text-gray-700 font-medium hover:text-blue-600 transition-colors text-left"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Login Button */}
          <div className="mt-8">
            <button
              className="w-full px-5 py-2 bg-[#0B56A4] text-white rounded-lg"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
