import type { Metadata } from "next";

import { AboutProfileCard } from "@/components/about-profile-card";
import { SocialIcons } from "@/components/ui/social-icons";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name}, ${siteConfig.role}.`,
};

export default function AboutPage() {
  return (
    <section className="relative isolate flex min-h-[100svh] w-full max-w-full items-center justify-center overflow-x-hidden px-5 pb-5 pt-20 sm:px-8">
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[#030711]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-90"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 50% 43%, rgba(36, 80, 126, 0.24) 0%, rgba(10, 25, 47, 0.13) 28%, transparent 58%), radial-gradient(circle at 50% 100%, rgba(161, 119, 66, 0.08), transparent 38%)",
        }}
      />

      <h1 className="sr-only">About {siteConfig.name}</h1>

      <div className="relative grid w-full max-w-[1240px] items-center gap-16 lg:grid-cols-[minmax(360px,0.9fr)_minmax(360px,1fr)] lg:gap-24">
        <div className="flex flex-col items-center gap-5 lg:justify-self-start">
          <AboutProfileCard name={siteConfig.name} />
          <SocialIcons />
        </div>

        <div className="mx-auto max-w-[580px] lg:mx-0">
          <p className="text-[clamp(1.05rem,1.35vw,1.28rem)] font-normal leading-[1.8] tracking-[-0.012em] text-white/68">
            I am currently a PhD candidate at The Chinese University of Hong
            Kong under the supervision of Professor Guoliang Xing. I studied
            Mathematics and Computer Science at New York University and later
            completed graduate study in Computer Science. My work spans applied
            AI, computer vision, sensing, and healthcare-related AI embedded
            systems. I am particularly interested in developing intelligent
            systems for medical and assistive applications, especially where
            computer vision and sensing can address practical human needs.
          </p>
        </div>
      </div>
    </section>
  );
}
