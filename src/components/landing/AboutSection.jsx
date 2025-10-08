import { MoveUpRight } from "lucide-react";
import React from "react";
import grid from "../../assets/Grid.svg";
import union from "../../assets/Union1.svg";
import Form from "../../assets/Form.svg";
import sport from "../../assets/sport.svg";
import feature from "../../assets/feature.svg";
import about from "../../assets/about1.svg";

const AboutSection = () => {
  return (
    <div className="relative bg-[#f6f6f646]  w-full flex flex-col px-6 md:px-20 py-6 overflow-hidden">
      {/* Main hero grid */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center ">
        <div className="imagecontainer w-full lg:w-[50%] py-6   ">
          {/* <div className="lef flex-col space-y-4">
            <div className=" h-[200px] rounded-tl-[0px] rounded-br-[50px] border">
              <img src={feature} alt="" className="w-full h-full rounded-tl-[60px] rounded-br-[40px]" />
            </div>
            <div className="border h-[300px] rounded-bl-[50px] rounded-tr-[50px]">
              <img src={feature} alt="" className="w-full h-full" />
            </div>
          </div>
          <div className="right flex flex-col justify-center">
            <div className="border h-[400px] rounded-tl-[50px] rounded-br-[50px]"></div>
          </div> */}
          <img src={about} alt="" className="w-[700px] h-[400px]" />
        </div>

        <div className="contentcontainer md:w-[50%] ">
          <p className="font-xl">
            <span className="text-3xl font-bold playfair text-[#0b56a4]">
              Welcome to the Sri Eshwar Admission Portal
            </span>
          </p>
          <p className="text-lg text-[#646464] mt-2 leading-7">
            Our gateway to a world of academic excellence and holistic
            development. We are dedicated to simplifying the admission process
            while providing complete support and guidance to aspiring students
            and their families.Our mission is to make the journey to your future
            seamless, efficient, and informed. Join us at Sri Eshwar and take
            the first step toward achieving your academic and career
            aspirations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
