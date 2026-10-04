import { ArrowRightIcon } from "./icons";

const stages = [
  { name: "Strava API", detail: "Source: my activities" },
  { name: "Cloud Functions", detail: "Python, runs nightly at 23:30" },
  { name: "BigQuery", detail: "Activities and daily metrics" },
  { name: "This page", detail: "Reads a pre-aggregated JSON" },
];

export default function ArchitectureStrip() {
  return (
    <section
      aria-labelledby="pipeline-heading"
      className="mx-auto max-w-5xl px-6 pt-10"
    >
      <h2
        id="pipeline-heading"
        className="text-sm font-medium tracking-wide text-accent uppercase"
      >
        Pipeline
      </h2>
      <ol className="mt-4 flex flex-col gap-3 md:flex-row md:items-start md:gap-0">
        {stages.map(({ name, detail }, index) => (
          <li key={name} className="flex items-start gap-3 md:flex-1">
            <div className="flex-1">
              <p className="font-mono text-sm text-foreground">{name}</p>
              <p className="mt-0.5 text-sm text-muted">{detail}</p>
            </div>
            {index < stages.length - 1 && (
              <ArrowRightIcon className="mt-0.5 hidden h-4 w-4 shrink-0 text-accent md:mx-4 md:block" />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
