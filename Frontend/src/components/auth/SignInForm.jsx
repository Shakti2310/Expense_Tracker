import React from "react";
import assets from "../../assets/assets.js";
import AuthInput from "../../components/auth/AuthInput.jsx";
import { useNavigate } from "react-router";

function SignInForm({
  username,
  setUsername,
  password,
  setPassword,
  onSubmitHandler,
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-myGreenMD to-myGreenSM rounded-xl mx-auto">
            <span className="text-white font-bold text-xl">X</span>
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-900 font-poppins">
            Welcome Back
          </h1>
          <p className="text-center text-gray-600 text-sm">
            Sign in to access your expense tracking
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="space-y-5">
          <AuthInput
            name={"Username"}
            type={"text"}
            msg={"Enter your username"}
            setValue={setUsername}
            value={username}
          />
          <AuthInput
            name={"Password"}
            type={"password"}
            msg={"Enter your password"}
            setValue={setPassword}
            value={password}
          />

          {/* Remember & Forgot */}
          <div className="flex justify-between items-center text-xs text-gray-600">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 cursor-pointer"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="text-myGreenMD hover:text-myGreenSM font-semibold transition-colors active:scale-95"
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            className="w-full bg-gradient-to-r from-myGreenMD to-myGreenSM hover:shadow-lg hover:scale-[1.02] active:scale-95 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-myGreenMD/50"
            type="submit"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 p-3 bg-gray-100 hover:bg-gray-200 hover:scale-[1.05] active:scale-95 rounded-lg transition-all border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <img
                className="w-5 h-5 object-contain"
                src={assets.googleIcon}
                alt="Google"
              />
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 p-3 bg-gray-100 hover:bg-gray-200 hover:scale-[1.05] active:scale-95 rounded-lg transition-all border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <img
                className="w-5 h-5 object-contain"
                src={assets.githubIcon}
                alt="GitHub"
              />
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 p-3 bg-gray-100 hover:bg-gray-200 hover:scale-[1.05] active:scale-95 rounded-lg transition-all border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <img
                className="w-5 h-5 object-contain"
                src={assets.facebookIcon}
                alt="Facebook"
              />
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/authentication/register")}
              className="text-myGreenMD font-semibold hover:text-myGreenSM transition-colors active:scale-95"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
