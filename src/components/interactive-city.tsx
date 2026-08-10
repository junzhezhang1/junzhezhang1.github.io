"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { cityScene, type CityScene } from "@/content/city-scene";
import styles from "./interactive-city.module.css";

type LayerNodes = {
  root: HTMLAnchorElement | null;
  art: HTMLSpanElement | null;
  depth: HTMLSpanElement | null;
};

export type InteractiveCityProps = {
  className?: string;
  scene?: CityScene;
};

const emptyLayerNodes = (): LayerNodes => ({
  root: null,
  art: null,
  depth: null,
});

/**
 * A reusable isometric scene whose overlay geometry comes entirely from one
 * alignment export. The base image establishes the coordinate canvas; every
 * layer uses percentages relative to that same canvas, so the composition
 * scales without alignment drift.
 */
export function InteractiveCity({
  className = "",
  scene = cityScene,
}: InteractiveCityProps) {
  const nodeMap = useRef(new Map<string, LayerNodes>());

  const nodesFor = (id: string) => {
    const existing = nodeMap.current.get(id);
    if (existing) return existing;

    const nodes = emptyLayerNodes();
    nodeMap.current.set(id, nodes);
    return nodes;
  };

  useEffect(() => {
    const nodes = nodeMap.current;

    return () => {
      nodes.forEach(({ art, depth }) => {
        gsap.killTweensOf([art, depth]);
      });
    };
  }, []);

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * The artwork itself is never filtered or recolored. Interaction uses only
   * transform on the visible layer and opacity on a separate depth duplicate.
   */
  const animateLayer = (id: string, active: boolean) => {
    const { root, art, depth } = nodesFor(id);
    if (!art || !depth || prefersReducedMotion()) return;

    if (root) root.style.zIndex = active ? "10" : "1";
    gsap.killTweensOf([art, depth]);

    gsap.to(art, {
      y: active ? -8 : 0,
      scale: active ? 1.025 : 1,
      duration: active ? 0.22 : 0.18,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.to(depth, {
      y: active ? 5 : 0,
      opacity: active ? 0.2 : 0,
      duration: active ? 0.22 : 0.16,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const animateTouch = (id: string) => {
    const { art, depth } = nodesFor(id);
    if (!art || !depth || prefersReducedMotion()) return;

    gsap.killTweensOf([art, depth]);
    gsap.to(art, {
      y: -4,
      scale: 1.015,
      duration: 0.12,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(depth, {
      y: 3,
      opacity: 0.16,
      duration: 0.12,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      className={`${styles.scene} ${className}`.trim()}
      aria-labelledby="interactive-city-heading"
    >
      <h1 id="interactive-city-heading" className={styles.srOnly}>
        Interactive city
      </h1>

      <aside className={styles.editorialNote} aria-label="A note about the city">
        <p>
          <strong>Explore the city,</strong>
          <br />
          <em>made of places I carry with me.</em>
        </p>
      </aside>

      <div className={styles.frame}>
        <div
          className={styles.canvas}
          style={{ aspectRatio: `${scene.base.width} / ${scene.base.height}` }}
          data-city-canvas
        >
          <Image
            className={styles.base}
            src={scene.base.src}
            alt="An isometric miniature city combining landmarks and places from around the world"
            width={scene.base.width}
            height={scene.base.height}
            sizes="min(96vw, 1720px)"
            priority
            draggable={false}
          />

          {scene.layers.map((layer) => (
            <Link
              key={layer.id}
              ref={(node) => {
                nodesFor(layer.id).root = node;
              }}
              href={layer.href}
              className={styles.hotspot}
              aria-label={`Explore ${layer.label}`}
              data-city-overlay={layer.id}
              data-city-slug={layer.slug}
              style={{
                left: `${layer.placement.left}%`,
                top: `${layer.placement.top}%`,
                width: `${layer.placement.width}%`,
                height: `${layer.placement.height}%`,
              }}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse" || event.pointerType === "pen") {
                  animateLayer(layer.id, true);
                }
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse" || event.pointerType === "pen") {
                  animateLayer(layer.id, false);
                }
              }}
              onPointerDown={(event) => {
                if (event.pointerType === "touch") animateTouch(layer.id);
              }}
            >
              <span
                ref={(node) => {
                  nodesFor(layer.id).depth = node;
                }}
                className={styles.depth}
                aria-hidden="true"
              >
                <Image
                  src={layer.src}
                  alt=""
                  fill
                  sizes={`${layer.placement.width}vw`}
                  loading="eager"
                  draggable={false}
                />
              </span>

              <span
                ref={(node) => {
                  nodesFor(layer.id).art = node;
                }}
                className={styles.art}
              >
                <Image
                  src={layer.src}
                  alt=""
                  fill
                  sizes={`${layer.placement.width}vw`}
                  loading="eager"
                  draggable={false}
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
