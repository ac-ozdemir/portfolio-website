import { TSB_ZONE_LABELS, type DashboardSummary } from "@/lib/training/derive";
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
  mono?: boolean;
}

const EMPTY = "—";

function indicators({ load, zone, vdot, generatedAt }: DashboardSummary): Indicator[] {
  return [
    {
      label: "Form (TSB)",
      value: load?.tsb != null ? formatSigned(load.tsb) : EMPTY,
      context: zone ? `${TSB_ZONE_LABELS[zone]} zone` : "No load data yet",
    },
    {
      label: "Fitness (CTL)",
      value: load?.ctl != null ? formatOneDecimal(load.ctl) : EMPTY,
      context: "42-day training load",
    },
    {
      label: "Latest VDOT",
      value: vdot?.vdot != null ? formatOneDecimal(vdot.vdot) : EMPTY,
      context: vdot
        ? `${vdot.source === "race" ? (vdot.label ?? "Race") : "Interval session"}, ${formatDay(vdot.date)}`
        : "No qualifying run yet",
    },
    {
      label: "Last update",
      value: formatShortTimestamp(generatedAt),
      context: "Istanbul time, refreshed nightly",
      mono: true,
    },
  ];
}

export default function IndicatorBand({ summary }: { summary: DashboardSummary }) {
  return (
    <section aria-label="Current numbers" className="border-y border-border">
      <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-8 px-6 py-10 md:grid-cols-4">
        {indicators(summary).map(({ label, value, context, mono }) => (
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
            <dd className="mt-1 text-sm text-muted">{context}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
