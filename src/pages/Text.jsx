import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "../assets/sece.mp4";
import Logo from "../assets/sece-logo.svg";
import { Eye, LogIn, User } from "lucide-react";

export default function Text() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [step, setStep] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  // Validation Helpers
  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = pass => pass.length >= 8;
  const validateOtp = code => /^\d{6}$/.test(code);
  const validatePasswordMatch = (p1, p2) => p1 === p2 && validatePassword(p1);

  // =============== LOGIN STEP ===============
  const handleLogin = () => {
    setError("");
    if (!email || !password) {
      setError("Please enter Email and Password.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid Email.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    // Replace with API request
    console.log("Login Successful");
    navigate('/admissionForm');
  };

  // =============== EMAIL STEP ===============
  const handleSendOtp = () => {
    setError("");
    if (!email) {
      setError("Please enter your Email.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid Email format.");
      return;
    }
    // Replace with API request
    console.log("OTP sent to email:", email);
    setStep("otp");
  };

  // =============== OTP STEP ===============
  const handleVerifyOtp = () => {
    setError("");
    if (!otp) {
      setError("Please enter OTP.");
      return;
    }
    if (!validateOtp(otp)) {
      setError("OTP must be exactly 6 digits.");
      return;
    }
    // Replace with API verification (here, hardcoded for demo)
    if (otp !== "123456") {
      setError("Invalid OTP.");
      return;
    }
    console.log("OTP Verified");
    setStep("password");
  };

  // =============== PASSWORD RESET STEP ===============
  const handleResetPassword = () => {
    setError("");
    if (!newPassword || !confirmPassword) {
      setError("Please enter both fields.");
      return;
    }
    if (!validatePassword(newPassword)) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!validatePasswordMatch(newPassword, confirmPassword)) {
      setError("Passwords do not match!");
      return;
    }
    // Replace with API request
    console.log("Password reset successful!");

    setStep("login");
    setNewPassword("");
    setConfirmPassword("");
    setPassword("");
    setOtp("");
    setError("");
  };

  return (
    <div className="relative min-h-screen flex items-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed w-full h-full object-cover z-0"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="overlay-gradient"></div>

      <div className="w-[90%] h-[80vh] z-10 m-auto md:flex items-center justify-between">
        <div className="w-[50%] h-[80vh] text-white hidden md:block">
          <h1 className="text-5xl font-bold playfair">
            Sri Eshwar Admission Portal
          </h1>
          <p className="roboto mt-8 leading-loose text-lg text-justify">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda
            est veniam deleniti maiores modi molestias. Magni exercitationem
            fugit sit recusandae error officiis provident? Esse quibusdam
            officiis libero iste dolorum iusto?
          </p>
        </div>

        <div className="md:w-[40%] h-[80vh] glass-card">
          <div className="flex items-center justify-center">
            <div className="w-[100%] md:w-[40%] h-[80vh] flex items-center justify-center">

              {/* =============== LOGIN STEP =============== */}
              {step === "login" && (
                <div className="flex flex-col items-center gap-5 w-[100%]">
                  <img className="w-[250px] h-[90px]" src={Logo} alt="sece logo" />

                  {/* Email Field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="playfair text-white text-xl">Email</label>
                    <div className="relative md:w-[435px]">
                      <input
                        type="email"
                        value={email}
                        onChange={e => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        placeholder="Enter your Email"
                        className={`w-full p-2 pl-3 text-white border rounded-3xl outline-none roboto placeholder-gray-300 
                          ${error && error.includes("Email") ? "border-red-600" : "border-white"}`}
                        onBlur={() => {
                          if (!email) setError("Email is required.");
                          else if (!validateEmail(email)) setError("Please enter a valid Email.");
                        }}
                      />
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 size-5" />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="playfair text-white text-xl">Password</label>
                    <div className="relative md:w-[435px]">
                      <input
                        type="password"
                        value={password}
                        onChange={e => {
                          setPassword(e.target.value);
                          if (error) setError("");
                        }}
                        placeholder="Enter your Password"
                        className={`w-full p-2 pl-3 border outline-none text-white rounded-3xl roboto placeholder-gray-300 
                          ${error && error.includes("Password") ? "border-red-600" : "border-white"}`}
                        onBlur={() => {
                          if (!password) setError("Password is required.");
                          else if (!validatePassword(password)) setError("Password must be at least 8 characters long.");
                        }}
                      />
                      <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 size-5" />
                    </div>
                  </div>

                  {/* Show Error Message */}
                  {error && <p className="text-red-600">{error}</p>}

                  {/* Remember Me + Forget Password */}
                  <div className="flex justify-between items-center w-full md:w-[435px]">
                    <div className="flex flex-row items-center gap-2">
                      <input className="accent-[#0B56A4] cursor-pointer" type="checkbox" />
                      <p className="roboto text-white text-sm">Remember Me</p>
                    </div>
                    <button
                      className="cursor-pointer roboto text-white text-sm"
                      onClick={() => setStep("email")}
                    >
                      Forget Password?
                    </button>
                  </div>

                  {/* Login Button */}
                  <button
                    onClick={handleLogin}
                    disabled={!email || !password || !!error}
                    className={`rounded-3xl h-[45px] w-[200px] flex items-center justify-center gap-1 
                      ${!email || !password || !!error 
                        ? "bg-[#0B56A4] cursor-not-allowed" 
                        : "bg-[#0B56A4] text-white cursor-pointer"}`}
                  >
                    Login <LogIn className="size-5" />
                  </button>
                </div>
              )}
              {/* =============== EMAIL STEP =============== */}
              {step === "email" && (
                <div className="flex flex-col gap-6 items-center">
                  <img className="w-[250px] h-[90px]" src={Logo} alt="sece logo" />
                  <h2 className="text-white text-2xl playfair">Reset Password</h2>

                  {/* Email Input */}
                  <div className="flex flex-col items-center gap-1">
                    <input
                      type="email"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="Enter your Email"
                      className={`w-[400px] roboto p-2 pl-3 text-white border rounded-3xl outline-none placeholder-gray-300 
                        ${error ? "border-red-600" : "border-white"}`}
                      onBlur={() => {
                        if (!email) setError("Email is required.");
                        else if (!validateEmail(email)) setError("Invalid Email format.");
                      }}
                    />
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSendOtp}
                    disabled={!email || !validateEmail(email) || !!error}
                    className={`rounded-3xl h-[45px] w-[200px] 
                      ${!email || !validateEmail(email) || !!error 
                        ? "bg-[#0B56A4] text-white cursor-not-allowed" 
                        : "bg-[#0B56A4] text-white cursor-pointer"}`}
                  >
                    Submit
                  </button>
                </div>
              )}

              {/* =============== OTP STEP =============== */}
              {step === "otp" && (
                <div className="flex flex-col gap-6 items-center">
                  <img className="w-[250px] h-[90px]" src={Logo} alt="sece logo" />
                  <h2 className="text-white text-2xl playfair">Enter OTP</h2>

                  {/* Error Message */}
                  {error && <p className="text-red-400 text-center">{error}</p>}

                  <input
                    type="text"
                    value={otp}
                    onChange={e => {
                      setOtp(e.target.value);
                      if (error) setError("");
                    }}
                    maxLength={6}
                    placeholder="Enter OTP"
                    className={`w-[400px] roboto p-2 pl-3 text-white border rounded-3xl outline-none placeholder-gray-300 
                      ${error ? "border-red-600" : "border-white"}`}
                    onBlur={() => {
                      if (!otp) setError("OTP is required.");
                      else if (!validateOtp(otp)) setError("OTP must be exactly 6 digits.");
                    }}
                  />

                  <button
                    onClick={handleVerifyOtp}
                    disabled={!otp || !validateOtp(otp) || !!error}
                    className={`rounded-3xl h-[45px] w-[200px] 
                      ${!otp || !validateOtp(otp) || !!error
                        ? "bg-gray-500 text-white cursor-not-allowed"
                        : "bg-[#0B56A4] text-white cursor-pointer"}`}
                  >
                    Verify OTP
                  </button>
                </div>
              )}

              {/* =============== PASSWORD RESET STEP =============== */}
              {step === "password" && (
                <div className="flex flex-col gap-6 items-center">
                  <img className="w-[250px] h-[90px]" src={Logo} alt="sece logo" />
                  <h2 className="text-white text-2xl playfair">Reset Password</h2>

                  

                  <input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    className="w-[400px] roboto p-2 pl-3 text-white border rounded-3xl outline-none border-white placeholder-gray-300"
                    onBlur={e => {
                      if (newPassword && !validatePassword(newPassword)) setError("Password must be at least 8 characters long.");
                    }}
                  />

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-[400px] roboto p-2 pl-3 text-white border rounded-3xl outline-none border-white placeholder-gray-300"
                    onBlur={e => {
                      if (confirmPassword && newPassword && confirmPassword !== newPassword) setError("Passwords do not match!");
                    }}
                  />

                  {error && <p className="text-red-600">{error}</p>}

                  <button
                    onClick={handleResetPassword}
                    className="rounded-3xl h-[45px] w-[200px] bg-[#0B56A4] text-white"
                  >
                    Reset Password
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}