export const cityDestinations = [
  {
    id: "1",
    label: "Empire State Building",
    slug: "empire-state-building",
    href: "/city/empire-state-building",
  },
  {
    id: "2",
    label: "Family House",
    slug: "family-house",
    href: "/city/family-house",
  },
  {
    id: "3",
    label: "China Pavilion",
    slug: "china-pavilion",
    href: "/city/china-pavilion",
  },
  {
    id: "4",
    label: "Globe Monument",
    slug: "globe-monument",
    href: "/city/globe-monument",
  },
  {
    id: "5",
    label: "Ferry",
    slug: "ferry",
    href: "/city/ferry",
  },
] as const;

export type CityDestination = (typeof cityDestinations)[number];

const destinationById = new Map<string, CityDestination>(
  cityDestinations.map((destination) => [destination.id, destination]),
);

export function getCityDestination(id: string) {
  return destinationById.get(id);
}
