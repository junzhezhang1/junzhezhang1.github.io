"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import type { Project } from "@/types/content";
import styles from "./projects-feed.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectsFeedProps {
  projects: Project[];
}

export function ProjectsFeed({ projects }: ProjectsFeedProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const rows = gsap.utils.toArray<HTMLElement>("[data-project-row]");

      rows.forEach((row) => {
        const image = row.querySelector("img");

        gsap.fromTo(
          row,
          { autoAlpha: 0.4, y: 64 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 92%",
              end: "top 54%",
              scrub: 0.8,
            },
          },
        );

        if (image) {
          gsap.fromTo(
            image,
            { scale: 0.94 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 92%",
                end: "top 48%",
                scrub: 0.9,
              },
            },
          );
        }
      });
    },
    { scope: root },
  );

  const handleEnter = (card: HTMLElement) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const image = card.querySelector("img");
    gsap.to(card, { y: -7, duration: 0.55, ease: "power3.out" });
    if (image) {
      gsap.to(image, {
        scale: 1.035,
        filter: "saturate(.96) contrast(1.02) brightness(.96)",
        duration: 0.8,
        ease: "power3.out",
      });
    }
  };

  const handleLeave = (card: HTMLElement) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const image = card.querySelector("img");
    gsap.to(card, { y: 0, duration: 0.65, ease: "power3.out" });
    if (image) {
      gsap.to(image, {
        scale: 1,
        filter: "saturate(.78) contrast(1.06) brightness(.88)",
        duration: 0.9,
        ease: "power3.out",
      });
    }
  };

  return (
    <div ref={root} className={styles.page}>
      <header className={styles.header}>
        <h1>Projects</h1>
      </header>

      <ol className={styles.list}>
        {projects.map((project) => (
          <li className={styles.row} data-project-row key={project.slug}>
            <Link
              className={styles.card}
              href={`/projects/${project.slug}`}
              style={{ "--project-accent": project.accent } as React.CSSProperties}
              onMouseEnter={(event) => handleEnter(event.currentTarget)}
              onMouseLeave={(event) => handleLeave(event.currentTarget)}
              onFocus={(event) => handleEnter(event.currentTarget)}
              onBlur={(event) => handleLeave(event.currentTarget)}
              aria-label={`View project: ${project.title}`}
            >
              <div className={styles.media}>
                <Image
                  src={project.image}
                  alt={`Preview for ${project.title}`}
                  fill
                  unoptimized
                  sizes="(max-width: 820px) calc(100vw - 32px), 520px"
                />
              </div>

              <div className={styles.copy}>
                <p className={styles.meta}>
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </p>
                <h2>{project.title}</h2>
                <p className={styles.summary}>{project.summary}</p>
                <span className={styles.arrow} aria-hidden="true">
                  <ArrowUpRight size={21} strokeWidth={1.7} />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
