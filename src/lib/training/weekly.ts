import type { ActivitySummary, DailyLoad, DashboardData, VdotPoint } from "./types";

/** Compact, chart-ready data sent to the client instead of the raw export. */
export interface FormPoint {
  date: string;
  ctl: number | null;
  atl: number | null;
  tsb: number | null;
}

export interface WeekPoint {
  week: string; // Monday, YYYY-MM-DD
  /** Null before the load series starts, so those weeks don't read as zero load. */
  trimpRun: number | null;
  trimpCrossfit: number | null;
  trimpOther: number | null;
  runKm: number;
  /** Minutes per km over all runs that week; null without runs. */
  runPace: number | null;
  /** Time-weighted average heart rate; null without recorded heart rate. */
  hrAll: number | null;
  hrRun: number | null;
  hrCrossfit: number | null;
}

export interface ChartData {
  form: FormPoint[];
  weeks: WeekPoint[];
  vdot: VdotPoint[];
}

const DAY_MS = 86_400_000;

const toTime = (date: string) => Date.parse(`${date}T00:00:00Z`);
const toDate = (time: number) => new Date(time).toISOString().slice(0, 10);

/** Monday of the ISO week containing the date. */
export function weekStart(date: string): string {
  const time = toTime(date);
  const weekday = (new Date(time).getUTCDay() + 6) % 7; // Monday = 0
  return toDate(time - weekday * DAY_MS);
}

export function addWeeks(week: string, count: number): string {
  return toDate(toTime(week) + count * 7 * DAY_MS);
}

const round1 = (value: number) => Math.round(value * 10) / 10;

function weightedHr(activities: ActivitySummary[]): number | null {
  let minutes = 0;
  let beats = 0;
  for (const activity of activities) {
    if (activity.avg_hr === null || !activity.moving_time_min) continue;
    minutes += activity.moving_time_min;
    beats += activity.avg_hr * activity.moving_time_min;
  }
  return minutes > 0 ? round1(beats / minutes) : null;
}

function runStats(runs: ActivitySummary[]) {
  let km = 0;
  let minutes = 0;
  for (const run of runs) {
    if (!run.distance_km || !run.moving_time_min) continue;
    km += run.distance_km;
    minutes += run.moving_time_min;
  }
  return { km: round1(km), pace: km > 0 ? Math.round((minutes / km) * 100) / 100 : null };
}

function groupBy<T>(rows: T[], key: (row: T) => string): Map<string, T[]> {
  const groups = new Map<string, T[]>();
  for (const row of rows) {
    const k = key(row);
    const group = groups.get(k);
    if (group) group.push(row);
    else groups.set(k, [row]);
  }
  return groups;
}

function sumLoad(days: DailyLoad[] | undefined, field: keyof DailyLoad): number | null {
  if (!days) return null;
  return round1(days.reduce((total, day) => total + ((day[field] as number | null) ?? 0), 0));
}

export function buildChartData(data: DashboardData): ChartData {
  const dates = [
    ...data.daily.map((day) => day.date),
    ...data.activities.map((activity) => activity.date),
  ].sort();
  if (dates.length === 0) return { form: [], weeks: [], vdot: data.vdot };

  const dailyByWeek = groupBy(data.daily, (day) => weekStart(day.date));
  const activitiesByWeek = groupBy(data.activities, (activity) => weekStart(activity.date));

  const weeks: WeekPoint[] = [];
  const last = weekStart(dates[dates.length - 1]);
  // Continuous weeks, so weeks without training show as gaps or zeros.
  for (let week = weekStart(dates[0]); week <= last; week = addWeeks(week, 1)) {
    const days = dailyByWeek.get(week);
    const activities = activitiesByWeek.get(week) ?? [];
    const runs = activities.filter((activity) => activity.category === "run");
    const { km, pace } = runStats(runs);
    weeks.push({
      week,
      trimpRun: sumLoad(days, "trimp_run"),
      trimpCrossfit: sumLoad(days, "trimp_crossfit"),
      trimpOther: sumLoad(days, "trimp_other"),
      runKm: km,
      runPace: pace,
      hrAll: weightedHr(activities),
      hrRun: weightedHr(runs),
      hrCrossfit: weightedHr(activities.filter((activity) => activity.category === "crossfit")),
    });
  }

  return {
    form: data.daily.map(({ date, ctl, atl, tsb }) => ({ date, ctl, atl, tsb })),
    weeks,
    vdot: [...data.vdot].sort((a, b) => a.date.localeCompare(b.date)),
  };
}

export type Period = "12w" | "6m" | "all";

const PERIOD_WEEKS: Record<Exclude<Period, "all">, number> = { "12w": 12, "6m": 26 };

/**
 * First week shown for a period, counted back from the latest week in the
 * data rather than from today, so a missed pipeline run doesn't empty charts.
 */
export function periodStart(period: Period, latestWeek: string): string | null {
  return period === "all" ? null : addWeeks(latestWeek, -(PERIOD_WEEKS[period] - 1));
}
