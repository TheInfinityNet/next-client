"use client";
import { AdditionalSidebar } from "@/components/layout/additional-sidebar";
import { NavigationMobile } from "@/components/layout/navigation-mobile";
import { NavigationSidebar } from "@/components/layout/navigation-sidebar";
import { NavigationTitle } from "@/components/layout/navigation-title";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <main className="flex">
        <aside className="hidden sm:flex sm:w-20 lg:w-80 p-4 flex-col flex-none">
          <NavigationTitle />
          <NavigationSidebar collapsable />
        </aside>
        <div className="flex-grow min-h-screen flex flex-col min-w-0">
          <div className="flex-grow w-full max-w-screen-md mx-auto">
            {children}
          </div>
          <div className="sm:hidden sticky bottom-0 left-0 right-0 z-10">
            <NavigationMobile />
          </div>
        </div>
        <aside className="hidden xl:flex w-80 flex-none">
          <AdditionalSidebar />
        </aside>
      </main>
    </div>
  );
}
