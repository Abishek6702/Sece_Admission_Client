import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./utils/ProtectedRoutes";
import LoginPage from "./pages/LoginPage";
import EnquiryForm from "./pages/EnquiryForm";
import EnquiryThankYou from "./pages/EnquiryThankYou";
import AdminDashboard from "./pages/AdminDashboard";
import ApplicationForm from "./pages/ApplicationForm";
import ApplicationThankYou from "./pages/ApplicationThankYou";
import Text from "./pages/Text";
import ApplicationDetail from "./components/admin/ApplicationDetail";
import StudentApplicationDetail from "./components/student/StudentApplicationDetail";
import ApplicationEditForm from "./components/student/ApplicationEditForm";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/Landingpage";


function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/enquiry" element={<EnquiryForm />} />
        <Route path="/enquiry-thank-you" element={<EnquiryThankYou />} />
        <Route
          path="/application-thank-you"
          element={<ApplicationThankYou />}
        />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/application" element={<ApplicationForm />} />
        <Route path="/text" element={<Text />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="application_list/:id" element={<ApplicationDetail />} />
        <Route path="/studentapplication/:id" element={<StudentApplicationDetail/>}/>
        <Route path="/application/edit" element={<ApplicationEditForm/>}/>

        {/* Protected Routes */}
        {/* sample setup <Route path="/..." element={<ProtectedRoute><Component name/><ProtectedRoute>}/> */}
      </Routes>
    </>
  );
}

export default App;
