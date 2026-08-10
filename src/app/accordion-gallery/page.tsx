import AccordionGallery, {
  type AccordionGalleryItem,
} from "@/components/ui/accordion-gallery";

const items: AccordionGalleryItem[] = [
  {
    image: "https://picsum.photos/id/1015/900/1200",
    label: "Canyon",
    alt: "Rock canyon beside blue water",
  },
  {
    image: "https://picsum.photos/id/1018/900/1200",
    label: "Ridgeline",
    alt: "Mountain ridgeline beneath a cloudy sky",
  },
  {
    image: "https://picsum.photos/id/1039/900/1200",
    label: "Falls",
    alt: "Waterfall flowing through a forest",
  },
  {
    image: "https://picsum.photos/id/1043/900/1200",
    label: "Harbour",
    alt: "Harbour surrounded by mountains",
  },
  {
    image: "https://picsum.photos/id/1044/900/1200",
    label: "Skyline",
    alt: "City skyline beneath an open sky",
  },
];

export default function AccordionGalleryPreview() {
  return (
    <section className="min-h-screen bg-[#050912] px-5 py-36 text-[#f5f2e9] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1480px]">
        <header className="mb-14 grid gap-5 lg:grid-cols-[1fr_360px] lg:items-end">
          <h1 className="max-w-4xl text-[clamp(3.5rem,7vw,7.5rem)] font-medium leading-[0.88] tracking-[-0.07em]">
            Accordion Gallery
          </h1>
          <p className="max-w-sm text-sm leading-7 text-white/55 lg:justify-self-end">
            Hover, focus, or tap a panel to expand it. Arrow keys move through
            the collection when a panel has focus.
          </p>
        </header>

        <AccordionGallery
          items={items}
          defaultIndex={2}
          expandRatio={0.52}
          trigger="hover"
          height={560}
          gap={10}
          radius={4}
          accentColor="#9eb2cf"
          overlayColor="#050912"
        />
      </div>
    </section>
  );
}

