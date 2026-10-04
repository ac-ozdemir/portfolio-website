import { describe, expect, it } from "vitest";

import type { ActivitySummary, DailyLoad, DashboardData } from "./types";
import { buildChartData, periodStart, weekStart } from "./weekly";

const activity = (overrides: Partial<ActivitySummary>): ActivitySummary => ({
  date: "2026-09-28",
  category: "run",
  sport_type: "Run",
  distance_km: 10,
  moving_time_min: 50,
  pace_min_per_km: 5,
  avg_hr: 150,
  trimp: 80,
  ...overrides,
});

const day = (date: string, run: number, crossfit = 0): DailyLoad => ({
  date,
  trimp: run + crossfit,
  trimp_run: run,
  trimp_crossfit: crossfit,
  trimp_other: 0,
  ctl: 40,
  atl: 45,
  tsb: -5,
});

const dataset = (overrides: Partial<DashboardData>): DashboardData => ({
  schema_version: 1,
  generated_at: "2026-10-04T20:30:00+00:00",
  attribution: "Powered by Strava.",
  daily: [],
  vdot: [],
  activities: [],
  ...overrides,
});

describe("weekStart", () => {
  it.each([
    ["2026-09-28", "2026-09-28"], // Monday
    ["2026-10-04", "2026-09-28"], // Sunday
    ["2026-10-05", "2026-10-05"],
  ])("%s starts on %s", (date, monday) => {
    expect(weekStart(date)).toBe(monday);
  });
});

describe("buildChartData", () => {
  it("sums load and distance per week and weights pace and heart rate by time", () => {
    const { weeks } = buildChartData(
      dataset({
        daily: [day("2026-09-28", 60, 40), day("2026-10-01", 20)],
        activities: [
          activity({ date: "2026-09-28" }),
          activity({ date: "2026-10-01", distance_km: 5, moving_time_min: 30, avg_hr: 160 }),
          activity({
            date: "2026-09-29",
            category: "crossfit",
            sport_type: "Crossfit",
            distance_km: 0,
            moving_time_min: 60,
            avg_hr: 140,
          }),
        ],
      }),
    );

    expect(weeks).toHaveLength(1);
    expect(weeks[0]).toMatchObject({
      week: "2026-09-28",
      trimpRun: 80,
      trimpCrossfit: 40,
      runKm: 15,
      runPace: 5.33, // 80 min / 15 km
      hrRun: 153.8, // (150*50 + 160*30) / 80
      hrCrossfit: 140,
    });
  });

  it("fills empty weeks and keeps load null before the load series", () => {
    const { weeks } = buildChartData(
      dataset({
        daily: [day("2026-09-28", 50)],
        activities: [activity({ date: "2026-09-14" })],
      }),
    );

    expect(weeks.map((week) => week.week)).toEqual([
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
    ]);
    expect(weeks[0].trimpRun).toBeNull();
    expect(weeks[1]).toMatchObject({ runKm: 0, runPace: null, hrAll: null });
    expect(weeks[2].trimpRun).toBe(50);
  });

  it("ignores heart rate on activities without it", () => {
    const { weeks } = buildChartData(
      dataset({ activities: [activity({ avg_hr: null })] }),
    );
    expect(weeks[0].hrAll).toBeNull();
  });

  it("handles an empty export", () => {
    expect(buildChartData(dataset({})).weeks).toEqual([]);
  });
});

describe("periodStart", () => {
  it("counts back from the latest week, inclusive", () => {
    expect(periodStart("12w", "2026-09-28")).toBe("2026-07-13");
    expect(periodStart("6m", "2026-09-28")).toBe("2026-04-06");
    expect(periodStart("all", "2026-09-28")).toBeNull();
  });
});
