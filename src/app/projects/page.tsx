import type { Metadata } from "next";

import { ProjectsFeed } from "@/components/projects-feed";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Research, technology, and creative practice projects.",
};

export default function ProjectsPage() {
  return <ProjectsFeed projects={projects} />;
}
