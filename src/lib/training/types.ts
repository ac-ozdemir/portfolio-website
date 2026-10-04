// Mirrors the public dashboard.json written by the pipeline
// (training-performance-dashboard repo, pipeline/export/dashboard.py).
// Bump SUPPORTED_SCHEMA_VERSION together with the pipeline's SCHEMA_VERSION.

export const SUPPORTED_SCHEMA_VERSION = 1;

export type Category = "run" | "crossfit" | "other";

export type VdotSource = "race" | "interval";

/** One day of training load. Only days from the start of the load series are included. */
export interface DailyLoad {
  date: string; // YYYY-MM-DD
  trimp: number | null;
  trimp_run: number | null;
  trimp_crossfit: number | null;
  trimp_other: number | null;
  ctl: number | null; // fitness, 42-day load
  atl: number | null; // fatigue, 7-day load
  tsb: number | null; // form = fitness - fatigue
}

export interface VdotPoint {
  date: string;
  vdot: number | null;
  source: VdotSource;
  /** Race name for race points (races are public events); null for intervals. */
  label: string | null;
}

export interface ActivitySummary {
  date: string;
  category: Category;
  sport_type: string;
  distance_km: number | null;
  moving_time_min: number | null;
  pace_min_per_km: number | null;
  avg_hr: number | null;
  trimp: number | null;
}

export interface DashboardData {
  schema_version: typeof SUPPORTED_SCHEMA_VERSION;
  generated_at: string; // ISO 8601 with offset
  attribution: string;
  daily: DailyLoad[];
  vdot: VdotPoint[];
  activities: ActivitySummary[];
}

export type DashboardResult =
  | { ok: true; data: DashboardData }
  | { ok: false; reason: "unreachable" | "invalid" | "unsupported-version" };
