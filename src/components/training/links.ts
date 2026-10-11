export const REPO_URL =
  "https://github.com/ac-ozdemir/training-performance-dashboard";

export const outlineButtonClass =
  "inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

// Looker Studio report on the same BigQuery data (reporting views only).
// hl=en keeps its dates in English to match the page, whatever the browser locale.
const LOOKER_REPORT_PATH =
  "reporting/6343fec2-11d3-4128-ac04-129ab38a34d7/page/su2AG";
export const LOOKER_EMBED_URL = `https://datastudio.google.com/embed/${LOOKER_REPORT_PATH}?hl=en`;
export const LOOKER_REPORT_URL = `https://datastudio.google.com/${LOOKER_REPORT_PATH}?hl=en`;
