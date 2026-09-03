import React from "react";
import { NavLink } from "react-router";

function Logo({ size = "text-xl" }) {
  return (
    <NavLink
      to="/"
      aria-label="XseTrack home"
      className={`font-poppins ${size} font-bold tracking-tight text-gray-900 transition-opacity hover:opacity-80 dark:text-white sm:text-2xl`}
    >
      <div>
        Xse<span className="font-bold text-myGreenMD">Track</span>
      </div>
    </NavLink>
  );
}

export default Logo;
