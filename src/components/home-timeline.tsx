import AccordionGallery from "@/components/ui/accordion-gallery";
import { timelineMilestones } from "@/content/timeline";

export function HomeTimeline() {
  return (
    <section
      id="timeline"
      className="timeline-chapter"
      aria-label="Timeline"
    >
      <div className="timeline-chapter-inner content-shell">
        <AccordionGallery
          className="timeline-accordion"
          items={timelineMilestones}
          defaultIndex={2}
          expandRatio={0.48}
          trigger="hover"
          height={600}
          gap={8}
          radius={2}
          accentColor="#9eb2cf"
          overlayColor="#050b16"
          textColor="#f5f2e9"
          grayscale
          showLabels
          duration={0.72}
          ease="power3.out"
          parallax={0.42}
          tilt={4}
          stagger={0.08}
        />
      </div>
    </section>
  );
}
