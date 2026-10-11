import type { ReactNode } from "react";

import ArchitectureStrip from "./ArchitectureStrip";
import LookerReport from "./LookerReport";
import MetricGlossary from "./MetricGlossary";
import ToolChips from "./ToolChips";

// Case study copy approved by Ahmet (2026-10-04); Faz 3 additions approved
// 2026-10-11 (Training repo: docs/case-study-draft.md).
const INTRO =
  "Strava and Garmin show single workouts well, but not how training load builds up across running and CrossFit, or whether I’m actually getting fitter. I wanted one view that answers both, built the way I’d build it at work.";

const ARCHITECTURE =
  "A Python Cloud Function runs every night at 23:30 Istanbul time. It pulls my full Strava history, loads it into BigQuery as a fresh snapshot, computes daily metrics and publishes a small pre-aggregated JSON file. This page reads that file, so the site holds no credentials and a visit costs no queries.";

const LATER_SECTIONS: {
  title: string;
  paragraphs: string[];
  extra?: ReactNode;
}[] = [
  {
    title: "Key decisions",
    paragraphs: [
      "A full snapshot on every run instead of incremental merges, so edited or deleted activities are always picked up. A separate least-privilege service account for each job. A static JSON export instead of an API layer. Route and GPS data are never stored, and nothing public names an activity except races. If the nightly run fails, a Cloud Monitoring alert emails me.",
    ],
  },
  {
    title: "Metrics and their limits",
    paragraphs: [
      "Training load is Banister TRIMP from heart rate; fitness and fatigue are its 42- and 7-day exponentially weighted averages, and form is the difference. VDOT comes from races and from interval and tempo sessions I tag as workouts in Strava, counted only when heart rate shows the effort was hard enough. TRIMP is only an approximation for CrossFit, and heart-rate coverage is reliable from November 2025 onwards.",
    ],
  },
  {
    title: "How I checked the numbers",
    paragraphs: [
      "A metric I can’t check is just a number. I recomputed every session’s load with a second, independent model, heart-rate TSS based on my lactate-threshold heart rate, and compared the two. They agree closely: r = 0.955 per activity (0.975 for runs, 0.951 for CrossFit), and on 88% of days both put me in the same form zone, so the zone thresholds on this page hold for TRIMP.",
      "For running fitness, my latest interval session (50.9), tempo run (51.7) and race (51.2) land within a point of each other. Garmin’s VO2max reads about 3 points higher after the same race. That is expected: Garmin estimates physiology, VDOT measures race performance, which is why this page calls it running fitness rather than VO2max.",
    ],
  },
  {
    title: "What real data revealed",
    paragraphs: [
      "Automatic 1 km laps looked like intervals and had to be filtered out; requiring at least 90% of lactate-threshold heart rate separates real interval work from steady running. Short reps are left out on purpose: 400–800 m repeats are run faster than VO2max pace and would inflate the estimate. A single 210 bpm reading on a HIIT session was an optical-sensor spike, so maximum heart rate is set from the highest plausible value instead.",
    ],
  },
  {
    title: "The same data in Looker Studio",
    paragraphs: [
      "The same BigQuery tables also feed a Looker Studio report, a second presentation layer built with a standard BI tool. It connects only to reporting views that expose safe columns, with no activity names or ids, so the privacy rules hold however the report is edited, and viewers cannot download the data. Where this page shows where I stand today, the report summarises whatever period you pick.",
    ],
    extra: <LookerReport />,
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

          {LATER_SECTIONS.map(({ title, paragraphs, extra }) => (
            <Part key={title} title={title}>
              <div className="space-y-4">
                {paragraphs.map((text) => (
                  <p key={text.slice(0, 32)} className={prose}>
                    {text}
                  </p>
                ))}
              </div>
              {extra && <div className="mt-6">{extra}</div>}
            </Part>
          ))}
        </div>
      </section>
    </div>
  );
}
