import React from "react";
import { NavLink } from "react-router";

function Logo({ className = "", to = "/" }) {
  return (
    <NavLink
      to={to}
      aria-label="XseTrack home"
      className={`font-poppins ${className} font-bold tracking-tight text-gray-900 transition-opacity hover:opacity-80 dark:text-white sm:text-2xl`}
    >
      <div>
        Xse<span className="font-bold text-myGreenMD">Track</span>
      </div>
    </NavLink>
  );
}

export default Logo;
