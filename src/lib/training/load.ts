import "server-only";

import type { DashboardResult } from "./types";
import { validateDashboard } from "./validate";

export const DASHBOARD_URL =
  "https://storage.googleapis.com/training-performance-dashboard-public/dashboard.json";

/** Matches the Cache-Control max-age the pipeline sets on the file. */
export const REVALIDATE_SECONDS = 3600;

/**
 * Fetches the pipeline's public export on the server. A failure returns an
 * error result instead of throwing, so a storage outage at build time shows
 * the error state rather than failing the deploy; the next revalidation
 * retries.
 */
export async function loadDashboard(): Promise<DashboardResult> {
  try {
    const response = await fetch(DASHBOARD_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return { ok: false, reason: "unreachable" };
    return validateDashboard(await response.json());
  } catch {
    return { ok: false, reason: "unreachable" };
  }
}
