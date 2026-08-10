"use client";

import ProfileCard from "@/components/ui/profile-card";

export default function ProfileCardPreview() {
  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden bg-[#040811] px-5 py-20 text-[#f4f1e8]">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(31, 70, 114, 0.32), transparent 44%), linear-gradient(180deg, #050a14, #02040a)",
        }}
      />
      <div className="relative z-10">
        <ProfileCard
          name="Junzhe Zhang"
          title="AI Researcher"
          handle="junzhezhang"
          status="Open to conversation"
          contactText="Contact"
          avatarUrl="/images/junzhe-portrait-cutout-hard.png"
          miniAvatarUrl="/images/junzhe-portrait.jpg"
          showUserInfo
          enableTilt
          enableMobileTilt={false}
          behindGlowEnabled
          behindGlowColor="rgba(75, 132, 191, 0.52)"
          behindGlowSize="58%"
          innerGradient="linear-gradient(145deg, #0a1528 0%, #21466d66 55%, #a97d4840 100%)"
          onContactClick={() => {
            window.location.hash = "contact";
          }}
        />
      </div>
    </section>
  );
}
