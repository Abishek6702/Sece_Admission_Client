import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/sece-logo.svg";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setError("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      const { token, role, firstTimeLogin } = res.data;

      localStorage.setItem("token", token);

      toast.success("Login successful!");

      if (role.toLowerCase() === "admin") {
        navigate("/admin");
      } else if (role.toLowerCase() === "student") {
        if (firstTimeLogin === false) {
          navigate("/application");
        } else if (firstTimeLogin === true) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    } catch (err) {
      // setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md p-8 bg-white rounded-lg shadow-md space-y-6"
        >
          <div className="image-container">
            <img src={logo} alt="Logo" className="w-40 mx-auto" />
          </div>

          <div className="relative">
            <label
              htmlFor="email"
              className="block mb-1 font-semibold text-[#282526]"
            >
              Email
            </label>
            <div className="relative">
              <User
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className=" w-full px-3 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-400 text-sm outline-none focus:border-2 focus:border-[#0B56A4] focus:bg-white"
              />
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-1 font-semibold text-[#282526]"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-10 w-full px-3 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-400 text-sm outline-none focus:border-2 focus:border-[#0B56A4] focus:bg-white"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword((show) => !show)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setShowPassword((show) => !show);
                    e.preventDefault();
                  }
                }}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-400" />
                ) : (
                  <Eye size={20} className="text-gray-400" />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0B56A4] hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}
