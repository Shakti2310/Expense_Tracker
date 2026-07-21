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
    <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-xs">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2">
        <img src={assets.logo} alt="XseTrack logo" className="h-8 w-8" />
        <span className="text-xl font-bold text-slate-900">
          Xse<span className="text-blue-500">Track</span>
        </span>
      </div>

      <h1 className="text-2xl font-bold text-center text-slate-900 mt-2">
        Sign Up to XseTrack
      </h1>
      <p className="text-center text-slate-500 mt-1 mb-1">
        Already have an account?{" "}
        <NavLink
          to="/authentication/login"
          className="text-blue-500 font-medium hover:underline"
        >
          Log In
        </NavLink>
      </p>

      <form onSubmit={onSubmitHandler} className="space-y-2">
        {/* Username */}
        <div>
          <label className="block text-slate-900 font-semibold">Username</label>
          <div className="relative">
            <FiAtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              placeholder="@yourusername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-slate-900 font-semibold">
            Full Name
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              placeholder="John Doe"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-slate-900 font-semibold">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-slate-900 font-semibold">Password</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
            className="block text-slate-900 font-semibold space-y-1"
          >
            Profile Image
            <div className="flex justify-center">
              <div className="h-15 w-15 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                {defaultPicture ? (
                  <img
                    src={defaultPicture}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FiUser className="h-10 w-10 text-slate-400" />
                )}
              </div>
            </div>
            <span
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2 cursor-pointer border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
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
        <label className="flex gap-2 items-center text-slate-700">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="h-2.5 w-2.5 rounded cursor-grab active:cursor-grabbing border-slate-300"
          />
          <span>
            I agree to the{" "}
            <NavLink to="#" className="text-blue-500 hover:underline">
              Terms of Service
            </NavLink>{" "}
            &{" "}
            <NavLink to="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </NavLink>
            .
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white cursor-pointer font-semibold py-3 rounded-full transition-colors"
        >
          Sign Up
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center mt-1 mb-1 gap-3">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-slate-600">Or sign up with:</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* Social */}
      <div className="flex items-center justify-center gap-10">
        <button
          type="button"
          aria-label="Sign up with Google"
          className="h-11 w-11 rounded-full cursor-pointer border border-slate-200 flex items-center justify-center hover:bg-black/5"
        >
          <img src={assets.googleIcon} alt="Google" className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Sign up with Facebook"
          className="h-11 w-11 rounded-full cursor-pointer border border-slate-200 flex items-center justify-center hover:bg-black/5"
        >
          <img src={assets.facebookIcon} alt="Facebook" className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Sign up with GitHub"
          className="h-11 w-11 rounded-full cursor-pointer border border-slate-200 flex items-center justify-center hover:bg-black/5"
        >
          <img src={assets.githubIcon} alt="GitHub" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default SignUpForm;
