import type { ReactNode } from "react";

import ArchitectureStrip from "./ArchitectureStrip";
import MetricGlossary from "./MetricGlossary";
import ToolChips from "./ToolChips";

// Case study copy approved by Ahmet (2026-10-04); expanded in Faz 3 after the
// metrics are validated.
const INTRO =
  "Strava and Garmin show single workouts well, but not how training load builds up across running and CrossFit, or whether I’m actually getting fitter. I wanted one view that answers both, built the way I’d build it at work.";

const ARCHITECTURE =
  "A Python Cloud Function runs every night at 23:30 Istanbul time. It pulls my full Strava history, loads it into BigQuery as a fresh snapshot, computes daily metrics and publishes a small pre-aggregated JSON file. This page reads that file, so the site holds no credentials and a visit costs no queries.";

const LATER_SECTIONS = [
  {
    title: "Key decisions",
    body: "A full snapshot on every run instead of incremental merges, so edited or deleted activities are always picked up. A separate least-privilege service account for each job. A static JSON export instead of an API layer.",
  },
  {
    title: "Metrics and their limits",
    body: "Training load is Banister TRIMP from heart rate; fitness and fatigue are its 42- and 7-day exponentially weighted averages, and form is the difference. VDOT comes from races and from interval and tempo sessions I tag as workouts in Strava, counted only when heart rate shows the effort was hard enough. TRIMP is only an approximation for CrossFit, and heart-rate coverage is reliable from November 2025 onwards.",
  },
  {
    title: "What real data revealed",
    body: "Automatic 1 km laps looked like intervals and had to be filtered out; requiring at least 90% of lactate-threshold heart rate separates real interval work from steady running.",
  },
];

function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

const prose = "max-w-[58ch] leading-7 text-foreground/90";

export default function HowItsBuilt() {
  return (
    // Full-width hairline, like the indicator band, so the rule spans the page.
    <div className="mt-24 border-t border-border">
      <section
        id="how-its-built"
        aria-labelledby="how-its-built-heading"
        className="mx-auto max-w-5xl scroll-mt-20 px-6 pt-16 pb-24"
      >
        <h2
          id="how-its-built-heading"
          className="text-sm font-medium tracking-wide text-accent uppercase"
        >
          How it’s built
        </h2>

        <div className="mt-8 space-y-12">
          <p className={prose}>{INTRO}</p>

          <Part title="The metrics">
            <p className={`${prose} mb-5`}>
              Five numbers drive the dashboard. Here is what each one means and
              what its abbreviation stands for.
            </p>
            <MetricGlossary />
          </Part>

          <Part title="Architecture">
            <p className={prose}>{ARCHITECTURE}</p>
            <div className="mt-6">
              <ArchitectureStrip />
            </div>
            <div className="mt-6">
              <ToolChips />
            </div>
          </Part>

          {LATER_SECTIONS.map(({ title, body }) => (
            <Part key={title} title={title}>
              <p className={prose}>{body}</p>
            </Part>
          ))}
        </div>
      </section>
    </div>
  );
}
