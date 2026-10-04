// Approved by Ahmet (2026-10-04); expanded in Faz 3 after the metrics are validated.
const sections = [
  {
    title: "The problem",
    body: "Strava and Garmin show single workouts well, but not how training load builds up across running and CrossFit, or whether I’m actually getting fitter. I wanted one view that answers both, built the way I’d build it at work.",
  },
  {
    title: "Architecture",
    body: "A Python Cloud Function runs every night at 23:30 Istanbul time. It pulls my full Strava history, loads it into BigQuery as a fresh snapshot, computes daily metrics and publishes a small pre-aggregated JSON file. This page reads that file, so the site holds no credentials and a visit costs no queries.",
  },
  {
    title: "Key decisions",
    body: "A full snapshot on every run instead of incremental merges, so edited or deleted activities are always picked up. A separate least-privilege service account for each job. A static JSON export instead of an API layer.",
  },
  {
    title: "Metrics and their limits",
    body: "Training load is Banister TRIMP from heart rate; fitness and fatigue are its 42- and 7-day exponentially weighted averages, and form is the difference. VDOT comes from races and qualifying interval sessions. TRIMP is only an approximation for CrossFit, and heart-rate coverage is reliable from November 2025 onwards.",
  },
  {
    title: "What real data revealed",
    body: "Automatic 1 km laps looked like intervals and had to be filtered out; requiring at least 90% of lactate-threshold heart rate separates real interval work from steady running.",
  },
];

export default function CaseStudy() {
  return (
    <section
      id="case-study"
      aria-labelledby="case-study-heading"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24"
    >
      <h2
        id="case-study-heading"
        className="text-sm font-medium tracking-wide text-accent uppercase"
      >
        Case study
      </h2>
      <div className="mt-8 max-w-2xl space-y-10">
        {sections.map(({ title, body }) => (
          <article key={title}>
            <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
            <p className="mt-3 leading-7 text-foreground/90">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
