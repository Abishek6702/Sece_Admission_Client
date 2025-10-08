import { MoveUpRight } from "lucide-react";
import React from "react";
import { motion } from "framer-motion"; // ✅ Import framer-motion
import grid from "../../assets/Grid.svg";
import union from "../../assets/Union.svg";
import Form from "../../assets/Form.svg";
import First from "../../assets/first.svg";
import Second from "../../assets/second.svg";
import Third from "../../assets/third.svg";
import Fourth from "../../assets/fourth.svg";
import Fifth from "../../assets/fifth.svg";
import Sixth from "../../assets/sixth.svg";
import Mobile from "../../assets/mobileimg.png";
import feature1 from "../../assets/feature1.svg";
import feature2 from "../../assets/feature2.svg";
import feature3 from "../../assets/feature3.svg";
import feature4 from "../../assets/feature4.svg";




const FeatureSection = () => {
  const features = [
    {
      logo: feature2,
      Heading: "Real-Time Updates",
      content:
        "Stay informed with instant status changes and notifications across email communication.",
    },
    {
      logo: feature1,
      Heading: "Data Visualization",
      content:
        "Track admission enquiry and applications through clear charts and visual insights at a glance.",
    },
    {
      logo: feature3,
      Heading: "Bulk Data Download",
      content:
        "Download complete application records quickly in secure, easy-to-use excel formats.",
    },
    {
      logo: feature4,
      Heading: "Transparent Process",
      content:
        "Access clear steps, deadlines, and eligibility details for a smooth, simple journey.",
    },
  ];

  return (
    <div className="relative bg-[#e7f4ffc9] w-full flex flex-col px-6 md:px-20 pb-12 justify-center overflow-hidden">
      <div className="w-full flex flex-col md:flex-row justify-between items-center">
        <div className="absolute opacity-20">
          <img src={union} alt="" />
        </div>
        <div className="m-auto">
          <div className="flex w-full mt-8">
            <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-7">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 justify-center items-center"
                >
                  {/* 🔥 Animated Image */}
                  <motion.img
                    className="w-[60px] text-[#0b56a4] "
                    src={item.logo}
                    alt={item.Heading}
                    animate={{
                      y: [0, -14, 0], // bounce effect
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <h1 className="playfair text-2xl">{item.Heading}</h1>
                  <p className="roboto w-[255px] text-md text-[#767676] text-center">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
