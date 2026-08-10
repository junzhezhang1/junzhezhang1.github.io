"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { principles } from "@/content/site";

export function HorizontalAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="horizontal-accordion">
      {principles.map((principle, index) => (
        <button
          key={principle.title}
          type="button"
          className={activeIndex === index ? "active" : ""}
          onMouseEnter={() => setActiveIndex(index)}
          onFocus={() => setActiveIndex(index)}
          onClick={() => setActiveIndex(index)}
          aria-pressed={activeIndex === index}
        >
          <span className="accordion-title">{principle.title}</span>
          <span className="accordion-content">
            <span>{principle.text}</span>
            <ArrowUpRight aria-hidden="true" size={22} />
          </span>
        </button>
      ))}
    </div>
  );
}
