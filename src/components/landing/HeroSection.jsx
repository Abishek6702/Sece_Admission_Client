import { MoveUpRight, X } from "lucide-react";
import React, { useState } from "react";
import grid from "../../assets/Grid.svg";
import union from "../../assets/Union.svg";
import Form from "../../assets/form.svg";
import { useNavigate } from "react-router-dom";

import hero from "../../assets/hero.svg";
import hero2 from "../../assets/hero2.svg";
import hero3 from "../../assets/hero3.svg";
import hero4 from "../../assets/hero4.svg";
import choose from "../../assets/choose.svg";
const SlantedImageRow = () => (
  <div className="relative w-full h-96">
    {featureCards.map((card, idx) => (
      <div
        key={idx}
        className={`absolute ${card.top} ${card.left} transform rotate-${card.rotate} h-40 w-28 rounded-3xl overflow-hidden flex items-center justify-center ${card.color} shadow-lg`}
        style={{ zIndex: idx }}
      >
        <img
          src={card.img}
          alt=""
          className="h-32 w-24 object-cover rounded-2xl"
        />
      </div>
    ))}
  </div>
);

const HeroSection = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { label: "I Year B.E / B.Tech Programme", value: "I Year B.E / B.Tech" },
    { label: "B.E / B.Tech Lateral Entry", value: "Lateral Entry" },
    { label: "P.G Programme", value: "I Year M.E" },
  ];

  const handleContinue = () => {
    if (!selectedOption) {
      alert("Please select an option before continuing");
      return;
    }
    setModalOpen(false);

    if (selectedOption === "I Year B.E / B.Tech") {
      navigate("/enquiry", { state: { selectedOption: selectedOption } });
    } else if (selectedOption === "Lateral Entry") {
      navigate("/enquirylateral", {
        state: { selectedOption: selectedOption },
      });
    } else if (selectedOption === "I Year M.E") {
      navigate("/enquirypg", { state: { selectedOption: selectedOption } });
    }
  };

  return (
    <div className="relative  bg-[#d9eeff] min-h-screen  w-full flex flex-col px-6 md:px-20 pt-12 pb-4 justify-center overflow-hidden">
      {/* Main hero grid */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center  ">
        <div className="  flex justify-center items-center z-20  ">
          <div className="  lg:block lg:absolute right-0">
            <img src={hero} alt="" className=" w-[650px]" />
          </div>
        </div>
        {/* Left: Headline and form */}
        <div className="flex-1 flex flex-col justify-center mb-12 md:mb-0 z-50 ">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 playfair">
            Sri Eshwar <br />
            Admission
            <span className="inline-block">
              <img
                src={Form}
                alt="AI chip"
                className="inline-block h-16 w-16 align-middle"
              />
            </span>{" "}
            Portal
          </h1>
          <p className="text-lg text-gray-600 font-medium mb-7 md:w-[50%]">
            At Sri Eshwar, we simplify your journey to higher education.
            <br></br>
            Explore programs, apply with ease, and stay updated at every step.
            Let’s shape your future together. Apply online, track your admission
            status, and stay updated with latest announcements.
          </p>
          {/* Form row */}
          <div className="">
            <button
              type="button"
              className="rounded-full bg-blue-900 text-white px-6 py-3 font-semibold shadow flex items-center gap-2 cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              Enquiry Now <MoveUpRight />
            </button>
          </div>
        </div>
        <div className="absolute  left-100  top-0">
          <img src={grid} alt="" />
        </div>
        <div className=" absolute  opacity-20">
          <img src={union} alt="" />
        </div>
        {/* Right: Feature cards and phone mockup */}
        {/* <div className="w-[50%] flex justify-end items-center">
          <div className="image">
            <div className="1 w-60  absolute top-7 right-24">
              <img src={hero2} alt="" />
            </div>
            <div className="1 w-60 absolute top-0 right-70">
              <img src={hero3} alt="" />
            </div>
            <div className="1 w-34 -rotate-30 absolute -right-7">
              <img src={hero1} alt="" />
            </div>
            <div className="1 w-60 absolute top-60 right-34">
              <img src={hero4} alt="" />
            </div>
            <div className="1 w-34 -rotate-30 absolute top-90 right-76">
              <img src={hero1} alt="" />
            </div>
            <div className="1 w-34 -rotate-30 absolute top-20 right-116">
              <img src={hero1} alt="" />
            </div>
            
          </div>
        </div> */}
      </div>
      {modalOpen && (
        <div className="fixed inset-0 tint1 flex items-center justify-center z-500 border ">
          <div className="bg-white rounded-lg p-6 md:w-[50%] md:h-[95%] relative">
            <div className="img  md:w-[50%]  m-auto">
              <img
                src={choose}
                alt=""
                className="w-[150px] md:w-[250px] m-auto"
              />
            </div>
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 cursor-pointer rounded-full bg-gray-200 text-gray-500"
              >
                <X />
              </button>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-center playfair mt-4">
              Select Admission Enquiry Type
            </h2>
            <form>
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => setSelectedOption(option.value)}
                  className={`border mt-4 md:w-[90%] m-auto px-3 py-3 rounded-xl  flex justify-between items-center cursor-pointer transition-all
      ${
        selectedOption === option.value
          ? "border-2 border-[#0B56A4] font-semibold text-[#0B56A4]"
          : "border-gray-300"
      }
    `}
                >
                  <label className="cursor-pointer select-none">
                    {option.label}
                  </label>
                  <input
                    type="radio"
                    name="admissionType"
                    value={option.value}
                    checked={selectedOption === option.value}
                    onChange={() => setSelectedOption(option.value)}
                    className="cursor-pointer accent-[#0B56A4]"
                  />
                </div>
              ))}
            </form>
            <div className="flex justify-center gap-4 mt-4 items-center">
              <button
                onClick={handleContinue}
                className="px-4 py-2 bg-[#0B56A4] text-white rounded cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
