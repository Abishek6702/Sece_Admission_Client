import React, { useEffect, useState } from "react";
import { Bell, Power, Search } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [initials, setInitials] = useState("");
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        const name = decoded?.name || "User"; // adjust based on token structure
        setUserName(name);

        const nameParts = name.trim().split(" ");
        if (nameParts.length >= 2) {
          setInitials(
            nameParts[0][0].toUpperCase() +
              nameParts[nameParts.length - 1][0].toUpperCase()
          );
        } else {
          setInitials(name[0]?.toUpperCase() || "U");
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Logout successfully", { position: "top-right" });
    navigate("/login");
  };

  return (
    <nav className="w-[92%] m-auto  flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
      {/* Greeting */}
      <div>
        <h1 className="text-xl font-bold text-[#0B56A4] playfair">
          Hello, {userName}!
        </h1>
        <p className="text-sm text-gray-500">Welcome Back</p>
      </div>

      {/* Right Section */}
      <div className="flex items-center relative  gap-4 ">
        {/* Notifications */}
        <div className="relative cursor-pointer ">
          <button className="p-2 rounded-full transition">
            <Bell className="text-gray-700" size={22} />
          </button>
          <div className="absolute top-0 right-1 bg-red-500 text-white rounded-full text-xs px-1">
            1
          </div>
        </div>

        <div className="rounded-full">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-2 bg-red-100 rounded-full py-2 text-red-600 "
          >
            <Power size={18} />
          </button>
        </div>

        {/* Profile Circle */}
        <div
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white font-bold cursor-pointer"
          // onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {initials}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
