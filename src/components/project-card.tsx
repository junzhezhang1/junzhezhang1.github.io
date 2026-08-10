import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { cn } from "@/lib/cn";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export function ProjectCard({ project, featured }: ProjectCardProps) {
  return (
    <Link
      className={cn("project-card", featured && "project-card-featured")}
      href={`/projects/${project.slug}`}
      style={{ "--project-accent": project.accent } as React.CSSProperties}
    >
      <div className="project-image">
        <Image
          src={project.image}
          alt=""
          fill
          unoptimized
          sizes={featured ? "(max-width: 900px) 100vw, 58vw" : "(max-width: 900px) 100vw, 40vw"}
        />
        <span className="project-open" aria-hidden="true">
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className="project-copy">
        <p>
          {project.category} <span>{project.year}</span>
        </p>
        <h3>{project.title}</h3>
        <span>{project.summary}</span>
      </div>
    </Link>
  );
}
