import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ApplicationList from "../components/admin/ApplicationList";
import EnquirList from "../components/admin/EnquiryList";
import Dashboard from "../components/admin/Dashboard";
import AdminSidebar from "../components/admin/AdminSidebar";
import EnquiryDeatil from "../components/admin/EnquiryDeatil";
import FinalizedEnquiries from "../components/admin/FinalizedEnquiries";
import ApplicationDetail from "../components/admin/ApplicationDetail";
// import FinalizedApplications from "../components/admin/FinalizedApplications";

const TABS = {
  DASHBOARD: "dashboard",
  ENQUIRY_LIST: "enquiry_list",
  APPLICATION_LIST: "application_list",
  FINALIZED_ENQUIRIES: "finalized_enquiries",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get activeTab from the current path segment after /admin/
  const pathTab = location.pathname.split("/")[2]; // e.g. "dashboard"

  // Validate pathTab or fallback to dashboard
  const activeTab = Object.values(TABS).includes(pathTab)
    ? pathTab
    : TABS.DASHBOARD;

  // Handler to change tab by navigating to new route
  const setActiveTab = (tab) => {
    navigate(`/admin/${tab}`);
  };

  return (
    <div className="w-full h-screen bg-[#eceef6] flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 h-full bg-[#f3f5f7] overflow-y-auto">
        <div className="p-5 md:px-8 md:py-7 h-full">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="enquiry_list" element={<EnquirList />} />
            <Route path="application_list" element={<ApplicationList />} />
            {/* Redirect any unknown /admin/* to /admin/dashboard */}
            <Route
              path="*"
              element={<Navigate to="/admin/dashboard" replace />}
            />
            <Route path="enquiry_list/:id" element={<EnquiryDeatil />} />
            <Route
              path="finalized_enquiries"
              element={<FinalizedEnquiries />}
            />
            <Route
              path="application_list/:id"
              element={<ApplicationDetail />}
            />
            {/* <Route path="finalized_applications" element={<FinalizedApplications/>}/> */}
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
