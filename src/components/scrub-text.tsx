"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

type ScrubTextProps = {
  text: string;
  className?: string;
};

export function ScrubText({ text, className }: ScrubTextProps) {
  const paragraph = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion || !paragraph.current) {
        return;
      }

      const wordElements = paragraph.current.querySelectorAll("span");

      gsap.fromTo(
        wordElements,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: paragraph.current,
            start: "top 78%",
            end: "bottom 42%",
            scrub: 1,
          },
        },
      );
    },
    { scope: paragraph },
  );

  return (
    <p ref={paragraph} className={cn("scrub-text", className)}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>{word} </span>
      ))}
    </p>
  );
}
