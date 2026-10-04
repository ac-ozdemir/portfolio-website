import Image from "next/image";

/**
 * Official "Powered by Strava" logo, unmodified, as Strava's API brand
 * guidelines require. Source: developers.strava.com/guidelines (1.2 API logos).
 */
export default function StravaAttribution() {
  return (
    <a
      href="https://www.strava.com"
      className="inline-block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <Image
        src="/powered-by-strava.svg"
        alt="Powered by Strava"
        width={138}
        height={14}
      />
    </a>
  );
}
