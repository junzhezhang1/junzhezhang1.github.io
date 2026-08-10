import type { Metadata } from "next";
import { InteractiveCity } from "@/components/interactive-city";

export const metadata: Metadata = {
  title: "Photography",
  description: "An interactive miniature city and visual index.",
};

export default function PhotographyPage() {
  return <InteractiveCity />;
}
