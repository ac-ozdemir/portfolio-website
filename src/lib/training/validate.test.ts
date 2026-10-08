import { describe, expect, it } from "vitest";

import { validateDashboard } from "./validate";

const valid = () => ({
  schema_version: 1,
  generated_at: "2026-10-04T17:52:58.141677+00:00",
  attribution: "Data provided by Strava. Powered by Strava.",
  daily: [
    {
      date: "2026-10-04",
      trimp: 115.7,
      trimp_run: 49.9,
      trimp_crossfit: 65.8,
      trimp_other: 0,
      ctl: 48.6,
      atl: 62.8,
      tsb: -7,
    },
  ],
  vdot: [{ date: "2025-12-05", vdot: 47.5, source: "interval", label: null }],
  activities: [
    {
      date: "2026-10-04",
      category: "run",
      sport_type: "Run",
      distance_km: 10.5,
      moving_time_min: 70.5,
      pace_min_per_km: 6.72,
      avg_hr: null,
      trimp: 49.9,
    },
  ],
});

describe("validateDashboard", () => {
  it("accepts the pipeline's schema", () => {
    expect(validateDashboard(valid()).ok).toBe(true);
  });

  it("rejects a different schema version", () => {
    expect(validateDashboard({ ...valid(), schema_version: 2 })).toEqual({
      ok: false,
      reason: "unsupported-version",
    });
  });

  it("rejects a malformed row", () => {
    const payload = valid();
    payload.daily[0].ctl = "48.6" as unknown as number;
    expect(validateDashboard(payload)).toEqual({ ok: false, reason: "invalid" });
  });

  it("rejects an unknown category", () => {
    const payload = valid();
    payload.activities[0].category = "swim";
    expect(validateDashboard(payload).ok).toBe(false);
  });

  it("accepts tempo VDOT points", () => {
    const payload = valid();
    payload.vdot.push({ date: "2026-10-02", vdot: 50.1, source: "tempo", label: null });
    expect(validateDashboard(payload).ok).toBe(true);
  });

  it("rejects an unknown VDOT source", () => {
    const payload = valid();
    payload.vdot[0].source = "long-run";
    expect(validateDashboard(payload).ok).toBe(false);
  });

  it("rejects non-objects", () => {
    expect(validateDashboard(null).ok).toBe(false);
    expect(validateDashboard([]).ok).toBe(false);
  });
});
