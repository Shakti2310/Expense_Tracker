import React from "react";
import assets from "../../assets/assets.js";
import { NavLink } from "react-router";
import { FiAtSign, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

function SignInForm({
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  onSubmitHandler,
}) {
  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm p-8 text-sm">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2">
        <img src={assets.logo} alt="NexusTech logo" className="h-8 w-8" />
        <span className="text-xl font-bold text-slate-900 dark:text-white">
          Xse<span className="text-blue-500 dark:text-blue-400">Track</span>
        </span>
      </div>

      <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-white mt-2">
        Sign In to XseTrack
      </h1>
      <p className="text-center text-slate-500 dark:text-gray-400 mt-1 mb-4">
        New to XseTrack?{" "}
        <NavLink
          to="/authentication/register"
          className="text-blue-500 dark:text-blue-400 font-medium hover:underline"
        >
          Create an account
        </NavLink>
      </p>

      <form onSubmit={onSubmitHandler} className="space-y-4">
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

        {/* Forgot Password */}
        <div className="text-end">
          <NavLink
            to="/authentication/forgot-password"
            className="text-blue-500 dark:text-blue-400 font-medium hover:underline"
          >
            Forgot your password?
          </NavLink>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white cursor-pointer font-semibold py-3 rounded-full transition-colors"
        >
          Sign In
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center mt-1 mb-1 gap-3">
        <div className="flex-1 h-px bg-slate-200 dark:bg-gray-700" />
        <span className="text-slate-600 dark:text-gray-400">
          Or sign in with:
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

export default SignInForm;
