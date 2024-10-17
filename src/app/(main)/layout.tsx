export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <main className="flex w-full mx-auto md:grid sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto]">
        <aside className="hidden  sm:block sm:w-20 lg:w-80">Left Sidebar</aside>
        <div className="w-full min-h-screen">
          <div className="min-h-[calc(100vh-3.5rem)] sm:min-h-screen w-full max-w-screen-md mx-auto">
            {children}
          </div>
          <div className="sm:hidden sticky bottom-0 left-0 right-0 z-10  h-14">
            Mobile Navbar
          </div>
        </div>
        <aside className="hidden xl:block w-80">Right Sidebar</aside>
      </main>
    </div>
  );
}
