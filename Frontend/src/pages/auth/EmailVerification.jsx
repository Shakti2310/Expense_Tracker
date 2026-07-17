import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

function EmailVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const { isPending, mutate } = useMutation({
    mutationFn: async (otpCode) => {
      // Replace with your actual verification API endpoint
      return { success: true, message: "Email verified successfully" };
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error("Invalid OTP. Please try again.");
    },
  });

  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }
    mutate(otpCode);
  };

  const handleResend = () => {
    toast.info("OTP resent to your email");
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return isPending ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-myGreenMD rounded-full animate-spin"></div>
    </div>
  ) : (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-myGreenMD to-myGreenSM rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 font-poppins">
            Verify Your Email
          </h1>
          <p className="text-gray-600 text-sm">
            We've sent a 6-digit OTP to your email address
          </p>
        </div>

        {/* OTP Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Fields */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-700">
              Enter OTP
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex gap-3 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-lg focus:border-myGreenMD focus:outline-none focus:ring-1 focus:ring-myGreenMD/30 transition-all bg-gray-50 focus:bg-white"
                  inputMode="numeric"
                  autoComplete="off"
                />
              ))}
            </div>
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={isPending || otp.join("").length !== 6}
            className="w-full bg-gradient-to-r from-myGreenMD to-myGreenSM hover:shadow-lg hover:scale-[1.02] active:scale-95 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-myGreenMD/50"
          >
            {isPending ? "Verifying..." : "Verify Email"}
          </button>

          {/* Resend OTP */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the OTP?{" "}
              <button
                type="button"
                onClick={handleResend}
                className="text-myGreenMD font-semibold hover:text-myGreenSM transition-colors active:scale-95"
              >
                Resend OTP
              </button>
            </p>
          </div>

          {/* Help Text */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700">
              💡 Check your spam folder if you don't see the email in your inbox
            </p>
          </div>

          {/* Back to SignUp */}
          <button
            type="button"
            onClick={() => navigate("/authentication/register")}
            className="w-full text-myGreenMD font-semibold py-2 rounded-lg hover:bg-green-50/50 active:scale-95 transition-all"
          >
            Back to Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmailVerification;