import { Outlet } from "react-router";
import AppSidebar from "../components/layout/app/AppSidebar.jsx";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppNavbar from "@/components/layout/app/AppNavbar.jsx";

function AppLayout() {
  return (
    <div className="font-nunito flex">
      <SidebarProvider>
          <AppSidebar />
          <div className="h-dvh min-w-0 w-full overflow-y-auto bg-gray-100 scrollbar-none dark:bg-black">
            <AppNavbar />
            <Outlet />
          </div>
      </SidebarProvider>
    </div>
  );
}

export default AppLayout;
