import { CompassIcon, HomeIcon, MenuIcon, UsersIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { NavigationSidebar } from "./navigation-sidebar";

export function NavigationMobile() {
  return (
    <div className="border-t-border border-t grid grid-cols-4 h-14 place-items-center bg-background">
      {[
        {
          href: "/explore",
          title: "Explore",
          icon: CompassIcon,
        },
        {
          href: "/groups",
          title: "Groups",
          icon: UsersIcon,
        },
        {
          href: "/",
          title: "Home",
          icon: HomeIcon,
        },
      ].map((item) => (
        <Button variant={"ghost"} key={item.title} asChild>
          <Link href={item.href}>
            <item.icon className="size-7" />
          </Link>
        </Button>
      ))}

      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"}>
            <MenuIcon className="size-7" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"bottom"}>
          <SheetHeader>
            <SheetDescription>
              <NavigationSidebar />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
