import { cities } from "@/content/site";

export function CitiesMarquee() {
  const repeatedCities = [...cities, ...cities];

  return (
    <div className="cities-marquee" aria-label={`Cities: ${cities.join(", ")}`}>
      <div className="cities-track">
        {repeatedCities.map((city, index) => (
          <span key={`${city}-${index}`} aria-hidden={index >= cities.length}>
            {city}
            <i aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
