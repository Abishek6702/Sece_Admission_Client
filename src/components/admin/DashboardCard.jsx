import React from "react";
import {
  Rocket,
  BookOpen,
  Users,
  BarChart3,
  ClipboardList,
} from "lucide-react";
import bg1 from "../../assets/bg-1.png";
import bg2 from "../../assets/bg-2.png";
import bg3 from "../../assets/bg-3.png";
import bg4 from "../../assets/bg1.png";

const CardDesign = ({ iconBg, icon, title, count, bgImage }) => {
  return (
    <div
      className={`w-full md:w-[240px] bg-white rounded-xl p-3 px-4 shadow-md`}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Top Row */}
      <div className="flex items-center justify-between">
        {/* Icon */}
        <div
          className={`p-2 w-fit rounded-full flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </div>

        {/* Year Badge */}
        <div className="px-2 py-1 rounded-2xl text-xs font-semibold bg-[#ffffff] text-[#0b56a4]">
          {new Date().getFullYear()}
        </div>
      </div>

      {/* Title & Count */}
      <div className="mt-2 playfair font-semibold text-[#ffffff]">
        <p>{title}</p>
        <p className="font-bold roboto text-lg text-[#fffff]">{count}</p>
      </div>
    </div>
  );
};

const CardSet = () => {
  const cardsData = [
    {
      title: "Total Enquiries",
      count: 35,
      icon: <ClipboardList size={20} className="text-[#1c3b57]" />,
      iconBg: "bg-[#ffffff]",
      bg_img: bg4,
    },
    {
      title: "Total Applications",
      count: 50,
      icon: <BookOpen size={20} className="text-orange-600" />,
      iconBg: "bg-[#ffffff]",
      bg_img: bg3,
    },
    {
      title: "Government Quota",
      count: 120,
      icon: <Users size={20} className="text-green-600" />,
      iconBg: "bg-[#ffffff]",
      bg_img: bg2,
    },
    {
      title: "Management Quota",
      count: 80,
      icon: <BarChart3 size={20} className="text-violet-600" />,
      iconBg: "bg-[#ffffff]",
      bg_img: bg1,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardsData.map((card, idx) => (
        <CardDesign
          key={idx}
          title={card.title}
          count={card.count}
          icon={card.icon}
          iconBg={card.iconBg}
          bg_color={card.bg_color}
          bgImage={card.bg_img}
        />
      ))}
    </div>
  );
};

export default CardSet;
