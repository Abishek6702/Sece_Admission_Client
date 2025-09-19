import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./utils/ProtectedRoutes";
import LoginPage from "./pages/LoginPage";
import EnquiryForm from "./pages/EnquiryForm";
import EnquiryThankYou from "./pages/EnquiryThankYou"
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />
      <Routes>
        {/* Routes which are not protected  */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/enquiry" element={<EnquiryForm/>}/>
        <Route path="/enquiry-thank-you" element={<EnquiryThankYou/>}/>
        <Route path="/admin/*" element={<AdminDashboard/>}/>

        {/* Protected Routes */}
        {/* sample setup <Route path="/..." element={<ProtectedRoute><Component name/><ProtectedRoute>}/> */}
      </Routes>
    </>
  );
}

export default App;
