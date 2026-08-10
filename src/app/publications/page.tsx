import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { publications } from "@/content/publications";

export const metadata: Metadata = {
  title: "Publications",
  description: "Published writing, working papers, and research in progress.",
};

export default function PublicationsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Publications"
        title="Ideas, arguments, and work still taking shape."
        description="A publication index designed for clear scanning and deeper reading. The entries remain placeholders until the final academic record is added."
        aside={`${publications.length} items / Updated as work develops`}
      />

      <section className="publication-list content-shell">
        {publications.map((publication, index) => (
          <Reveal key={publication.title}>
            <article className="publication-item">
              <div className="publication-number">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <p className="publication-meta">{publication.venue} / {publication.year}</p>
                <h2>{publication.title}</h2>
                <p className="publication-authors">{publication.authors}</p>
                <p className="publication-abstract">{publication.abstract}</p>
              </div>
              <div className="publication-status">
                <span>{publication.status}</span>
                {publication.href && publication.href !== "#" ? (
                  <a href={publication.href} aria-label={`Open ${publication.title}`}>
                    <ArrowUpRight aria-hidden="true" size={20} />
                  </a>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </section>
    </>
  );
}
