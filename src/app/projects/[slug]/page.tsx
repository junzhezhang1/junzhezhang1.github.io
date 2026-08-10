import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { projects } from "@/content/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <article className="project-detail">
      <header className="project-detail-header content-shell">
        <Reveal>
          <Link className="back-link" href="/projects">
            <ArrowLeft aria-hidden="true" size={18} />
            All projects
          </Link>
          <p className="eyebrow">{project.category}</p>
          <h1>{project.title}</h1>
        </Reveal>
        <Reveal className="project-detail-intro" delay={0.12}>
          <p>{project.summary}</p>
          <div>
            <span>{project.year}</span>
            <span>{project.role}</span>
          </div>
        </Reveal>
      </header>

      <Reveal className="project-detail-image">
        <Image
          src={project.image}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
        />
      </Reveal>

      <section className="project-overview content-shell">
        <aside>
          <div>
            <span>Role</span>
            <p>{project.role}</p>
          </div>
          <div>
            <span>Duration</span>
            <p>{project.duration}</p>
          </div>
          <div>
            <span>Collaborators</span>
            <p>{project.collaborators}</p>
          </div>
        </aside>
        <div className="project-body">
          <p className="project-lede">{project.description}</p>
          <div>
            <h2>The challenge</h2>
            <p>{project.challenge}</p>
          </div>
          <div>
            <h2>The approach</h2>
            <p>{project.approach}</p>
          </div>
          <div>
            <h2>The outcome</h2>
            <p>{project.outcome}</p>
          </div>
          <ul aria-label="Project themes">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </section>

      <Link
        className="next-project content-shell"
        href={`/projects/${nextProject.slug}`}
      >
        <span>Next project</span>
        <strong>{nextProject.title}</strong>
        <ArrowRight aria-hidden="true" size={32} />
      </Link>
    </article>
  );
}
