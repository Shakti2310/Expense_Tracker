import React from "react";
import assets from "../../assets/assets.js";
import AuthInput from "../../components/auth/AuthInput.jsx";
import { useNavigate } from "react-router";

function SignUpForm({
  fullname,
  setFullname,
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  defaultPicture,
  setDefaultPicture,
  onSubmitHandler,
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="space-y-2 text-center mb-5">
          <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-myGreenMD to-myGreenSM rounded-xl mx-auto">
            <span className="text-white font-bold text-lg">X</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">
            Create Account
          </h1>
          <p className="text-gray-600 text-xs">
            Join us to start tracking your expenses
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={onSubmitHandler}>
          <div className="grid grid-cols-3 gap-4">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center justify-start space-y-3 pb-4 border-r border-gray-200">
              <label
                htmlFor="defaultPicture"
                className="flex flex-col items-center cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-myGreenMD/20 to-myGreenSM/20 border-2 border-dashed border-myGreenMD flex items-center justify-center hover:bg-myGreenMD/30 transition-colors">
                  <img
                    className="w-9 object-contain"
                    src={
                      defaultPicture ? assets.uploadSuccess : assets.uploadImg
                    }
                    alt="Upload"
                  />
                </div>
                <span className="text-xs text-myGreenMD font-semibold mt-2 hover:text-myGreenSM transition-colors">
                  {defaultPicture ? "Change Photo" : "Upload Photo"}
                </span>
              </label>
              <input
                type="file"
                name="defaultPicture"
                id="defaultPicture"
                accept="image/*"
                onChange={(e) => setDefaultPicture(e.target.files[0])}
                hidden
              />

              {/* Already have account */}
              <div className="mt-auto pt-4 border-t border-gray-200 w-full text-center">
                <p className="text-xs text-gray-600 mb-1">
                  Already have an account?
                </p>
                <button
                  className="text-myGreenMD hover:text-myGreenSM font-semibold text-xs transition-colors active:scale-95"
                  type="button"
                  onClick={() => navigate("/authentication/login")}
                >
                  Sign In
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="col-span-2 space-y-3">
              <AuthInput
                name={"Full Name"}
                type={"text"}
                msg={"Enter your full name"}
                setValue={setFullname}
                value={fullname}
              />
              <AuthInput
                name={"Email"}
                type={"email"}
                msg={"Enter your email address"}
                setValue={setEmail}
                value={email}
              />
              <AuthInput
                name={"Username"}
                type={"text"}
                msg={"Choose a username"}
                setValue={setUsername}
                value={username}
              />
              <AuthInput
                name={"Password"}
                type={"password"}
                msg={"Create a strong password"}
                setValue={setPassword}
                value={password}
              />

              {/* Remember Checkbox */}
              <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                />
                <span>I agree to the terms and conditions</span>
              </label>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            className="w-full bg-gradient-to-r from-myGreenMD to-myGreenSM hover:shadow-lg hover:scale-[1.02] active:scale-95 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-myGreenMD/50"
            type="submit"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
