"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FocusEvent, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { navigation } from "@/content/site";
import { cn } from "@/lib/utils";

export function ExpandingMenuButton() {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setExpanded(false), 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        root.current,
        { opacity: 0, y: -16, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.15, ease: "power3.out" },
      );
    },
    { scope: root },
  );

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false);
  };

  const supportsHover = () => window.matchMedia("(hover: hover)").matches;

  return (
    <div
      ref={root}
      className="relative pointer-events-auto"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => {
        if (supportsHover()) setExpanded(true);
      }}
      onBlur={handleBlur}
    >
      <div
        className={cn(
          "relative flex h-14 w-[116px] items-center justify-end overflow-hidden rounded-full border border-white/15 bg-[#050a12]/80 text-[#f5f2e9] shadow-[0_18px_60px_rgba(0,0,0,.3)] backdrop-blur-2xl transition-[width,border-color,background-color] duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
          expanded && "border-white/25 bg-[#081326]/95 sm:w-[min(430px,calc(100vw-32px))]",
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent"
        />

        <nav
          className={cn(
            "hidden min-w-0 flex-1 items-center justify-end pl-3 opacity-0 transition-opacity duration-300 sm:flex",
            expanded && "opacity-100 delay-150",
          )}
          aria-label="Primary navigation"
          aria-hidden={!expanded}
        >
          {navigation.map((item) => {
            const active = pathname === item.href ||
              (item.href === "/projects" && pathname.startsWith("/projects/"));
            return (
              <Link
                key={item.href}
                className={cn(
                  "relative whitespace-nowrap px-3 py-3 text-[0.7rem] font-semibold text-white/55 transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none",
                  active && "text-white",
                )}
                href={item.href}
                tabIndex={expanded ? 0 : -1}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          className="relative z-10 flex h-full w-[116px] shrink-0 cursor-pointer items-center justify-center gap-3 border-0 bg-transparent px-4 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-[#f5f2e9] focus-visible:outline-none"
          type="button"
          aria-expanded={expanded}
          aria-controls="expanding-navigation"
          onClick={() => {
            if (supportsHover()) {
              setExpanded(true);
              return;
            }
            setExpanded((current) => !current);
          }}
        >
          <span>Menu</span>
          <span className="relative grid size-5 place-items-center">
            <Menu
              aria-hidden="true"
              className={cn("absolute transition-all duration-300", expanded && "rotate-90 opacity-0")}
              size={17}
            />
            <X
              aria-hidden="true"
              className={cn("absolute -rotate-90 opacity-0 transition-all duration-300", expanded && "rotate-0 opacity-100")}
              size={17}
            />
          </span>
        </button>
      </div>

      <div
        id="expanding-navigation"
        className={cn(
          "absolute right-0 top-[4.1rem] w-[min(280px,calc(100vw-28px))] origin-top-right rounded-2xl border border-white/15 bg-[#050a12]/95 p-2 text-[#f5f2e9] opacity-0 shadow-[0_24px_70px_rgba(0,0,0,.42)] backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] pointer-events-none translate-y-[-8px] scale-95 sm:hidden",
          expanded && "pointer-events-auto translate-y-0 scale-100 opacity-100",
        )}
        aria-hidden={!expanded}
      >
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              className="grid grid-cols-[34px_1fr] items-baseline border-b border-white/10 px-3 py-3.5 text-xl tracking-[-0.035em] last:border-0"
              href={item.href}
              tabIndex={expanded ? 0 : -1}
            >
              <span className="text-[0.58rem] tracking-[0.08em] text-white/35">0{index + 1}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
