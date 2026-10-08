import {
  SUPPORTED_SCHEMA_VERSION,
  type DashboardData,
  type DashboardResult,
} from "./types";

type Row = Record<string, unknown>;

const isRow = (value: unknown): value is Row =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isDate = (value: unknown): value is string =>
  typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);

const isNumberOrNull = (value: unknown) =>
  value === null || (typeof value === "number" && Number.isFinite(value));

const hasNumbers = (row: Row, keys: string[]) =>
  keys.every((key) => isNumberOrNull(row[key]));

function isDailyRow(value: unknown) {
  return (
    isRow(value) &&
    isDate(value.date) &&
    hasNumbers(value, [
      "trimp",
      "trimp_run",
      "trimp_crossfit",
      "trimp_other",
      "ctl",
      "atl",
      "tsb",
    ])
  );
}

function isVdotRow(value: unknown) {
  return (
    isRow(value) &&
    isDate(value.date) &&
    isNumberOrNull(value.vdot) &&
    (value.source === "race" || value.source === "interval" || value.source === "tempo") &&
    (value.label === null || typeof value.label === "string")
  );
}

function isActivityRow(value: unknown) {
  return (
    isRow(value) &&
    isDate(value.date) &&
    (value.category === "run" ||
      value.category === "crossfit" ||
      value.category === "other") &&
    typeof value.sport_type === "string" &&
    hasNumbers(value, [
      "distance_km",
      "moving_time_min",
      "pace_min_per_km",
      "avg_hr",
      "trimp",
    ])
  );
}

/**
 * Checks the shape of a parsed dashboard.json. Every row is checked, so a
 * pipeline change that breaks the contract shows the error state instead of
 * rendering wrong numbers.
 */
export function validateDashboard(payload: unknown): DashboardResult {
  if (!isRow(payload)) return { ok: false, reason: "invalid" };
  if (payload.schema_version !== SUPPORTED_SCHEMA_VERSION) {
    return { ok: false, reason: "unsupported-version" };
  }

  const valid =
    typeof payload.generated_at === "string" &&
    !Number.isNaN(Date.parse(payload.generated_at)) &&
    typeof payload.attribution === "string" &&
    Array.isArray(payload.daily) &&
    payload.daily.every(isDailyRow) &&
    Array.isArray(payload.vdot) &&
    payload.vdot.every(isVdotRow) &&
    Array.isArray(payload.activities) &&
    payload.activities.every(isActivityRow);

  return valid
    ? { ok: true, data: payload as unknown as DashboardData }
    : { ok: false, reason: "invalid" };
}
