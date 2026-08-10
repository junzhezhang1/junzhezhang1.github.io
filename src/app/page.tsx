import { CitiesMarquee } from "@/components/cities-marquee";
import { HomeContact } from "@/components/home-contact";
import { HomeTimeline } from "@/components/home-timeline";
import { HomeVisualGallery } from "@/components/home-visual-gallery";
import { ScrubText } from "@/components/scrub-text";
import PortfolioHero from "@/components/ui/portfolio-hero";

export default function Home() {
  return (
    <div className="home-flow">
      <PortfolioHero embedded />

      <section id="research-statement" className="research-thesis">
        <div className="research-thesis-inner content-shell">
          <p className="thesis-context">Intelligence made useful.</p>
          <ScrubText
            className="thesis-copy"
            text="My research focuses on computer vision, sensing, and intelligent systems that can understand complex real-world environments, support human decision-making, and become reliable tools in healthcare, accessibility, and everyday life."
          />
        </div>
      </section>

      <section className="city-chapter" aria-label="Cities that have shaped my perspective">
        <CitiesMarquee />
      </section>

      <HomeTimeline />

      <HomeVisualGallery />

      <HomeContact />
    </div>
  );
}
