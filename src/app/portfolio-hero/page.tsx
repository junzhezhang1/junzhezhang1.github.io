import type { Metadata } from "next";
import PortfolioHero from "@/components/ui/portfolio-hero";

export const metadata: Metadata = {
  title: "Portfolio Hero Demo",
  description: "Interactive portfolio hero component demonstration.",
};

export default function PortfolioHeroPage() {
  return <PortfolioHero />;
}
