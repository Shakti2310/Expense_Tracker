import { NavLink } from "react-router";

function Navbar() {
  return (
    <>
      <div className="w-full h-[12%] fixed top-0 flex justify-around items-center">
        <div className="flex gap-1">
          <h1 className="text-3xl font-extralight">
            Xse<span className="text-green-400 font-bold">Track</span>
          </h1>
        </div>
        <div className="flex font-extralight text-white/40 gap-15">
          <MenuItem item={"Home"} />
          <MenuItem item={"Expenses"} />
          <MenuItem item={"Github"} />
          <MenuItem item={"About Us"} />
          <MenuItem item={"Contact"} />
        </div>
        <div className="space-x-5 text-sm font-light">
          <button
            className="cursor-pointer hover:text-shadow-2xs hover:text-shadow-white"
            type="button"
          >
            Log In
          </button>
          <button
            className="p-2 pr-6 pl-6 cursor-pointer font-medium hover:bg-green-600 bg-green-500 rounded-3xl"
            type="button"
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

function MenuItem({ item }) {
  let path = item;
  if (item === "Home") path = "/";
  else if (item === "Github")
    path = "https://github.com/Shakti2310/Expense_Tracker";

  return (
    <>
      <NavLink
        to={path}
        target={item === "Github" ? "_blank" : ""}
        className={({ isActive }) =>
          ` hover:text-shadow-xs hover:text-shadow-white ${
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
