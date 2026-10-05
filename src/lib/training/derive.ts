import { formatSigned } from "./format";
import type { DailyLoad, DashboardData, VdotPoint } from "./types";

/** The pipeline runs nightly; past this age a missed run is likely. */
export const STALE_AFTER_HOURS = 48;

export type TsbZone = "fatigued" | "optimal" | "neutral" | "fresh";

export const TSB_ZONE_LABELS: Record<TsbZone, string> = {
  fatigued: "Fatigued",
  optimal: "Optimal training",
  neutral: "Neutral",
  fresh: "Fresh",
};

/** Zone boundaries approved in the page plan (2026-10-04). */
export const TSB_BOUNDS = { fatigued: -30, optimal: -10, fresh: 5 } as const;

export function tsbZone(tsb: number): TsbZone {
  if (tsb < TSB_BOUNDS.fatigued) return "fatigued";
  if (tsb < TSB_BOUNDS.optimal) return "optimal";
  if (tsb <= TSB_BOUNDS.fresh) return "neutral";
  return "fresh";
}

/** Most recent day that has form and fitness values. */
export function latestLoad(daily: DailyLoad[]): DailyLoad | null {
  for (let i = daily.length - 1; i >= 0; i--) {
    if (daily[i].tsb !== null && daily[i].ctl !== null) return daily[i];
  }
  return null;
}

export function latestVdot(points: VdotPoint[]): VdotPoint | null {
  const valid = points.filter((point) => point.vdot !== null);
  if (valid.length === 0) return null;
  return valid.reduce((latest, point) =>
    point.date > latest.date ? point : latest,
  );
}

export function hoursSince(iso: string, now: Date): number {
  return (now.getTime() - Date.parse(iso)) / 3_600_000;
}

export function isStale(generatedAt: string, now: Date): boolean {
  return hoursSince(generatedAt, now) > STALE_AFTER_HOURS;
}

export interface DashboardSummary {
  load: DailyLoad | null;
  zone: TsbZone | null;
  vdot: VdotPoint | null;
  generatedAt: string;
  stale: boolean;
  loadSeriesStart: string | null;
}

export function summarize(data: DashboardData, now: Date): DashboardSummary {
  const load = latestLoad(data.daily);
  return {
    load,
    zone: load?.tsb != null ? tsbZone(load.tsb) : null,
    vdot: latestVdot(data.vdot),
    generatedAt: data.generated_at,
    stale: isStale(data.generated_at, now),
    loadSeriesStart: data.daily[0]?.date ?? null,
  };
}

/**
 * A plain-language reading of today's form, built from the latest values and
 * the approved TSB zones, so a reader doesn't need the glossary to interpret
 * the numbers.
 */
export function describeForm(load: DailyLoad): string | null {
  const { ctl, atl, tsb } = load;
  if (ctl == null || atl == null || tsb == null) return null;
  const fitness = ctl.toFixed(1);
  const fatigue = atl.toFixed(1);
  const form = formatSigned(tsb);

  switch (tsbZone(tsb)) {
    case "fatigued":
      return `Fatigue (${fatigue}) is well above fitness (${fitness}), so form is ${form}. A very heavy stretch of training: deeply tired, and rest is due.`;
    case "optimal":
      return `Fatigue (${fatigue}) is above fitness (${fitness}), so form is ${form}. A productive training block: tired in the way that builds fitness.`;
    case "neutral":
      return atl > ctl
        ? `Fatigue (${fatigue}) is above fitness (${fitness}), so form is ${form}. The last week has been heavier than my six-week base: a little tired, but within the normal range.`
        : `Fitness (${fitness}) and fatigue (${fatigue}) are close, so form is ${form}: balanced, neither tired nor fully rested.`;
    case "fresh":
      return `Fitness (${fitness}) is above fatigue (${fatigue}), so form is ${form}. Training has eased off: rested and ready to perform.`;
  }
}
