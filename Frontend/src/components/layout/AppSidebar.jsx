import {
  LayoutDashboard,
  ArrowLeftRight,
  LayoutGrid,
  Wallet,
  Search,
  Lightbulb,
  Settings,
  LogOut,
  Frame,
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
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "../customUI/Logo";
import { NavLink } from "react-router";

// Swap `onClick` for `asChild` + your router's <Link> once routes are wired up.
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Expenses", icon: ArrowLeftRight },
  { label: "Categories", icon: LayoutGrid, badge: "New" },
  { label: "Budgets", icon: Wallet },
];

function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="XseTrack">
              <Frame className="size-5.5! stroke-3 p-1.5 bg-myGreenMD rounded-md" />
              <Logo className="text-xl" to="/dashboard" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="px-2 pt-1 group-data-[collapsible=icon]:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="h-9 bg-sidebar-accent/40 pl-8 text-sm border-sidebar-border"
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map(({ label, icon: Icon, badge }) => (
                <NavLink to={`/${label.toLowerCase()}`} key={label}>
                  {({ isActive }) => (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={label}
                        className="data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-medium"
                      >
                        <Icon />
                        <span>{label}</span>
                      </SidebarMenuButton>
                      {badge && (
                        <SidebarMenuBadge className="bg-primary text-primary-foreground rounded-full px-1.5">
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

      <SidebarSeparator />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <NavLink to="/settings">
              <SidebarMenuButton tooltip="Settings">
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </NavLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Log out"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
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
