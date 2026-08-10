"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { publications } from "@/content/publications";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export function PublicationCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const card = useRef<HTMLElement>(null);
  const publication = publications[activeIndex];

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".publication-reveal",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: "power3.out" },
      );
    },
    { scope: card, dependencies: [activeIndex], revertOnUpdate: true },
  );

  const move = (direction: number) => {
    setActiveIndex(
      (current) => (current + direction + publications.length) % publications.length,
    );
  };

  return (
    <article ref={card} className="publication-carousel" aria-live="polite">
      <div className="publication-carousel-meta publication-reveal">
        <p>{publication.status}</p>
        <span>{publication.year}</span>
      </div>
      <div className="publication-carousel-body">
        <p className="publication-reveal">{publication.venue}</p>
        <h3 className="publication-reveal">{publication.title}</h3>
        <p className="publication-reveal">{publication.abstract}</p>
        <span className="publication-reveal">{publication.authors}</span>
      </div>
      <div className="publication-carousel-controls">
        <span>{String(activeIndex + 1).padStart(2, "0")} / {String(publications.length).padStart(2, "0")}</span>
        <div>
          <button type="button" onClick={() => move(-1)} aria-label="Previous publication">
            <ArrowLeft aria-hidden="true" size={20} />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Next publication">
            <ArrowRight aria-hidden="true" size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}
