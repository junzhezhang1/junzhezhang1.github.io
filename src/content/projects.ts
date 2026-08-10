import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "assistive-navigation-mobility",
    title: "Assistive Navigation & Mobility",
    category: "Research / Applied AI",
    year: "2025 - Present",
    summary:
      "Developing intelligent sensing and navigation systems to support indoor mobility and orientation for people with visual impairments.",
    description:
      "My work at the Rizzo Lab explores how smartphone sensing, computer vision, and AI can support indoor navigation and mobility assessment for people with visual impairments.",
    image: "/images/placeholders/signals.svg",
    accent: "#4f79b7",
    role: "Research Assistant, Rizzo Lab, NYU Langone Health",
    duration: "April 2025 - Present",
    collaborators: "Rizzo Lab researchers and clinical collaborators",
    challenge:
      "Indoor navigation remains difficult where GPS is unavailable, particularly when systems must operate reliably using everyday devices. Smartphone sensor estimates can accumulate drift, while clinical environments introduce complex layouts and changing visual conditions.",
    approach:
      "I developed PocketGuide, a camera-free trajectory plotting system based on smartphone IMU data, and investigated dead-reckoning methods for improving heading estimation and reducing drift. I also worked on visual-odometry pipelines using ARKit and iPhone camera data, and developed a VLM-based workflow combining visual scene understanding with custom route planning for clinical environments.",
    outcome:
      "The work produced two research manuscripts currently under review: PocketGuide for smartphone-based indoor trajectory tracking and a separate system for quantitative walking-trajectory assessment and orientation-and-mobility training.",
    tags: ["Assistive Technology", "IMU Sensing", "Computer Vision"],
    featured: true,
  },
  {
    slug: "ai-endoscopic-surgery",
    title: "AI for Endoscopic Surgery",
    category: "Research / Medical AI",
    year: "2022 - 2025",
    summary:
      "Building computer-vision and interface technologies that integrate tumor detection, depth perception, and real-time visualization for endoscopic surgery.",
    description:
      "This research focused on an intelligent endoscopic platform combining real-time imaging, tumor detection, depth perception, and an integrated user interface for surgical applications.",
    image: "/images/placeholders/listening.svg",
    accent: "#4f8d7a",
    role: "Research Assistant, Flexible AI-enabled Mechatronic Systems Lab, NYU",
    duration: "July 2022 - April 2025",
    collaborators: "Rui Li, Ali Fakhry, Thaison Le",
    challenge:
      "Endoscopic procedures provide limited visual depth information while requiring clinicians to interpret complex imagery in real time. An effective system therefore needed accurate computer-vision models while remaining responsive and usable within a surgical workflow.",
    approach:
      "I developed a unified interface integrating live camera feeds, statistical visualization, and adjustable computing controls. I also fine-tuned YOLOv5 models using custom annotations and data augmentation for tumor and surgical-instrument detection, while working with robotics, machine-learning, and clinical collaborators to incorporate surgeon feedback into the platform.",
    outcome:
      "The resulting TAJ platform integrated tumor detection and depth perception within a unified endoscopic system. The work was accepted and presented at the 2024 IEEE International Symposium on Medical Robotics.",
    tags: ["Medical AI", "Computer Vision", "YOLOv5"],
    featured: true,
  },
  {
    slug: "wildlife-trafficking-detection",
    title: "Wildlife Trafficking Detection",
    category: "Research / Multimodal AI",
    year: "2024",
    summary:
      "Combining image and text models to identify concealed wildlife products in large-scale online marketplace listings.",
    description:
      "At NYU's VIDA Lab, I worked on a multimodal machine-learning system for detecting wildlife products hidden within online marketplace listings.",
    image: "/images/placeholders/field-notes.svg",
    accent: "#a16c47",
    role: "ML Research Intern, VIDA Lab, NYU",
    duration: "January 2024 - June 2024",
    collaborators: "VIDA Lab research team",
    challenge:
      "Wildlife products sold online may be disguised through ambiguous descriptions, unrelated imagery, or noisy marketplace data. Detection therefore requires processing both visual and textual information while maintaining a sufficiently low false-positive rate for practical screening.",
    approach:
      "I built a fault-tolerant BeautifulSoup pipeline to collect and standardize high-volume eBay listings across categories and regions. I then integrated EfficientNet for visual features with DistilBERT for text processing and performed hyperparameter tuning and cross-validation using grid and random search.",
    outcome:
      "The resulting multimodal model achieved 82% classification accuracy while maintaining a 1.6% false-positive rate, demonstrating the potential of combined image and text analysis for identifying concealed wildlife products.",
    tags: ["Multimodal AI", "EfficientNet", "DistilBERT"],
    featured: true,
  },
  {
    slug: "privacy-preserving-llms",
    title: "Privacy-Preserving LLMs",
    category: "Applied AI / Privacy",
    year: "2024",
    summary:
      "Developing a BERT-based approach for identifying personally identifiable information before sensitive data can be exposed to large language models.",
    description:
      "I led the technical development of a privacy-focused system designed to detect personally identifiable information before sensitive content is processed by large language models.",
    image: "/images/placeholders/infrastructure.svg",
    accent: "#7568ad",
    role: "Tech Lead, NYU Startup Accelerator Program",
    duration: "January 2024 - May 2024",
    collaborators: "Startup accelerator project team",
    challenge:
      "LLM applications can inadvertently expose sensitive personal information when users submit unfiltered text. The project required accurately recognizing multiple forms of identifying information while minimizing missed entities and incorrect classifications.",
    approach:
      "We developed a BERT-based identification system using BIO tagging to locate and classify sensitive information within text. I led model development and product refinement while coordinating the team's technical direction and participating in the accelerator's product and investor-presentation process.",
    outcome:
      "The system achieved 90.99% precision and 93.06% recall for personal-identification data classification and was developed into a product concept through NYU's startup accelerator program.",
    tags: ["NLP", "Data Privacy", "BERT"],
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
