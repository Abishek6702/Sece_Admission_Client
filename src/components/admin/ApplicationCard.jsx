import React, { useEffect, useState } from "react";
import { ClipboardList, BookOpen, Users, FileWarning } from "lucide-react";
import bg1 from "../../assets/bg-1.png";
import bg2 from "../../assets/bg-2.png";
import bg3 from "../../assets/bg-3.png";
import bg4 from "../../assets/bg1.png";
import { toast } from "react-toastify";

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
      {/* Top row */}
      <div className="flex items-center justify-between">
        <div className={`p-2 w-fit rounded-full flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
        <div className={`px-2 p-1 rounded-2xl text-xs font-bold bg-white text-[#0b56a4]`}>
          {new Date().getFullYear()}
        </div>
      </div>

      {/* Title & Count */}
      <div className="mt-2 playfair font-semibold">
        <p className="text-white">{title}</p>
        <p className="font-bold roboto text-lg text-white">{count}</p>
      </div>
    </div>
  );
};

const ApplicationCard = () => {
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    selectedEnquiries: 0,
    pendingEnquiries: 0,
    rejectedEnquiries: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/application/application-card`);
        if (!res.ok) throw new Error("Failed to fetch enquiry stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
        // toast.error("Error fetching enquiry stats: " + err.message);
      }
    };

    fetchStats();
  }, []);

  const cardsData = [
    {
      title: "Total Applications",
      count: stats.totalApplications,
      icon: <ClipboardList size={20} className="text-violet-600" />,
      iconBg: "bg-[#ffffff]",
      bg_img: bg1,
    },
    {
      title: "Admitted Applications",
      count: stats.admittedApplications,
      icon: <BookOpen size={20} className="text-green-600" />,
      iconBg: "bg-[#ffffff]",
      bg_img: bg2,
    },
    {
      title: "Pending Applications",
      count: stats.pendingApplications,
      icon: <Users size={20} className="text-orange-600" />,
      iconBg: "bg-[#ffffff]",
      bg_img: bg3,
    },
    {
      title: "Remarked Applications",
      count: stats.remarkApplication,
      icon: <FileWarning size={20} className="text-[#1c3b57]" />,
      iconBg: "bg-[#ffffff]",
      bg_img: bg4,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 md:mt-0">
      {cardsData.map((card, idx) => (
        <CardDesign
          key={idx}
          title={card.title}
          count={card.count}
          icon={card.icon}
          iconBg={card.iconBg}
          bgImage={card.bg_img}
        />
      ))}
    </div>
  );
};

export default ApplicationCard;
