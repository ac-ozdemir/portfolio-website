const MINUS = "−";

/** One decimal with a true minus sign and an explicit plus for positive values. */
export function formatSigned(value: number): string {
  const fixed = Math.abs(value).toFixed(1);
  if (value > 0) return `+${fixed}`;
  if (value < 0) return `${MINUS}${fixed}`;
  return fixed;
}

export function formatOneDecimal(value: number): string {
  return value.toFixed(1);
}

/** "5 Apr 2026" from a YYYY-MM-DD date, independent of server time zone. */
export function formatDay(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

/** "4 Oct 2026, 20:52" in Istanbul time, where the pipeline is scheduled. */
export function formatTimestamp(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Europe/Istanbul",
  }).format(new Date(iso));
}

/** "4 Oct, 20:52" in Istanbul time; the short form for the indicator band. */
export function formatShortTimestamp(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Europe/Istanbul",
  }).format(new Date(iso));
}
