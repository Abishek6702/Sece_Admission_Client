import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/sece-logo.svg";
import AutoCarousel from "../components/AutoCarousel";
import grid from "../assets/Vector.svg";
import union from "../assets/Union.svg";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Forgot/reset states
  const [view, setView] = useState("login"); // "login" | "forgot" | "reset"
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // --- Login ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        { email, password }
      );

      const { token, role, firstTimeLogin } = res.data;
      localStorage.setItem("token", token);
      toast.success("Login successful!");

      if (role.toLowerCase() === "admin") navigate("/admin");
      else if (role.toLowerCase() === "student") {
        if (firstTimeLogin) navigate("/application");
        else navigate("/dashboard");
      } else navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // --- Forgot Password ---
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`,
        { email }
      );
      toast.success("OTP sent to your email!");
      setView("reset");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    } finally {
      setForgotLoading(false);
    }
  };

  // --- Reset Password ---
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password`,
        { email, otp, newPassword }
      );
      toast.success("Password reset successfully! Please login.");
      setView("login");
      setOtp("");
      setNewPassword("");
      setPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen bg-gray-50">
     <div className="absolute inset-0 opacity-10 overflow-hidden">
  <img src={union} alt="" className="w-full h-full object-cover" />
</div>

      {/* Left Column */}
      <div className=" md:w-1/2 flex items-center justify-center px-6 z-500">
        <div className=" max-w-md w-full space-y-6">
          <div className=" absolute top-0 left-0 w-[45%]">
            <img src={grid} alt="" className="opacity-40  " />
          </div>
          
          <img src={logo} alt="Logo" className="w-32 mx-auto mb-6" />

          {/* Titles */}
          {view === "login" && (
            <>
              <h1 className="text-3xl font-bold text-gray-900 text-center playfair">
                Welcome back!
              </h1>
              <p className="text-gray-600 text-center">
                Simplify your workflow and boost your productivity with Sece
                admission portal.
              </p>
            </>
          )}
          {view === "forgot" && (
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              Forgot Password
            </h1>
          )}
          {view === "reset" && (
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              Reset Password
            </h1>
          )}

          {/* Login Form */}
          {view === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-[#0B56A4]"
                />
                <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-[#0B56A4]"
                />
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </div>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setView("forgot")}
                  className="text-sm text-[#0B56A4] cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-lg text-white font-semibold ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0b56a4]"
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          )}

          {/* Forgot Password Form */}
          {view === "forgot" && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <p className="text-gray-600 text-center text-sm">
                Enter your email to receive an OTP.
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-[#0B56A4]"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setView("login")}
                  className="w-1/2 py-2 rounded-lg bg-gray-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className={`w-1/2 py-2 rounded-lg text-white ${
                    forgotLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#0b56a4]"
                  }`}
                >
                  {forgotLoading ? "Sending..." : "Send OTP"}
                </button>
              </div>
            </form>
          )}

          {/* Reset Password Form */}
          {view === "reset" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-[#0B56A4]"
              />

              {/* New Password with toggle */}
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-[#0B56A4]"
                />
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff /> : <Eye />}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setView("login")}
                  className="w-1/2 py-2 rounded-lg bg-gray-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className={`w-1/2 py-2 rounded-lg text-white ${
                    resetLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#0b56a4]"
                  }`}
                >
                  {resetLoading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="hidden md:flex w-[60%] items-center justify-center z-500">
        <AutoCarousel />
      </div>
    </div>
  );
}
