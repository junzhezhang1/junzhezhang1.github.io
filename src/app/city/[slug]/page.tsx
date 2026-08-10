import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cityDestinations } from "@/content/city-destinations";
import styles from "./page.module.css";

type CityDestinationPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cityDestinations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CityDestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = cityDestinations.find(
    (candidate) => candidate.slug === slug,
  );

  return {
    title: destination?.label ?? "City destination",
    description: destination
      ? `A temporary page for ${destination.label}.`
      : "A temporary city destination page.",
  };
}

export default async function CityDestinationPage({
  params,
}: CityDestinationPageProps) {
  const { slug } = await params;
  const destination = cityDestinations.find(
    (candidate) => candidate.slug === slug,
  );

  if (!destination) notFound();

  return (
    <section className={styles.page}>
      <div className={styles.content}>
        <p>Interactive city / Temporary destination</p>
        <h1>{destination.label}</h1>
        <p>
          This route is ready for the story, photographs, or project details
          that will live here later.
        </p>
        <Link href="/photography">Return to the city</Link>
      </div>
    </section>
  );
}
