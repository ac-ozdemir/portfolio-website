import { TSB_BOUNDS } from "@/lib/training/derive";
import { formatSigned } from "@/lib/training/format";

const whole = (value: number) => formatSigned(value).replace(".0", "");

const terms = [
  {
    name: "Fitness",
    abbreviation: "CTL, Chronic Training Load",
    meaning:
      "The training base my body has adapted to. It’s a weighted average of my daily training load over roughly six weeks, so it climbs slowly through weeks of consistent training and fades slowly during breaks. A higher number means I can handle, and have been handling, more training.",
  },
  {
    name: "Fatigue",
    abbreviation: "ATL, Acute Training Load",
    meaning:
      "How much the last few days have taken out of me. Same calculation over about one week, so it reacts fast: a hard week pushes it well above fitness, and a few easy days bring it back down.",
  },
  {
    name: "Form",
    abbreviation: "TSB, Training Stress Balance",
    meaning: `Fitness minus fatigue: how ready I am to perform today. It is usually negative during a hard training block, which is expected, and turns positive after rest. Before a race the aim is slightly positive: fit, but not tired. Zones: fatigued below ${whole(TSB_BOUNDS.fatigued)}, optimal training ${whole(TSB_BOUNDS.fatigued)} to ${whole(TSB_BOUNDS.optimal)}, neutral ${whole(TSB_BOUNDS.optimal)} to ${whole(TSB_BOUNDS.fresh)}, fresh above ${whole(TSB_BOUNDS.fresh)}.`,
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
      "Estimated from race results, hard interval sessions and tempo runs. Higher means faster; each value maps to predicted race times.",
  },
];

export default function MetricGlossary() {
  return (
    <div>
      <dl className="grid gap-x-12 gap-y-5 text-sm md:grid-cols-2">
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
