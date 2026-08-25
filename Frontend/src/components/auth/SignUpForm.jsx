import React from "react";
import assets from "../../assets/assets.js";
import { NavLink } from "react-router";
import {
  FiAtSign,
  FiUser,
  FiMail,
  FiLock,
  FiUpload,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

function SignUpForm({
  fullname,
  setFullname,
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  agreed,
  setAgreed,
  defaultPicture,
  setDefaultPicture,
  onSubmitHandler,
}) {
  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm p-8 text-xs">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2">
        <img src={assets.logo} alt="XseTrack logo" className="h-8 w-8" />
        <span className="text-xl font-bold text-slate-900 dark:text-white">
          Xse<span className="text-blue-500 dark:text-blue-400">Track</span>
        </span>
      </div>

      <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-white mt-2">
        Sign Up to XseTrack
      </h1>
      <p className="text-center text-slate-500 dark:text-gray-400 mt-1 mb-1">
        Already have an account?{" "}
        <NavLink
          to="/authentication/login"
          className="text-blue-500 dark:text-blue-400 font-medium hover:underline"
        >
          Log In
        </NavLink>
      </p>

      <form onSubmit={onSubmitHandler} className="space-y-2">
        {/* Username */}
        <div>
          <label className="block text-slate-900 dark:text-gray-200 font-semibold">
            Username
          </label>
          <div className="relative">
            <FiAtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="@yourusername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-gray-600 rounded-lg text-slate-700 dark:text-white bg-white dark:bg-gray-700 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-blue-400 dark:focus:border-blue-500"
            />
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-slate-900 dark:text-gray-200 font-semibold">
            Full Name
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="John Doe"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-gray-600 rounded-lg text-slate-700 dark:text-white bg-white dark:bg-gray-700 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-blue-400 dark:focus:border-blue-500"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-slate-900 dark:text-gray-200 font-semibold">
            Email
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 h-5 w-5" />
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-gray-600 rounded-lg text-slate-700 dark:text-white bg-white dark:bg-gray-700 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-slate-900 dark:text-gray-200 font-semibold">
            Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 h-5 w-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-slate-200 dark:border-gray-600 rounded-lg text-slate-700 dark:text-white bg-white dark:bg-gray-700 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-blue-400 dark:focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <FiEye className="h-5 w-5" />
              ) : (
                <FiEyeOff className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Profile Image */}
        <div>
          <label
            htmlFor="defaultPicture"
            className="block text-slate-900 dark:text-gray-200 font-semibold space-y-1"
          >
            Profile Image
            <div className="flex justify-center">
              <div className="h-15 w-15 rounded-full bg-slate-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                {defaultPicture ? (
                  <img
                    src={defaultPicture}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FiUser className="h-10 w-10 text-slate-400 dark:text-gray-500" />
                )}
              </div>
            </div>
            <span
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2 cursor-pointer border border-slate-200 dark:border-gray-600 rounded-lg text-slate-700 dark:text-gray-200 font-medium hover:bg-slate-50 dark:hover:bg-gray-700"
            >
              <FiUpload className="h-3 w-3" />
              Upload Profile Picture
            </span>
            <input
              type="file"
              name="defaultPicture"
              id="defaultPicture"
              accept="image/*"
              onChange={(e) => setDefaultPicture(e.target.files[0])}
              hidden
            />
          </label>
        </div>

        {/* Terms */}
        <label className="flex gap-2 items-center text-slate-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="h-2.5 w-2.5 rounded cursor-grab active:cursor-grabbing border-slate-300 dark:border-gray-600"
          />
          <span>
            I agree to the{" "}
            <NavLink
              to="#"
              className="text-blue-500 dark:text-blue-400 hover:underline"
            >
              Terms of Service
            </NavLink>{" "}
            &{" "}
            <NavLink
              to="#"
              className="text-blue-500 dark:text-blue-400 hover:underline"
            >
              Privacy Policy
            </NavLink>
            .
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white cursor-pointer font-semibold py-3 rounded-full transition-colors"
        >
          Sign Up
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center mt-1 mb-1 gap-3">
        <div className="flex-1 h-px bg-slate-200 dark:bg-gray-700" />
        <span className="text-slate-600 dark:text-gray-400">
          Or sign up with:
        </span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-gray-700" />
      </div>

      {/* Social */}
      <div className="flex items-center justify-center gap-10">
        <button
          type="button"
          aria-label="Sign up with Google"
          className="h-11 w-11 rounded-full cursor-pointer border border-slate-200 dark:border-gray-600 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5"
        >
          <img src={assets.googleIcon} alt="Google" className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Sign up with Facebook"
          className="h-11 w-11 rounded-full cursor-pointer border border-slate-200 dark:border-gray-600 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5"
        >
          <img src={assets.facebookIcon} alt="Facebook" className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Sign up with GitHub"
          className="h-11 w-11 rounded-full cursor-pointer border border-slate-200 dark:border-gray-600 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5"
        >
          <img src={assets.githubIcon} alt="GitHub" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default SignUpForm;
