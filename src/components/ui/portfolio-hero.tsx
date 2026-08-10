"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = "", children, ...props }, ref) => (
  <button
    ref={ref}
    className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
));
Button.displayName = "Button";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

function BlurText({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}: BlurTextProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const segments = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [text, animateBy],
  );

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, index) => (
        <span
          key={`${segment}-${index}`}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView
              ? "translateY(0)"
              : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `filter .5s ease-out ${index * delay}ms, opacity .5s ease-out ${index * delay}ms, transform .5s ease-out ${index * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && index < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
}

const menuItems = [
  { label: "ABOUT", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "PHOTO GALLERY", href: "/photography" },
];

const palette = {
  nearBlack: "#020407",
  darkBase: "#05080e",
  navy: "#09162d",
  navyMid: "#142a52",
  rice: "#f5f2e9",
  riceDeep: "#e6e2d6",
  steel: "#7f9dcb",
  steelDark: "#31507e",
};

type PortfolioHeroProps = {
  embedded?: boolean;
};

export default function PortfolioHero({ embedded = false }: PortfolioHeroProps) {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyDark = document.documentElement.classList.contains("dark");
    const previousSiteTheme = document.documentElement.getAttribute("data-site-theme");
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("data-site-theme", "dark");
    return () => {
      if (!previouslyDark) document.documentElement.classList.remove("dark");
      if (previousSiteTheme) {
        document.documentElement.setAttribute("data-site-theme", previousSiteTheme);
      } else {
        document.documentElement.removeAttribute("data-site-theme");
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
    document.documentElement.setAttribute("data-site-theme", nextTheme ? "dark" : "light");
  };

  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div
      className={`${embedded ? "relative" : "fixed inset-0 z-[400]"} min-h-screen overflow-hidden text-white transition-colors duration-500`}
      style={{
        background: isDark
          ? `linear-gradient(180deg, transparent 58%, ${palette.navy} 100%), radial-gradient(circle at 50% 42%, ${palette.navy} 0%, ${palette.darkBase} 58%, ${palette.nearBlack} 100%)`
          : `linear-gradient(180deg, transparent 62%, ${palette.riceDeep} 100%), radial-gradient(circle at 50% 42%, ${palette.rice} 0%, ${palette.riceDeep} 100%)`,
        color: isDark ? palette.rice : palette.navy,
      }}
    >
      <header className="fixed inset-x-0 top-0 z-50 px-2 py-5 sm:px-2 sm:py-6">
        <nav className="mx-auto flex max-w-none items-center justify-between" aria-label="Portfolio hero navigation">
          <div className="relative">
            <Button
              ref={buttonRef}
              type="button"
              className="relative z-50 size-12 p-2 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
              style={{ color: isDark ? palette.steel : palette.steelDark }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="portfolio-hero-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X className="size-8" strokeWidth={2} /> : <Menu className="size-8" strokeWidth={2} />}
            </Button>

            <div
              ref={menuRef}
              id="portfolio-hero-menu"
              className={`absolute left-3 top-full z-[100] mt-2 w-[220px] origin-top-left rounded-lg p-4 shadow-2xl transition-all duration-300 md:w-[240px] ${isMenuOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0"}`}
              style={{
                backgroundColor: isDark ? palette.darkBase : palette.rice,
                border: `1px solid ${isDark ? "rgba(127,157,203,.2)" : "rgba(20,42,82,.16)"}`,
              }}
              aria-hidden={!isMenuOpen}
            >
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block cursor-pointer px-2 py-1.5 text-lg font-bold tracking-tight transition-opacity duration-300 hover:opacity-65 focus-visible:opacity-65 focus-visible:outline-none md:text-xl"
                  tabIndex={isMenuOpen ? 0 : -1}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Button
            type="button"
            onClick={toggleTheme}
            className="relative h-8 w-16 rounded-full p-0 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            style={{ backgroundColor: isDark ? palette.navyMid : "#cfd6df" }}
            aria-label="Toggle color theme"
            aria-pressed={!isDark}
          >
            <span
              className="absolute left-1 top-1 size-6 rounded-full transition-transform duration-300"
              style={{
                backgroundColor: isDark ? palette.rice : palette.navy,
                transform: isDark ? "translateX(2rem)" : "translateX(0)",
              }}
            />
          </Button>
        </nav>
      </header>

      <main className="relative flex min-h-screen flex-col">
        <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4">
          <div className="relative text-center">
            <div>
              <BlurText
                text="JUNZHE"
                delay={100}
                animateBy="letters"
                direction="top"
                className="justify-center whitespace-nowrap text-[100px] font-bold uppercase leading-[.75] tracking-[-.085em] sm:text-[140px] md:text-[180px] lg:text-[210px]"
                style={{ color: isDark ? palette.riceDeep : palette.navyMid, fontFamily: "'Fira Code', 'Courier New', monospace" }}
              />
            </div>
            <div>
              <BlurText
                text="ZHANG"
                delay={100}
                animateBy="letters"
                direction="top"
                className="justify-center whitespace-nowrap text-[100px] font-bold uppercase leading-[.75] tracking-[-.085em] sm:text-[140px] md:text-[180px] lg:text-[210px]"
                style={{ color: isDark ? palette.riceDeep : palette.navyMid, fontFamily: "'Fira Code', 'Courier New', monospace" }}
              />
            </div>

          </div>
        </div>

        <div className="absolute bottom-16 left-1/2 w-full -translate-x-1/2 px-6 sm:bottom-20 md:bottom-24 lg:bottom-32 xl:bottom-36">
          <div className="flex justify-center">
            <BlurText
              text="Researching, building, and creating what comes next."
              delay={150}
              animateBy="words"
              direction="top"
              className="justify-center text-center text-[15px] transition-opacity duration-300 hover:opacity-100 sm:text-[18px] md:text-[20px] lg:text-[22px]"
              style={{
                color: isDark ? "rgba(245,242,233,.52)" : "rgba(9,22,45,.58)",
                fontFamily: "Antic, 'Helvetica Neue', sans-serif",
              }}
            />
          </div>
        </div>

        <Button
          type="button"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current md:bottom-8"
          style={{ color: isDark ? palette.steel : palette.steelDark }}
          aria-label="Scroll down"
          onClick={scrollDown}
        >
          <ChevronDown className="size-5 md:size-8" />
        </Button>
      </main>
    </div>
  );
}
