import { formatDay } from "@/lib/training/format";

export default function DashboardSection({
  loadSeriesStart,
}: {
  loadSeriesStart: string | null;
}) {
  return (
    <section
      id="dashboard"
      aria-labelledby="dashboard-heading"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 pt-24"
    >
      <h2
        id="dashboard-heading"
        className="text-sm font-medium tracking-wide text-accent uppercase"
      >
        Dashboard
      </h2>

      {/* Charts and filters are the next build step (Recharts). */}
      <div className="mt-6 flex h-72 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted">
        Charts are being added.
      </div>

      <ul className="mt-6 max-w-2xl space-y-1 text-sm text-muted">
        {loadSeriesStart && (
          <li>
            Training load starts on {formatDay(loadSeriesStart)}, when
            heart-rate data became consistent.
          </li>
        )}
        <li>Activities recorded without heart rate count as zero load.</li>
      </ul>

      <p className="mt-6 text-sm text-muted">
        <a
          href="https://www.strava.com"
          className="rounded-sm font-medium text-foreground underline-offset-2 hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-accent"
        >
          Powered by Strava
        </a>
      </p>
    </section>
  );
}
