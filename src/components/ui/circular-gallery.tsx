"use client";

import Image from "next/image";
import React, { type CSSProperties, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import styles from "./circular-gallery.module.css";

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items sit from the center of the ring. */
  radius?: number;
  /** Seconds required for one complete autonomous rotation. */
  rotationDuration?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    { items, className, radius = 600, rotationDuration = 120, ...props },
    ref,
  ) => {
    if (items.length === 0) {
      return null;
    }

    const anglePerItem = 360 / items.length;
    const ringStyle = {
      "--circular-gallery-duration": `${Math.max(1, rotationDuration)}s`,
      transformStyle: "preserve-3d",
    } as CSSProperties;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          "relative flex h-full w-full items-center justify-center",
          styles.gallery,
          className,
        )}
        style={{ perspective: "2000px" }}
        {...props}
      >
        <div
          className={cn("relative h-full w-full", styles.ring)}
          style={ringStyle}
        >
          {items.map((item, index) => {
            const itemAngle = index * anglePerItem;
            const isPlaceholder = item.photo.url.includes("picsum.photos");

            return (
              <article
                key={`${item.common}-${item.photo.url}`}
                aria-label={item.common}
                className="absolute left-1/2 top-1/2 h-[min(60vh,400px)] w-[min(72vw,300px)] sm:h-[400px] sm:w-[300px]"
                style={{
                  transform: `translate(-50%, -50%) rotateY(${itemAngle}deg) translateZ(clamp(210px, 42vw, ${radius}px))`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className={cn(
                    "absolute inset-0 overflow-hidden rounded-lg border border-white/15 bg-black/30 shadow-2xl backdrop-blur-lg",
                    styles.face,
                  )}
                  style={{
                    backfaceVisibility: "hidden",
                    opacity: 1,
                  }}
                >
                  <Image
                    src={item.photo.url}
                    alt={item.photo.text}
                    fill
                    loading="eager"
                    unoptimized={isPlaceholder}
                    sizes="(max-width: 640px) 72vw, 300px"
                    className={cn("object-cover", styles.image)}
                    style={{ objectPosition: item.photo.pos ?? "center" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-4 pt-20 text-white">
                    <h2 className="text-xl font-bold">{item.common}</h2>
                    <p className="text-sm italic opacity-80">{item.binomial}</p>
                    <p className="mt-2 text-xs opacity-70">
                      Photo by: {item.photo.by}
                    </p>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="absolute inset-0 overflow-hidden rounded-lg border border-white/20 bg-[#0d1b32] shadow-2xl"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    opacity: 0.82,
                  }}
                >
                  <Image
                    src={item.photo.url}
                    alt=""
                    fill
                    loading="eager"
                    unoptimized={isPlaceholder}
                    sizes="(max-width: 640px) 72vw, 300px"
                    className="object-cover brightness-[1.08] saturate-[0.9] contrast-105"
                    style={{ objectPosition: item.photo.pos ?? "center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#17305a]/10 via-transparent to-black/20" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    );
  },
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };
