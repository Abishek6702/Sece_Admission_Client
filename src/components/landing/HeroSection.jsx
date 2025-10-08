import { MoveUpRight } from "lucide-react";
import React from "react";
import grid from "../../assets/Grid.svg";
import union from "../../assets/Union.svg";
import Form from "../../assets/Form.svg";
import { useNavigate } from "react-router-dom";

import hero from "../../assets/hero.svg";
import hero2 from "../../assets/hero2.svg";
import hero3 from "../../assets/hero3.svg";
import hero4 from "../../assets/hero4.svg";

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
        <div className="flex-1 flex flex-col justify-center mb-12 md:mb-0 z-50">
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
          <p className="text-lg text-gray-600 font-medium mb-7 w-[50%]">
            At Sri Eshwar, we simplify your journey to higher education.<br></br>
            Explore programs, apply with ease, and stay updated at every step.
            Let’s shape your future together. Apply online, track your admission
            status, and stay updated with latest announcements.
          </p>
          {/* Form row */}
          <div className="">
            <button
              type="submit"
              className="rounded-full bg-blue-900 text-white px-6 py-3 font-semibold shadow flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/enquiry")}
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
    </div>
  );
};

export default HeroSection;
