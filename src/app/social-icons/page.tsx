import { SocialIcons } from "@/components/ui/social-icons";

export default function SocialIconsPreview() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center bg-neutral-900 px-6">
      <div className="flex flex-col items-center gap-12">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Connect with me
          </h1>
          <p className="text-sm text-neutral-400">
            Hover or focus the icons below
          </p>
        </div>

        <SocialIcons />
      </div>
    </section>
  );
}
