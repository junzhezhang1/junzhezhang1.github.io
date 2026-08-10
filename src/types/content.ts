export type NavigationItem = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  image: string;
  accent: string;
  role: string;
  duration: string;
  collaborators: string;
  challenge: string;
  approach: string;
  outcome: string;
  tags: string[];
  featured?: boolean;
};

export type Publication = {
  title: string;
  venue: string;
  year: string;
  authors: string;
  abstract: string;
  status: "Published" | "In review" | "Working paper";
  href?: string;
};

export type Photograph = {
  id: string;
  title: string;
  location: string;
  year: string;
  orientation: "landscape" | "portrait" | "square";
  image: string;
  alt: string;
};
