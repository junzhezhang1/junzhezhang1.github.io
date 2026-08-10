"use client";

import ProfileCard from "@/components/ui/profile-card";

interface AboutProfileCardProps {
  name: string;
}

export function AboutProfileCard({ name }: AboutProfileCardProps) {
  return (
    <ProfileCard
      name={name}
      title="AI Researcher"
      avatarUrl="/images/junzhe-portrait-cutout-hard.png"
      showUserInfo={false}
      enableTilt
      enableMobileTilt={false}
      behindGlowEnabled
      behindGlowColor="rgba(69, 127, 190, 0.48)"
      behindGlowSize="62%"
      innerGradient="linear-gradient(145deg, #081426 0%, #1c416766 56%, #a7794238 100%)"
      className="[&_.pc-card]:!h-[min(68svh,460px)] sm:[&_.pc-card]:!h-[min(76.8svh,576px)]"
    />
  );
}
