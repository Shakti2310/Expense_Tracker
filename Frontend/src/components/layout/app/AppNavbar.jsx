import { Input } from "@/components/ui/input";
import useTheme from "@/hooks/useTheme";
import { Bell, Moon, Search, Sun } from "lucide-react";
import { NavLink } from "react-router";
import { useCurrentUser } from "@/hooks/useAuthUser.js";
import UserProfilePopover from "@/components/customUI/UserProfilePopover";

function AppNavbar() {
  const { theme, toggleTheme } = useTheme();
  const { data: user } = useCurrentUser();
  const name = user?.fullname || user?.username || "Profile";
  return (
    <header className="w-full sticky top-0 z-40 px-10 h-18 border-b border-sidebar-border/60 bg-sidebar flex justify-between items-center ">
      <div className="w-[30%] dark:bg-primary/5 rounded-full flex items-center gap-2 bg-primary/5">
        <div className="w-10 pl-2 border-r-2 flex items-center justify-center">
          <Search className="size-4" />
        </div>
        <input
          type="text"
          placeholder="Search anything..."
          className="w-[80%] overflow-hidden h-11 outline-none caret-transparent text-sm pr-1"
        />
      </div>
      <div className="flex gap-3 items-center">
        <div
          className="p-3 rounded-full bg-primary/5 hover:bg-primary/10 cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <Moon className="size-5" />
          ) : (
            <Sun className="size-5" />
          )}
        </div>
        <div className="p-3 rounded-full bg-primary/5 hover:bg-primary/10 cursor-pointer">
          <Bell className="size-5" />
        </div>
        <UserProfilePopover user={user} />
      </div>
    </header>
  );
}

export default AppNavbar;
