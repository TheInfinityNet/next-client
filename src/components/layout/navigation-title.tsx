import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.svg";

export function NavigationTitle() {
  return (
    <Link href="/" className="flex gap-4">
      <div className="aspect-square size-11 ">
        <Image
          src={Logo}
          alt="Logo"
          width={44}
          height={44}
          className="w-full h-full object-contain"
        />
      </div>
      <span className="hidden lg:inline-block text-2xl font-bold my-auto">
        Infinity Net
      </span>
    </Link>
  );
}
