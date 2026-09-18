import {
  Compass,
  ArrowLeftRight,
  LayoutGrid,
  Wallet,
  Lightbulb,
  Settings,
  LogOut,
  ChartNoAxesCombined,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Logo from "../../customUI/Logo";
import { NavLink } from "react-router";
import { useLogoutUser } from "@/hooks/useAuthUser";

// Swap `onClick` for `asChild` + your router's <Link> once routes are wired up.
const NAV_ITEMS = [
  { label: "Dashboard", icon: Compass },
  { label: "Expenses", icon: ArrowLeftRight },
  { label: "Categories", icon: LayoutGrid, badge: "New" },
  { label: "Budgets", icon: Wallet },
];

function AppSidebar() {
  const { toggleSidebar } = useSidebar();
  const logoutMutation = useLogoutUser();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="gap-3 border-b border-sidebar-border/60 pb-3">
        <div className="flex items-center justify-between gap-2 px-1 pt-1">
          <SidebarMenu className="flex-1">
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                tooltip="XseTrack"
                className="gap-2.5 px-1.5 hover:bg-transparent active:bg-transparent group-data-[collapsible=icon]:size-11! group-data-[collapsible=icon]:[&_svg]:size-5 group-data-[collapsible=icon]:p-3!"
              >
                <ChartNoAxesCombined
                  className="size-5 shrink-0 text-primary"
                  onClick={toggleSidebar}
                />
                <Logo
                  className="text-lg font-semibold tracking-tight group-data-[collapsible=icon]:hidden"
                  to="/dashboard"
                />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <SidebarTrigger className="size-8 shrink-0 rounded-lg border border-sidebar-border text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground group-data-[collapsible=icon]:hidden" />
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-1 py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-[11px] font-medium text-muted-foreground/80">
            Main menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 ">
              {NAV_ITEMS.map(({ label, icon: Icon, badge }) => (
                <NavLink to={`/${label.toLowerCase()}`} key={label}>
                  {({ isActive }) => (
                    <SidebarMenuItem
                      className="relative flex justify-center "
                      key={label}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary group-data-[collapsible=icon]:hidden" />
                      )}
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={label}
                        className="h-10 rounded-lg pl-3 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent data-[active=true]:bg-primary/10 data-[active=true]:font-medium data-[active=true]:text-primary group-data-[collapsible=icon]:size-11! group-data-[collapsible=icon]:[&_svg]:size-5 group-data-[collapsible=icon]:p-3! "
                      >
                        <Icon />
                        <span>{label}</span>
                      </SidebarMenuButton>
                      {badge && (
                        <SidebarMenuBadge className="bg-primary rounded-full px-1.5 dark:text-black text-white">
                          {badge}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  )}
                </NavLink>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto group-data-[collapsible=icon]:hidden">
          <SidebarGroupContent>
            <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-4 text-center">
              <Lightbulb className="mx-auto mb-2 h-5 w-5 text-primary" />
              <p className="text-sm font-medium text-sidebar-foreground">
                Need help?
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Contact us for assistance with your expenses
              </p>
              <NavLink to="/support">
                <Button
                  size="sm"
                  variant="secondary"
                  className="mt-3 w-full text-primary"
                >
                  Get support
                </Button>
              </NavLink>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator className="mx-auto" />

      <SidebarFooter className="gap-1 pt-2">
        <SidebarMenu className="gap-1">
          <SidebarMenuItem>
            <NavLink to="/settings">
              {({ isActive }) => (
                <SidebarMenuButton
                  tooltip="Settings"
                  isActive={isActive}
                  className="h-10 rounded-lg text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent data-[active=true]:bg-primary/10 data-[active=true]:text-primary group-data-[collapsible=icon]:size-11! group-data-[collapsible=icon]:[&_svg]:size-5 group-data-[collapsible=icon]:p-3!"
                >
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              )}
            </NavLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Log out"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 group-data-[collapsible=icon]:size-11! group-data-[collapsible=icon]:[&_svg]:size-5 group-data-[collapsible=icon]:p-3.5!"
            >
              <LogOut />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
