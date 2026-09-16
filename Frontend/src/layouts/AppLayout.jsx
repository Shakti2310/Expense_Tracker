import { Outlet } from "react-router";
import AppSidebar from "../components/layout/app/AppSidebar.jsx";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppNavbar from "@/components/layout/app/AppNavbar.jsx";

function AppLayout() {
  return (
    <div className="min-h-dvh font-nunito flex ">
      <SidebarProvider>
          <AppSidebar />
          <div className="w-full bg-gray-00 dark:bg-black">
            <AppNavbar />
            <Outlet />
          </div>
      </SidebarProvider>
    </div>
  );
}

export default AppLayout;
