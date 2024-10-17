import { Input } from "../ui/input";

export function AdditionalSidebar() {
  return (
    <div className="h-full flex flex-col p-4">
      <Input placeholder="Search" />
      <div className="flex-1" />
      <footer className="">
        <span>© 2024 Infinity Net</span>
      </footer>
    </div>
  );
}
