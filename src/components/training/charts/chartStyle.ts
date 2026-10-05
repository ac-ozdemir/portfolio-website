// Shared Recharts styling so every chart reads as one system: recessive grid
// and axes in text tokens, colour reserved for the data.

export const COLORS = {
  run: "var(--color-data-run)",
  crossfit: "var(--color-data-crossfit)",
  other: "var(--color-data-other)",
  total: "var(--color-foreground)",
  form: "var(--color-deep)",
  surface: "var(--color-background)",
} as const;

const tick = { fill: "var(--color-muted)", fontSize: 12 };

export const xAxisProps = {
  tick,
  tickLine: false,
  axisLine: { stroke: "var(--color-border)" },
  minTickGap: 28,
  // Evenly spaced ticks that still respect minTickGap at narrow widths.
  interval: "equidistantPreserveStart",
  tickMargin: 8,
} as const;

export const yAxisProps = {
  tick,
  tickLine: false,
  axisLine: false,
  width: 40,
} as const;

export const gridProps = {
  vertical: false,
  stroke: "var(--color-border)",
} as const;

export const lineCursor = {
  stroke: "var(--color-muted)",
  strokeDasharray: "3 3",
} as const;

export const barCursor = {
  fill: "var(--color-accent)",
  fillOpacity: 0.06,
} as const;

export const chartMargin = { top: 8, right: 8, bottom: 0, left: 0 };

/** Show point markers only when there are few enough points to read them. */
export const showDots = (points: number) => points <= 26;
