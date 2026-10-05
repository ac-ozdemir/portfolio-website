import { TSB_BOUNDS } from "@/lib/training/derive";
import { formatSigned } from "@/lib/training/format";

const whole = (value: number) => formatSigned(value).replace(".0", "");

const terms = [
  {
    name: "Fitness",
    abbreviation: "CTL, Chronic Training Load",
    meaning:
      "My average daily training load over roughly the last six weeks. It rises slowly with consistent training.",
  },
  {
    name: "Fatigue",
    abbreviation: "ATL, Acute Training Load",
    meaning:
      "The same average over about one week. It jumps after hard weeks and drops quickly with rest.",
  },
  {
    name: "Form",
    abbreviation: "TSB, Training Stress Balance",
    meaning: `Fitness minus fatigue: below zero means tired from recent training, above zero means rested. Zones: fatigued below ${whole(TSB_BOUNDS.fatigued)}, optimal training ${whole(TSB_BOUNDS.fatigued)} to ${whole(TSB_BOUNDS.optimal)}, neutral ${whole(TSB_BOUNDS.optimal)} to ${whole(TSB_BOUNDS.fresh)}, fresh above ${whole(TSB_BOUNDS.fresh)}.`,
  },
  {
    name: "Training load",
    abbreviation: "TRIMP, Training Impulse",
    meaning:
      "The effort of a single session, calculated from its duration and how high my heart rate was.",
  },
  {
    name: "VDOT",
    abbreviation: "Jack Daniels’ running fitness score",
    meaning:
      "Estimated from race results and hard interval sessions. Higher means faster; each value maps to predicted race times.",
  },
];

export default function MetricGlossary() {
  return (
    <div className="mt-6">
      <p className="max-w-[58ch] text-foreground/90">
        How to read these numbers: five metrics drive this dashboard.
      </p>
      <dl className="mt-4 grid gap-x-12 gap-y-5 text-sm md:grid-cols-2">
        {terms.map(({ name, abbreviation, meaning }) => (
          <div key={name}>
            <dt>
              <span className="font-medium">{name}</span>
              <span className="text-muted"> · {abbreviation}</span>
            </dt>
            <dd className="mt-1 max-w-md text-muted">{meaning}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
