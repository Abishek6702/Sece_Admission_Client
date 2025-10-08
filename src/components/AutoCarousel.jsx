import React, { useEffect, useState } from "react";
import img1 from "../assets/img1.svg";
import img2 from "../assets/img2.svg";
import img3 from "../assets/img3.svg";


export default function OrbitCarousel() {
  const images = [img1, img2,img3]; // add more images here
  const [current, setCurrent] = useState(0);

  // Auto carousel (every 3s)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval); // cleanup
  }, [images.length]);

  return (
    <div className="w-[90%] h-[90%] rounded-4xl bg-[#2066ac13] z-100 flex flex-col items-center justify-center ">
      {/* Image Section */}
      <div
        className="scroll-container w-[90%] h-[70%]  flex justify-center items-center  cursor-pointer"
        onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
      >
        <img src={images[current]} alt="" className="w-80 transition-all duration-700" />
      </div>

      <div className="flex gap-2  ">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              current === index ? "bg-[#2066ac] scale-110" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>

      {/* Caption */}
      <div className="w-[90%] text-center text-xl text-[#070808] playfair mt-4 font-semibold">
        <p>
          Make your work easier and organized <br />
          with <span className="">SECE Admission Portal</span>
        </p>
      </div>

      {/* Dots */}
      
    </div>
  );
}
