import { useState } from "react";
import { Outlet } from "react-router";
import { LoggingContext } from "../contexts/LoggingContext.jsx";
import AppSidebar from "../components/layout/AppSidebar.jsx";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

function AppLayout() {
  const [isLogged, setIsLogged] = useState(true);
  return (
    <div className="min-h-dvh font-nunito flex">
      <SidebarProvider>
        <LoggingContext.Provider value={setIsLogged}>
          <AppSidebar />
          <div className="w-full overflow-hidden bg-gray-100 dark:bg-gray-950">
            <SidebarTrigger />
            <Outlet />
          </div>
        </LoggingContext.Provider>
      </SidebarProvider>
    </div>
  );
}

export default AppLayout;
