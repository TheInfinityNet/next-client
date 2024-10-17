import {
  BellIcon,
  HomeIcon,
  MessageSquareIcon,
  SettingsIcon,
  UsersIcon,
  UserIcon,
  CompassIcon,
} from "lucide-react";
import Link from "next/link";

export function NavigationSidebar() {
  return (
    <nav>
      {[
        {
          title: "Home",
          href: "/",
          icon: HomeIcon,
        },
        {
          title: "Notifications",
          href: "/notifications",
          icon: BellIcon,
        },
        {
          title: "Messages",
          href: "/messages",
          icon: MessageSquareIcon,
        },
        {
          title: "Groups",
          href: "/groups",
          icon: UsersIcon,
        },
        {
          title: "Profile",
          href: "/profile",
          icon: UserIcon,
        },
        {
          title: "Explore",
          href: "/explore",
          icon: CompassIcon,
        },
        {
          title: "Settings",
          href: "/settings",
          icon: SettingsIcon,
        },
      ].map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
          prefetch={false}
        >
          <item.icon className="size-7" />
          <span className="hidden lg:inline-block">{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}
