import type { NavigationItem } from "@/types/content";

export const siteConfig = {
  name: "Junzhe Zhang",
  initials: "JZ",
  role: "AI researcher",
  location: "New York City",
  email: "jz3709@nyu.edu",
  description:
    "AI researcher working across computer vision, healthcare AI, and intelligent systems.",
  heroHeadline: "I study how machines learn to see",
  heroEmphasis: "and how that vision can become useful.",
  shortBio:
    "My work sits between rigorous research and practical systems, with a focus on technology that can meet people in the complexity of the real world.",
  availability: "Open to research exchanges, thoughtful collaborations, and new questions.",
};

export const navigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Photo Gallery", href: "/photography" },
];

export const principles = [
  {
    title: "Perception",
    text: "Understanding how visual systems interpret complex environments, uncertainty, and human context.",
  },
  {
    title: "Translation",
    text: "Turning research ideas into legible prototypes that can be tested, questioned, and improved.",
  },
  {
    title: "Usefulness",
    text: "Designing intelligent systems around real needs, with attention to access, trust, and consequence.",
  },
];

export const journey = [
  {
    id: "randolph-macon-academy",
    mark: "RMA",
    period: "2018—2019",
    place: "Randolph-Macon Academy",
    location: "Front Royal, Virginia",
    summary: "Leadership, service, and the beginning of an interdisciplinary path.",
  },
  {
    id: "nyu-undergraduate",
    mark: "NYU",
    period: "2019—2023",
    place: "New York University",
    location: "New York City",
    summary: "B.S. in Mathematics and Computer Science, cum laude.",
  },
  {
    id: "nyu-research",
    mark: "LAB",
    period: "2022—2025",
    place: "NYU Research Labs",
    location: "New York City",
    summary: "Medical robotics, computer vision, and multimodal machine learning.",
  },
  {
    id: "nyu-graduate",
    mark: "NYU",
    period: "2023—2025",
    place: "New York University",
    location: "New York City",
    summary: "M.S. in Computer Science with a deeper focus on AI systems.",
  },
  {
    id: "nyu-langone",
    mark: "RZL",
    period: "2025—Now",
    place: "NYU Langone Health",
    location: "New York City",
    summary: "Accessible navigation and mobility research at the Rizzo Lab.",
  },
];

export const timeline = [
  {
    period: "Now",
    title: "Applied research",
    description:
      "Developing research-led systems at the intersection of computer vision, accessibility, and healthcare.",
  },
  {
    period: "Graduate study",
    title: "A deeper technical practice",
    description:
      "Building a stronger foundation in machine learning while working across research labs and collaborative projects.",
  },
  {
    period: "Foundations",
    title: "Mathematics, computing, and curiosity",
    description:
      "Learning to move between abstract reasoning and practical experimentation—and to value both equally.",
  },
];

export const cities = ["New York City", "Hong Kong", "Shanghai", "Shenzhen"];
