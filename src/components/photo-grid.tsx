import Image from "next/image";
import type { Photograph } from "@/types/content";

export function PhotoGrid({ photographs }: { photographs: Photograph[] }) {
  return (
    <div className="photo-grid">
      {photographs.map((photograph, index) => (
        <figure
          className={`photo-item photo-${photograph.orientation}`}
          key={photograph.id}
        >
          <div className="photo-frame">
            <Image
              src={photograph.image}
              alt={photograph.alt}
              fill
              unoptimized
              sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 40vw"
              priority={index < 2}
            />
          </div>
          <figcaption>
            <span>{photograph.title}</span>
            <span>
              {photograph.location}, {photograph.year}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
