import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./utils/ProtectedRoutes";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />
      <Routes>
        {/* Routes which are not protected  */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected Routes */}
        {/* sample setup <Route path="/..." element={<ProtectedRoute><Component name/><ProtectedRoute>}/> */}
      </Routes>
    </>
  );
}

export default App;
