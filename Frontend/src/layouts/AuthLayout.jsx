import { Outlet, useLocation } from "react-router";

import assets from "../assets/assets";
import Logo from "@/components/customUI/Logo";

function AuthLayout() {
  const location = useLocation();

  return (
    <div className="min-h-dvh font-nunito flex bg-blue-200/50 dark:bg-gray-950 ">
      <div className="w-1/2  hidden md:flex items-center justify-center">
        <div className="text-center">
          <div>
            {location.pathname === "/authentication/login" ? (
              <img
                src={assets.loginImage}
                alt="Login"
                className="h-64 w-64 mx-auto"
              />
            ) : (
              <img
                src={assets.registerImage}
                alt="Register"
                className="h-64 w-64 mx-auto"
              />
            )}
          </div>
          <div className="flex items-center justify-center gap-2">
            <Logo size="text-2xl" />
          </div>
          <h1 className="text-3xl font-bold font-poppins mt-4 dark:text-white">
            {location.pathname === "/authentication/login"
              ? "Welcome Back!"
              : "Create Your Account!"}
          </h1>
          <p className="font-poppins mt-2 dark:text-gray-300">
            {location.pathname === "/authentication/login"
              ? "Sign in to access your account and manage your expenses."
              : "Create an account to start tracking your expenses."}
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
