import React, { useState } from "react";
import { NavLink } from "react-router";
import { FaChartSimple } from "react-icons/fa6";
import { MdSpaceDashboard, MdInfoOutline } from "react-icons/md";
import { GrTransaction, GrContactInfo } from "react-icons/gr";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { TbSettings, TbSearch } from "react-icons/tb";
import { IoCloseCircle } from "react-icons/io5";

function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");

  const mainMenuItems = [
    { to: "Dashboard", label: "Dashboard", icon: FaChartSimple },
    { to: "Expenses", label: "Transactions", icon: GrTransaction },
    {
      to: "Categories",
      label: "Categories",
      icon: MdSpaceDashboard,
      badge: "New",
    },
    { to: "Budgets", label: "Budgets", icon: RiMoneyRupeeCircleLine },
  ];

  const otherItems = [
    { to: "About", label: "About", icon: MdInfoOutline },
    { to: "Contact", label: "Contact", icon: GrContactInfo },
  ];

  const NavItem = ({ to, label, icon: Icon, badge }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all border-none bg-transparent w-full text-left ${
          isActive
            ? "bg-green-100/30 dark:bg-green-500/10 text-myGreenMD font-semibold"
            : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
        }`
      }
    >
      <span className="flex items-center justify-center w-6 h-6 flex-shrink-0">
        <Icon size={18} />
      </span>
      <span className="flex-1 text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap">
        {label}
      </span>
      {badge && (
        <span className="inline-flex items-center justify-center min-w-max h-5 px-1.5 bg-myGreenMD text-white text-xs font-semibold rounded flex-shrink-0">
          {badge}
        </span>
      )}
    </NavLink>
  );

  return (
    <div className="w-[280px] h-screen bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col font-poppins overflow-hidden">
      <style>{`
        .sidebar-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.2);
          border-radius: 3px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.4);
        }
      `}</style>

      {/* Logo Header */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2.5 flex-1">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-myGreenMD to-myGreenSM text-white rounded-lg font-bold text-base flex-shrink-0">
            X
          </div>
          <span className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
            XseTrack
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2.5 px-4 py-3 mx-4 my-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg transition-all focus-within:bg-gray-100 dark:focus-within:bg-gray-800 focus-within:border-myGreenMD">
        <TbSearch
          size={18}
          className="text-gray-400 dark:text-gray-500 flex-shrink-0"
        />
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent border-none outline-none w-full text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-poppins"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="flex items-center justify-center bg-transparent border-none text-gray-300 dark:text-gray-600 cursor-pointer p-0 transition-all hover:text-gray-400 dark:hover:text-gray-400"
            onClick={() => setSearchQuery("")}
          >
            <IoCloseCircle size={18} />
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="sidebar-scroll flex-1 overflow-y-auto overflow-x-hidden py-2">
        {/* Main Menu Section */}
        <nav className="p-0 mb-6">
          <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-5 pt-3 pb-2 m-0">
            Main menu
          </h3>
          <div className="flex flex-col gap-0.5 px-2">
            {mainMenuItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </div>
        </nav>

        {/* Support Card */}
        <div className="mx-4 px-4 py-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-500/10 dark:to-blue-500/10 border border-green-100/50 dark:border-green-500/20 rounded-xl text-center transition-all hover:border-green-300/50 dark:hover:border-green-500/30 hover:from-green-100/40 hover:to-green-50 dark:hover:from-green-500/15 dark:hover:to-green-500/10">
          <div className="text-2xl mb-2">💡</div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white m-0 mb-1.5">
            Need help?
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 m-0 mb-3 leading-relaxed">
            Contact us for assistance with your expenses
          </p>
          <button className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-green-300/30 dark:border-green-500/30 text-myGreenMD rounded-lg text-xs font-semibold cursor-pointer transition-all hover:bg-green-50/50 dark:hover:bg-green-500/10 hover:border-myGreenMD font-poppins">
            Get Support
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-1 px-2 pt-3 pb-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
        <NavLink
          to="Settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all border-none bg-transparent w-full text-left ${
              isActive
                ? "bg-green-100/30 dark:bg-green-500/10 text-myGreenMD font-semibold"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
            }`
          }
        >
          <TbSettings size={18} className="flex-shrink-0" />
          <span>Settings</span>
        </NavLink>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 dark:text-red-400 cursor-pointer transition-all border-none bg-transparent w-full text-left hover:bg-red-50/50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-300 font-poppins">
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
