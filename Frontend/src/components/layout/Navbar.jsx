import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import useTheme from "../../hooks/useTheme.js";
import SideMenuMobile from "./SideMenuMobile.jsx";

function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const navItems = [
    { label: "About", to: "/about" },
    { label: "Contact Us", to: "/contact" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  const navigateTo = (path) => {
    closeMenu();
    navigate(path);
  };

  const linkClassName = ({ isActive }) =>
    `rounded-lg px-3 py-2 transition-colors ${
      isActive
        ? "bg-myGreenMD/10 text-myGreenMD dark:bg-myGreenSM/10 dark:text-myGreenSM"
        : "text-gray-700 hover:bg-gray-100 hover:text-myGreenMD dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-myGreenSM"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/85 shadow-sm backdrop-blur-md dark:border-gray-800/80 dark:bg-gray-950/85">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 justify-center">
          <SideMenuMobile />
          <NavLink to="/" onClick={closeMenu} aria-label="XseTrack home">
            <div className="font-poppins text-xl font-bold tracking-tight text-gray-900 transition-opacity hover:opacity-80 dark:text-white sm:text-2xl">
              XseTrack
            </div>
          </NavLink>
        </div>

        <nav className=" flex items-center gap-1" aria-label="Main navigation">
          <div className="hidden md:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClassName}>
                {item.label}
              </NavLink>
            ))}
          </div>
          <button
            onClick={toggleTheme}
            className="ml-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
          </button>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={() => navigateTo("/authentication/login")}
            className="cursor-pointer rounded-lg px-3 py-2 font-semibold text-myGreenMD transition-colors hover:bg-myGreenMD/10 dark:text-myGreenSM dark:hover:bg-myGreenSM/10"
          >
            Sign In
          </button>
          <button
            onClick={() => navigateTo("/authentication/register")}
            className="cursor-pointer rounded-full bg-gradient-to-r from-myGreenMD to-myGreenSM px-5 py-2.5 font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
