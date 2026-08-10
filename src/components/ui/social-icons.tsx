"use client";

import { useState, type ReactNode } from "react";

export interface SocialLink {
  name: string;
  href: string;
  icon: ReactNode;
}

export interface SocialIconsProps {
  links?: SocialLink[];
  className?: string;
}

const defaultSocials: SocialLink[] = [
  {
    name: "Email",
    href: "https://example.com/contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]" aria-hidden="true">
        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.2-7.4 4.62a1.15 1.15 0 0 1-1.2 0L4 8.2V6.3l8 5 8-5V8.2Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://example.com/linkedin",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "CV",
    href: "https://example.com/cv",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]" aria-hidden="true">
        <path d="M6 2h8.6L20 7.4V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.8V8h4.2L14 3.8ZM8 12v1.6h8V12H8Zm0 3.4V17h8v-1.6H8Z" />
      </svg>
    ),
  },
];

export function SocialIcons({ links = defaultSocials, className = "" }: SocialIconsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <nav
      className={`relative flex items-center gap-0.5 rounded-2xl border border-white/[0.08] bg-neutral-950 px-1.5 py-1.5 ${className}`.trim()}
      aria-label="Social profiles"
      onMouseLeave={() => setActiveIndex(null)}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent"
        aria-hidden="true"
      />

      {links.map((social, index) => {
        const isActive = activeIndex === index;

        return (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex size-10 items-center justify-center rounded-xl transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onBlur={() => setActiveIndex(null)}
            aria-label={social.name}
          >
            <span
              className={`absolute inset-1 rounded-lg bg-white/[0.08] transition-all duration-300 ease-out motion-reduce:transition-none ${
                isActive ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
              aria-hidden="true"
            />

            <span
              className={`relative z-10 transition-all duration-300 ease-out motion-reduce:transition-none ${
                isActive ? "scale-110 text-white" : "text-neutral-500"
              }`}
            >
              {social.icon}
            </span>

            <span
              className={`absolute bottom-1.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-white transition-all duration-300 ease-out motion-reduce:transition-none ${
                isActive ? "w-3 opacity-100" : "w-0 opacity-0"
              }`}
              aria-hidden="true"
            />

            <span
              className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-950 transition-all duration-300 ease-out motion-reduce:transition-none ${
                isActive
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-1 opacity-0"
              }`}
              aria-hidden="true"
            >
              {social.name}
              <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-white" />
            </span>
          </a>
        );
      })}
    </nav>
  );
}
