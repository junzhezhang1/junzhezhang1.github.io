"use client";

import {
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { journey } from "@/content/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export function JourneyTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const deckRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        return;
      }

      gsap.fromTo(
        ".journey-hover-panel.active .journey-hover-reveal",
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.58,
          stagger: 0.065,
          ease: "power3.out",
        },
      );
    },
    { scope: deckRef, dependencies: [activeIndex], revertOnUpdate: true },
  );

  const activate = (index: number, focus = false) => {
    const nextIndex = Math.max(0, Math.min(index, journey.length - 1));
    setActiveIndex(nextIndex);

    if (focus) {
      panelRefs.current[nextIndex]?.focus();
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    index: number,
  ) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      activate(index + 1, true);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      activate(index - 1, true);
    }

    if (event.key === "Home") {
      event.preventDefault();
      activate(0, true);
    }

    if (event.key === "End") {
      event.preventDefault();
      activate(journey.length - 1, true);
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--journey-pointer-x",
      `${event.clientX - bounds.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--journey-pointer-y",
      `${event.clientY - bounds.top}px`,
    );
  };

  return (
    <div
      ref={deckRef}
      className="journey-hover-deck"
      role="list"
      aria-label="Education and research journey"
      onPointerMove={handlePointerMove}
    >
      {journey.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <article
            key={item.id}
            className={`journey-hover-panel${isActive ? " active" : ""}`}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? "step" : undefined}
            ref={(element) => {
              panelRefs.current[index] = element;
            }}
            onMouseEnter={() => activate(index)}
            onPointerEnter={() => activate(index)}
            onFocus={() => activate(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <div className="journey-hover-top">
              <span>{item.period}</span>
              <span className="journey-hover-reveal">{item.location}</span>
            </div>
            <div className="journey-hover-body">
              <span className="journey-hover-logo" aria-hidden="true">
                {item.mark}
              </span>
              <div className="journey-hover-copy">
                <h3 className="journey-hover-reveal">{item.place}</h3>
                <p className="journey-hover-reveal">{item.summary}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
