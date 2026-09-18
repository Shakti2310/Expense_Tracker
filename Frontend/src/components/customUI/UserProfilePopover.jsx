import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useLogoutUser } from "@/hooks/useAuthUser.js";
import { BadgeCheck, CalendarDays, LogOut, Mail, Settings } from "lucide-react";
import { NavLink } from "react-router";

function UserProfilePopover({ user }) {
  const { mutate: logout, isPending } = useLogoutUser();
  const displayName = user?.fullname || user?.username || "Your profile";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <Popover>
      <PopoverTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
        {user?.defaultPicture ? (
          <img
            className="size-10 rounded-full object-cover ring-2 ring-transparent transition hover:ring-primary/40"
            src={user.defaultPicture}
            alt={`${displayName}'s profile`}
          />
        ) : (
          <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground ring-2 ring-transparent transition hover:ring-primary/40">
            {initials || "?"}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={12}
        className="w-80 gap-0 overflow-hidden p-0"
      >
        <PopoverHeader className="border-b border-border mx-4 p-4">
          <div className="flex items-center gap-3">
            {user?.defaultPicture ? (
              <img
                className="size-12 rounded-full object-cover ring-2 ring-background shadow-sm"
                src={user.defaultPicture}
                alt=""
              />
            ) : (
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground ring-2 ring-background shadow-sm">
                {initials || "?"}
              </span>
            )}
            <div className="min-w-0">
              <PopoverTitle className="truncate text-base font-semibold">
                {displayName}
              </PopoverTitle>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                @{user?.username || "user"}
              </p>
            </div>
            {user?.isVerified && (
              <BadgeCheck
              color="#04ff00"
                className="ml-auto size-4 shrink-0 text-primary "
                aria-label="Verified account"
              />
            )}
          </div>
        </PopoverHeader>

        <div className="space-y-3 p-4">
          <div className="flex pl-2 items-center gap-2 text-xs text-muted-foreground">
            <Mail className="size-3.5 shrink-0" />
            <span className="truncate">
              {user?.email || "No email available"}
            </span>
          </div>
          {memberSince && (
            <div className="flex pl-2 items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays className="size-3.5 shrink-0" />
              <span>Member since {memberSince}</span>
            </div>
          )}

          <div className="border-t border-border pt-3">
            <Button asChild variant="ghost" className="w-full justify-start">
              <NavLink
                to="/settings"
                className="flex w-full items-center gap-2"
                
              >
                <Settings className="inline-block" />
                Settings
              </NavLink>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive pl-3"
              onClick={() => logout()}
              disabled={isPending}
            >
              <LogOut />
              {isPending ? "Signing out..." : "Sign out"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default UserProfilePopover;
