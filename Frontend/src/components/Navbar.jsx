import logo from "../assets/logo.png";
import logout from "../assets/logout.png";
import { NavLink } from "react-router";

function Navbar() {
  return (
    <>
      <div className="bg-white/10 shadow-black/5 shadow-lg w-full h-[12%] fixed top-0 flex justify-around items-center">
        <div className="flex gap-1">
          <img className="size-12" src={logo} />
          <div>
            <h1 className="font-semibold text-2xl text-white">Expanse</h1>
            <h2 className="text-xs">Tracker</h2>
          </div>
        </div>
        <div className="flex text-white/40 font-semibold gap-25">
          <MenuItem item={"Home"} />
          <MenuItem item={"Expenses"} />
          <MenuItem item={"About"} />
          <MenuItem item={"Contact"} />
        </div>
        <button
          className="flex text-sm hover:bg-white/15 active:bg-white/30 cursor-pointer font-semibold items-center gap-1 border-3 border-white rounded-3xl pr-4 pl-4 pt-1 pb-1"
          type="button"
        >
          <img className="size-3" src={logout} />
          logout
        </button>
      </div>
    </>
  );
}

function MenuItem({ item }) {
  const path = item === "Home" ? "/" : item;
  return (
    <>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `hover:text-white/70 ${
            isActive ? "text-white transition-all ease-in-out" : ""
          }`
        }
      >
        {item}
      </NavLink>
    </>
  );
}

export default Navbar;
