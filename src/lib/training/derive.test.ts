import { describe, expect, it } from "vitest";

import {
  isStale,
  latestLoad,
  latestVdot,
  summarize,
  tsbZone,
} from "./derive";
import type { DailyLoad, DashboardData } from "./types";

const day = (date: string, tsb: number | null, ctl: number | null = 40): DailyLoad => ({
  date,
  trimp: 0,
  trimp_run: 0,
  trimp_crossfit: 0,
  trimp_other: 0,
  ctl,
  atl: ctl === null || tsb === null ? null : ctl - tsb,
  tsb,
});

describe("tsbZone", () => {
  it.each([
    [-30.1, "fatigued"],
    [-30, "optimal"],
    [-10.1, "optimal"],
    [-10, "neutral"],
    [5, "neutral"],
    [5.1, "fresh"],
  ] as const)("maps %d to %s", (tsb, zone) => {
    expect(tsbZone(tsb)).toBe(zone);
  });
});

describe("latestLoad", () => {
  it("skips trailing days without values", () => {
    const daily = [day("2026-10-01", -5), day("2026-10-02", null)];
    expect(latestLoad(daily)?.date).toBe("2026-10-01");
  });

  it("returns null for an empty series", () => {
    expect(latestLoad([])).toBeNull();
  });
});

describe("latestVdot", () => {
  it("picks the most recent dated point, not the last in the array", () => {
    const points = [
      { date: "2026-04-05", vdot: 51.2, source: "race" as const, label: "Runtalya 2026" },
      { date: "2025-12-05", vdot: 47.5, source: "interval" as const, label: null },
    ];
    expect(latestVdot(points)?.label).toBe("Runtalya 2026");
  });

  it("ignores points without a value", () => {
    expect(latestVdot([{ date: "2026-01-01", vdot: null, source: "race", label: null }])).toBeNull();
  });
});

describe("isStale", () => {
  const generated = "2026-10-04T20:30:00+00:00";

  it("is fresh within 48 hours", () => {
    expect(isStale(generated, new Date("2026-10-06T20:30:00Z"))).toBe(false);
  });

  it("is stale after 48 hours", () => {
    expect(isStale(generated, new Date("2026-10-06T20:31:00Z"))).toBe(true);
  });
});

describe("summarize", () => {
  it("combines the latest values", () => {
    const data: DashboardData = {
      schema_version: 1,
      generated_at: "2026-10-04T20:30:00+00:00",
      attribution: "Powered by Strava.",
      daily: [day("2025-11-01", 0), day("2026-10-04", -7, 48.6)],
      vdot: [],
      activities: [],
    };
    const summary = summarize(data, new Date("2026-10-05T08:00:00Z"));
    expect(summary.zone).toBe("neutral");
    expect(summary.load?.ctl).toBe(48.6);
    expect(summary.vdot).toBeNull();
    expect(summary.stale).toBe(false);
    expect(summary.loadSeriesStart).toBe("2025-11-01");
  });
});
