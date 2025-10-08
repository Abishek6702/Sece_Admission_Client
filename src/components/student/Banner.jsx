  import React from "react";
  import bannerImg from "../../assets/banner.png"; // Your uploaded image path

  const Banner = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return (
      <div className="w-full bg-blue-600 rounded-xl p-6 flex items-center justify-between text-white shadow-lg mt-6">
        {/* Left: Text */}
        <div className="flex flex-col gap-2">
          <span className="text-sm">{formattedDate}</span>
          <h1 className="text-2xl font-bold">Welcome back, John!</h1>
          <p className="text-base opacity-90">
            Always stay updated in your student portal
          </p>
        </div>

        {/* Right: Image */}
        <div className="flex-shrink-0 border">
          <img src={bannerImg} alt="Student Banner" className="w-100 h-40" />
        </div>
      </div>
    );
  };

  export default Banner;
