"use client";

import { usePathname } from "next/navigation";
import { ExpandingMenuButton } from "@/components/ui/expanding-menu-button";

export function SiteHeader() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/portfolio-hero") return null;

  return (
    <header className="pointer-events-none fixed right-4 top-4 z-[300] sm:right-6 sm:top-5">
      <ExpandingMenuButton />
    </header>
  );
}
