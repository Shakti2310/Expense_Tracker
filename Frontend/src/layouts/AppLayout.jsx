import { useState } from "react";
import { Outlet } from "react-router";
import { LoggingContext } from "../contexts/LoggingContext.jsx";
import AppSidebar from "../components/layout/app/AppSidebar.jsx";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppNavbar from "@/components/layout/app/AppNavbar.jsx";

function AppLayout() {
  const [isLogged, setIsLogged] = useState(true);
  return (
    <div className="min-h-dvh font-nunito flex">
      <SidebarProvider>
        <LoggingContext.Provider value={setIsLogged}>
          <AppSidebar />
          <div className="w-full bg-gray-100 dark:bg-black">
            <AppNavbar />
            <Outlet />
          </div>
        </LoggingContext.Provider>
      </SidebarProvider>
    </div>
  );
}

export default AppLayout;
