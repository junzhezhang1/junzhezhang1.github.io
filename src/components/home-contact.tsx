import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/content/site";

export function HomeContact() {
  return (
    <section id="contact" className="contact-chapter" aria-labelledby="contact-chapter-title">
      <div className="contact-chapter-inner content-shell">
        <Reveal className="contact-chapter-heading">
          <h2 id="contact-chapter-title">
            Interested in a conversation? <em>Get in touch.</em>
          </h2>
        </Reveal>

        <Reveal className="contact-chapter-action" delay={0.12}>
          <p>{siteConfig.availability}</p>
          <a href={`mailto:${siteConfig.email}`}>
            <span>Start a conversation</span>
            <i aria-hidden="true">
              <ArrowUpRight size={26} />
            </i>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
