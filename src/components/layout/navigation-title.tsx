import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.svg";

export function NavigationTitle() {
  return (
    <Link href="/" className="flex gap-4 justify-center">
      <div className="aspect-square size-10">
        <Image
          src={Logo}
          alt="Logo"
          width={44}
          height={44}
          className="w-full h-full object-contain "
        />
      </div>
      <span className="hidden lg:inline-block text-xl font-bold my-auto w-full">
        Infinity Net
      </span>
    </Link>
  );
}
