import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CircularGallery } from "@/components/ui/circular-gallery";
import { visualGalleryItems } from "@/content/visual-gallery";

export function HomeVisualGallery() {
  return (
    <section
      id="visual-notebook"
      className="visual-gallery-chapter"
      aria-labelledby="visual-gallery-title"
    >
      <div className="visual-gallery-sticky">
        <header className="visual-gallery-heading content-shell">
          <h2 id="visual-gallery-title">Through My Lens</h2>
          <div className="visual-gallery-intro">
            <p>
              A personal collection of photographs capturing cities, people,
              architecture, and quiet moments that catch my attention.
            </p>
            <Link className="visual-gallery-link" href="/photography">
              <span>View photo gallery</span>
              <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </Link>
          </div>
        </header>

        <div className="visual-gallery-stage" aria-live="off">
          <CircularGallery
            items={visualGalleryItems}
            radius={590}
            rotationDuration={120}
          />
        </div>
      </div>
    </section>
  );
}
