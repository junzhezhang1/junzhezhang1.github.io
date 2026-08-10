"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export function HeroSection() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.to(".minimal-hero-glow", {
        xPercent: 7,
        yPercent: -5,
        scale: 1.08,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".minimal-hero-ring", {
        rotate: 12,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: section },
  );

  return (
    <section ref={section} className="minimal-hero" aria-label="Introduction">
      <div className="minimal-hero-grid" aria-hidden="true" />
      <div className="minimal-hero-glow" aria-hidden="true" />
      <div className="minimal-hero-ring" aria-hidden="true" />
    </section>
  );
}
