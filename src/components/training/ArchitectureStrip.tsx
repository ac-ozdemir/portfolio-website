import { ArrowRightIcon } from "./icons";

const stages = [
  { name: "Strava API", detail: "Source: my activities" },
  { name: "Cloud Functions", detail: "Python, runs nightly at 23:30" },
  { name: "BigQuery", detail: "Activities and daily metrics" },
  { name: "This page", detail: "Reads a pre-aggregated JSON" },
];

export default function ArchitectureStrip() {
  return (
    <ol
      aria-label="Data pipeline"
      className="flex flex-col gap-1 md:flex-row md:items-start md:gap-0"
    >
      {stages.map(({ name, detail }, index) => (
        <li
          key={name}
          className="flex flex-col gap-1 md:flex-1 md:flex-row md:items-start md:gap-3"
        >
          <div className="flex-1">
            <p className="font-mono text-sm text-foreground">{name}</p>
            <p className="mt-0.5 text-sm text-muted">{detail}</p>
          </div>
          {index < stages.length - 1 && (
            <ArrowRightIcon className="h-4 w-4 shrink-0 rotate-90 text-accent md:mx-4 md:mt-0.5 md:rotate-0" />
          )}
        </li>
      ))}
    </ol>
  );
}
