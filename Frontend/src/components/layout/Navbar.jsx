import { NavLink, useNavigate } from "react-router";
import { Moon, Sun } from "lucide-react";
import useTheme from "../../hooks/useTheme.js";

function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="px-8 py-4 flex justify-around items-center">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">XseTrack</span>
        </NavLink>
        <div className="flex gap-10 text-gray-700 dark:text-white font-semibold items-center">
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </button>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/authentication/login")}
            className=" text-myGreenMD font-bold hover:text-myGreenMD/80 cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/authentication/register")}
            className="px-6 py-2.5 bg-gradient-to-r rounded-full from-myGreenMD to-myGreenSM text-white font-semibold hover:bg-gradient-to-r hover:from-myGreenMD/80 hover:to-myGreenSM/80 transition-all cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
