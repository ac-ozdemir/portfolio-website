import {
  TSB_ZONE_LABELS,
  describeForm,
  type DashboardSummary,
} from "@/lib/training/derive";
import {
  formatDay,
  formatOneDecimal,
  formatShortTimestamp,
  formatSigned,
} from "@/lib/training/format";

interface Indicator {
  label: string;
  value: string;
  context: string;
  /** Plain-language meaning, for readers who don't know the metric. */
  hint?: string;
  mono?: boolean;
}

const EMPTY = "—";

function indicators({
  load,
  zone,
  vdot,
  generatedAt,
}: DashboardSummary): Indicator[] {
  return [
    {
      label: "Form (TSB)",
      value: load?.tsb != null ? formatSigned(load.tsb) : EMPTY,
      context: zone ? `${TSB_ZONE_LABELS[zone]} zone` : "No load data yet",
      hint: "How ready I am to perform today",
    },
    {
      label: "Fitness (CTL)",
      value: load?.ctl != null ? formatOneDecimal(load.ctl) : EMPTY,
      context: "Six-week training load",
      hint: "My long-term training base",
    },
    {
      label: "Running fitness (VDOT)",
      value: vdot?.vdot != null ? formatOneDecimal(vdot.vdot) : EMPTY,
      context: vdot
        ? `${vdot.source === "race" ? (vdot.label ?? "Race") : "Interval session"}, ${formatDay(vdot.date)}`
        : "No qualifying run yet",
      hint: "Higher means faster race times",
    },
    {
      label: "Last update",
      value: formatShortTimestamp(generatedAt),
      context: "Istanbul time, refreshed nightly",
      mono: true,
    },
  ];
}

export default function IndicatorBand({
  summary,
}: {
  summary: DashboardSummary;
}) {
  const reading = summary.load ? describeForm(summary.load) : null;

  return (
    <section aria-label="Current numbers" className="border-y border-border">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {indicators(summary).map(({ label, value, context, hint, mono }) => (
            <div key={label} className="flex flex-col">
              <dt className="text-sm font-medium text-muted">{label}</dt>
              <dd
                className={
                  mono
                    ? "mt-2 font-mono text-base leading-9 text-foreground"
                    : "mt-2 text-3xl font-semibold tabular-nums text-accent"
                }
              >
                {value}
              </dd>
              <dd className="mt-1 text-sm text-foreground/80">{context}</dd>
              {hint && <dd className="text-sm text-muted">{hint}</dd>}
            </div>
          ))}
        </dl>
        {reading && (
          <div className="mt-8 border-t border-border pt-6">
            <p className="max-w-[62ch] text-foreground/90">
              <span className="font-medium text-foreground">Right now: </span>
              {reading}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
