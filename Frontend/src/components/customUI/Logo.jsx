import React from "react";

function Logo({ size = "text-xl" }) {
  return (
    <div
      className={`font-poppins ${size} font-bold tracking-tight text-gray-900 transition-opacity hover:opacity-80 dark:text-white sm:text-2xl`}
    >
      <div>
        Xse<span className="font-bold text-myGreenMD">Track</span>
      </div>
    </div>
  );
}

export default Logo;
