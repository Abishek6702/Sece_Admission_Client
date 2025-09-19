import React, { useState } from "react";
import logo from "../../assets/sece-logo.svg";
import {
  LogOut,
  Menu,
  LayoutDashboard,
  ClipboardList,
  FileText,
  X,
  FileCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Logout successfully", { position: "top-right" });
    navigate("/");
  };
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const tabs = [
    { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
    { id: "enquiry_list", label: "Enquiry List", Icon: ClipboardList },
    { id: "finalized_enquiries", label: "Finalized Enquiries", Icon: FileCheck},
    { id: "application_list", label: "Application List", Icon: FileText },

  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  const Tooltip = ({ label, children }) =>
    collapsed && !mobileOpen ? (
      <div className="relative group flex items-center">
        {children}
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2">
          <div className="px-2 py-1 rounded bg-black text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {label}
          </div>
        </div>
      </div>
    ) : (
      children
    );

  const itemBase = "flex items-center gap-3 px-3 py-2 ";
  const activeClasses = "text-[#0b56a4] font-bold bg-[#0b55a42c] px-6 ";
  const inactiveClasses = "text-gray-800 hover:text-[#0b56a4] px-6";

  const containerClass = `fixed top-0 left-0 h-screen bg-white shadow-md flex flex-col justify-between transition-transform duration-300 z-50
    ${mobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-60"}
    md:static md:translate-x-0 ${collapsed ? "md:w-20" : "md:w-60"}`;

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50  bg-white  ">
        <Menu
          className="cursor-pointer text-2xl w-10 h-10 text-gray-800"
          onClick={() => setMobileOpen(true)}
        />
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 tint z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={containerClass}
        aria-hidden={
          !mobileOpen &&
          typeof window !== "undefined" &&
          window.innerWidth < 768
        }
      >
        <div>
          <div className="flex items-center justify-between p-4 ">
            {!collapsed || mobileOpen ? (
              <img src={logo} alt="Logo" className="w-32" />
            ) : (
              <div className="w-8 h-8" />
            )}

            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                {collapsed ? (
                  <Menu
                    className="cursor-pointer md:ml-[-36px] text-xl text-gray-800"
                    onClick={() => setCollapsed(false)}
                    aria-label="Expand sidebar"
                  />
                ) : (
                  <div className=" ">
                    <Menu
                      className="cursor-pointer text-xl w-5 hidden md:block lg:hidden"
                      onClick={() => setCollapsed(true)}
                      aria-label="Collapse sidebar"
                    />
                  </div>
                )}
              </div>

              <div className="md:hidden">
                {mobileOpen && (
                  <div className="p-2 bg-gray-300 text-gray-500 rounded-full">
                    <X
                      className="cursor-pointer text-2xl "
                      onClick={() => setMobileOpen(false)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <nav className="  flex flex-col gap-4  text-[18px]  font-semibold playfair ">
            {tabs.map(({ id, label, Icon }) => {
              const isActive = activeTab === id;
              const itemClass = `${itemBase} ${
                isActive ? activeClasses + "w-full" : inactiveClasses
              } ${
                collapsed && !mobileOpen
                  ? "justify-center cursor-pointer"
                  : "justify-start cursor-pointer text-xl"
              }`;

              return (
                <Tooltip key={id} label={label}>
                  <button
                    onClick={() => handleTabClick(id)}
                    className={`${itemBase} ${
                      isActive ? activeClasses : inactiveClasses
                    }
        ${collapsed && !mobileOpen ? "justify-center" : "justify-start"}`}
                    style={{ overflow: "hidden", position: "relative" }}
                  >
                    {isActive && (
                      <span
                        className=" absolute left-0 top-[50%] translate-y-[-50%] h-[80%]   w-[5px] bg-[#0b56a4] rounded-r-full"
                        style={{ zIndex: 1 }}
                      />
                    )}
                    <Icon size={24} className="flex-shrink-0 " />
                    {(!collapsed || mobileOpen) && (
                      <span className="ml-1">{label}</span>
                    )}
                  </button>
                </Tooltip>
              );
            })}
          </nav>
        </div>

        <div className="p-5 playfair  " onClick={handleLogout}>
          <Tooltip label="Logout">
            <button
              className={` ${
                collapsed && !mobileOpen
                  ? "justify-center cursor-pointer  "
                  : "text-red-600 cursor-pointer"
              } ${itemBase} ${
                collapsed && !mobileOpen ? "justify-center" : ""
              }`}
            >
              <LogOut
                size={24}
                className={
                  !collapsed || mobileOpen ? "text-red-600 " : "text-red-600"
                }
              />
              {(!collapsed || mobileOpen) && (
                <span className="ml-1 font-bold text-xl">Logout</span>
              )}
            </button>
          </Tooltip>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
