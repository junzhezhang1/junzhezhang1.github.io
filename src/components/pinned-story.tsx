"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "@/content/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function PinnedStory() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          const heading = section.current?.querySelector(".story-heading");
          const entries = gsap.utils.toArray<HTMLElement>(".story-entry");

          if (!heading) {
            return;
          }

          ScrollTrigger.create({
            trigger: section.current,
            start: "top 120px",
            end: "bottom bottom-=160",
            pin: heading,
            pinSpacing: false,
          });

          entries.forEach((entry) => {
            gsap.fromTo(
              entry,
              { opacity: 0.28, y: 70, scale: 0.94 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: entry,
                  start: "top 84%",
                  end: "top 52%",
                  scrub: 1,
                },
              },
            );
          });
        },
      );

      return () => media.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} className="pinned-story content-shell">
      <div className="story-heading">
        <p className="eyebrow">A practice in motion</p>
        <h2>Built through chapters, not titles.</h2>
      </div>
      <div className="story-entries">
        {timeline.map((item) => (
          <article className="story-entry" key={item.period}>
            <p>{item.period}</p>
            <h3>{item.title}</h3>
            <span>{item.description}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
