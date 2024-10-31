import { cn } from "@/lib/utils";
import {
  BellIcon,
  HomeIcon,
  MessageSquareIcon,
  SettingsIcon,
  UsersIcon,
  UserIcon,
  CompassIcon,
  SearchIcon,
  SunIcon,
  UserPlusIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCurrentUserProfile } from "@/hooks/use-current-user-profile-store";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
  hideOnDesktop?: boolean;
}

const navItems: NavItem[] = [
  { title: "Home", href: "/", icon: HomeIcon, requiresAuth: true },
  { title: "Search", href: "/search", icon: SearchIcon, hideOnDesktop: true },
  {
    title: "Notifications",
    href: "/notifications",
    icon: BellIcon,
    requiresAuth: true,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquareIcon,
    requiresAuth: true,
  },
  {
    title: "Friends",
    href: "/friends",
    icon: UserPlusIcon,
    requiresAuth: true,
  },
  { title: "Groups", href: "/groups", icon: UsersIcon, requiresAuth: true },
  { title: "Profile", href: "/profile", icon: UserIcon, requiresAuth: true },
  { title: "Explore", href: "/explore", icon: CompassIcon },
  {
    title: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    requiresAuth: true,
  },
  { title: "Theme", href: "/theme", icon: SunIcon, hideOnDesktop: true },
];

export const NavigationSidebar: React.FC<{ collapsable?: boolean }> = ({
  collapsable,
}) => {
  const currentUserProfile = useCurrentUserProfile();

  return (
    <nav className="grid">
      {navItems.map(
        ({ title, href, icon: Icon, requiresAuth, hideOnDesktop }) => {
          const isAuthDisabled = requiresAuth && !currentUserProfile;

          return (
            <Button
              variant="ghost"
              key={title}
              asChild
              className={cn(
                "gap-4",
                isAuthDisabled && "text-muted-foreground pointer-events-none",
                hideOnDesktop && "xl:hidden",
              )}
            >
              <Link href={href} prefetch={false}>
                <Icon className="size-7" />
                <span
                  className={cn(
                    "w-full text-start",
                    collapsable ? "hidden lg:inline" : "lg:inline",
                  )}
                >
                  {title}
                </span>
              </Link>
            </Button>
          );
        },
      )}
    </nav>
  );
};
