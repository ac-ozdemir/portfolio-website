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
export function tsbZone(tsb: number): TsbZone {
  if (tsb < -30) return "fatigued";
  if (tsb < -10) return "optimal";
  if (tsb <= 5) return "neutral";
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
