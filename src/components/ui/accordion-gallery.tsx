"use client";

/* eslint-disable @next/next/no-img-element */

import {
  type CSSProperties,
  type ElementType,
  type KeyboardEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

import "./accordion-gallery.css";

export interface AccordionGalleryItem {
  image: string;
  label?: string;
  link?: string;
  alt?: string;
}

export interface AccordionGalleryProps {
  items?: AccordionGalleryItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  grayscale?: boolean;
  showLabels?: boolean;
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: "hover" | "click";
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const DEFAULT_ITEMS: AccordionGalleryItem[] = [
  {
    image: "https://picsum.photos/id/1015/900/1200",
    label: "Canyon",
    link: "#",
  },
  {
    image: "https://picsum.photos/id/1018/900/1200",
    label: "Ridgeline",
    link: "#",
  },
  {
    image: "https://picsum.photos/id/1039/900/1200",
    label: "Falls",
    link: "#",
  },
  {
    image: "https://picsum.photos/id/1043/900/1200",
    label: "Harbour",
    link: "#",
  },
  {
    image: "https://picsum.photos/id/1044/900/1200",
    label: "Skyline",
    link: "#",
  },
];

type GalleryStyles = CSSProperties & {
  "--ag-accent": string;
  "--ag-overlay": string;
  "--ag-text": string;
  "--ag-gap": string;
  "--ag-radius": string;
};

export default function AccordionGallery({
  items = DEFAULT_ITEMS,
  defaultIndex = 2,
  accentColor = "#ffffff",
  overlayColor = "#060010",
  textColor = "#ffffff",
  height = 460,
  gap = 10,
  radius = 16,
  expandRatio = 0.52,
  orientation = "horizontal",
  duration = 0.6,
  ease = "power3.out",
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = "hover",
  showLabels = true,
  grayscale = true,
  className = "",
}: AccordionGalleryProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const mediaRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const barRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const textRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);

  const vertical = orientation === "vertical";
  const count = items.length;
  const initialIndex = count > 0
    ? Math.min(Math.max(defaultIndex, 0), count - 1)
    : -1;
  const [active, setActive] = useState(initialIndex);
  const safeActive = count > 0
    ? Math.min(Math.max(active, 0), count - 1)
    : -1;

  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length || count === 0) return;

      const ratio = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (ratio * (count - 1)) / (1 - ratio) : 1;
      const mediaSize = mediaSizeRef.current;

      timelineRef.current?.kill();
      const animationDuration = animate && !prefersReduced ? duration : 0;
      const timeline = gsap.timeline();

      panels.forEach((panel, index) => {
        if (!panel) return;

        const isActive = index === safeActive;
        const media = mediaRefs.current[index];
        const bar = barRefs.current[index];
        const text = textRefs.current[index];
        const rotation = isActive ? 0 : index < safeActive ? tilt : -tilt;
        const rotationProperty = vertical
          ? { rotateX: -rotation }
          : { rotateY: rotation };

        timeline.to(
          panel,
          {
            flexGrow: isActive ? grow : 1,
            ...rotationProperty,
            duration: animationDuration,
            ease,
          },
          0,
        );

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, safeActive - index));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;

          timeline.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              "--ag-gray": gray,
              "--ag-dim": isActive ? 0 : 0.35,
              duration: animationDuration,
              ease,
            },
            0,
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            timeline.to(
              [bar, text],
              {
                opacity: 1,
                x: 0,
                duration: animationDuration,
                ease,
                stagger: prefersReduced ? 0 : stagger,
              },
              0,
            );
          } else {
            timeline.to(
              [bar, text],
              {
                opacity: 0,
                x: -14,
                duration: animationDuration * 0.6,
                ease,
              },
              0,
            );
          }
        }
      });

      timelineRef.current = timeline;
    },
    [
      count,
      duration,
      ease,
      expandRatio,
      grayscale,
      parallax,
      prefersReduced,
      safeActive,
      showLabels,
      stagger,
      tilt,
      vertical,
    ],
  );

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const measure = () => {
      const rectangle = element.getBoundingClientRect();
      const total = vertical ? rectangle.height : rectangle.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(
        140,
        usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22,
      );

      mediaSizeRef.current = size;
      element.style.setProperty("--ag-media-size", `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [applyLayout, count, expandRatio, gap, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      timelineRef.current?.kill();
    },
    [],
  );

  const activateFromPointer = (index: number) => {
    if (trigger === "hover") setActive(index);
  };

  const handleClick = (
    index: number,
    item: AccordionGalleryItem,
    event: MouseEvent<HTMLElement>,
  ) => {
    if (index !== safeActive || !item.link || item.link === "#") {
      event.preventDefault();
    }
    if (index !== safeActive) setActive(index);
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index + 1) % count);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index - 1 + count) % count);
    }
  };

  const styles: GalleryStyles = {
    "--ag-accent": accentColor,
    "--ag-overlay": overlayColor,
    "--ag-text": textColor,
    "--ag-gap": `${gap}px`,
    "--ag-radius": `${radius}px`,
    height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`,
  };

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${
        vertical ? " accordion-gallery--vertical" : ""
      }${className ? ` ${className}` : ""}`}
      style={styles}
      role="list"
      aria-label="Image accordion gallery"
    >
      {items.map((item, index) => {
        const isActive = index === safeActive;
        const Tag: ElementType = item.link ? "a" : "div";

        return (
          <Tag
            key={`${item.image}-${index}`}
            ref={(element: HTMLElement | null) => {
              panelRefs.current[index] = element;
            }}
            className={`ag-panel${isActive ? " ag-panel--active" : ""}`}
            style={{ borderRadius: `${radius}px` }}
            href={item.link || undefined}
            onClick={(event: MouseEvent<HTMLElement>) =>
              handleClick(index, item, event)
            }
            onMouseEnter={() => activateFromPointer(index)}
            onFocus={() => setActive(index)}
            onKeyDown={(event: KeyboardEvent<HTMLElement>) =>
              handleKeyDown(index, event)
            }
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? "true" : undefined}
            aria-label={item.label}
          >
            <span className="ag-panel__frame">
              <span
                className="ag-panel__media"
                ref={(element) => {
                  mediaRefs.current[index] = element;
                }}
              >
                <img
                  src={item.image}
                  alt={item.alt || item.label || ""}
                  draggable="false"
                />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>

            {showLabels && (
              <span className="ag-panel__label" aria-hidden="true">
                <span
                  className="ag-panel__bar"
                  ref={(element) => {
                    barRefs.current[index] = element;
                  }}
                />
                <span
                  className="ag-panel__text"
                  ref={(element) => {
                    textRefs.current[index] = element;
                  }}
                >
                  {item.label}
                </span>
              </span>
            )}
          </Tag>
        );
      })}
    </div>
  );
}
