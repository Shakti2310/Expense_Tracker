import React from "react";
import { NavLink } from "react-router";

function OtpForm({
  otp,
  setOtp,
  inputRefs,
  handleInputChange,
  handleKeyDown,
  handleSubmit,
  handleResend,
  isPending,
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins">
            Verify Your Email
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            We've sent a 6-digit OTP to your email address
          </p>
        </div>

        {/* OTP Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Fields */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Enter OTP
              <span className="text-red-500 dark:text-red-400 ml-1">*</span>
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
                  className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500/30 dark:focus:ring-blue-400/30 transition-all bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-white"
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
            className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 hover:shadow-lg hover:scale-[1.02] active:scale-95 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50"
          >
            {isPending ? "Verifying..." : "Verify Email"}
          </button>

          {/* Resend OTP */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Didn't receive the OTP?{" "}
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-500 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors active:scale-95"
              >
                Resend OTP
              </button>
            </p>
          </div>

          {/* Help Text */}
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-xs text-green-500 dark:text-green-400">
              💡 Check your spam folder if you don't see the email in your inbox
            </p>
          </div>

          {/* Back to SignUp */}
          <NavLink
            to="/authentication/register"
            className="w-full inline-block text-center text-blue-500 dark:text-blue-400 font-semibold cursor-pointer py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 active:scale-95 transition-all"
          >
            Back to Sign Up
          </NavLink>
        </form>
      </div>
    </div>
  );
}

export default OtpForm;
