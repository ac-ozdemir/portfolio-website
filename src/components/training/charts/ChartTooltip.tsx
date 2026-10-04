export interface TooltipRow {
  label: string;
  value: string;
  color?: string;
}

/** Tooltip body in text tokens; the colour swatch carries series identity. */
export default function ChartTooltip({
  title,
  rows,
}: {
  title: string;
  rows: TooltipRow[];
}) {
  return (
    <div className="min-w-40 rounded-md border border-border bg-background px-3 py-2 text-sm">
      <p className="font-medium">{title}</p>
      <dl className="mt-1 space-y-0.5">
        {rows.map(({ label, value, color }) => (
          <div key={label} className="flex items-center gap-2">
            {color && (
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: color }}
              />
            )}
            <dt className="text-muted">{label}</dt>
            <dd className="ml-auto pl-3 font-medium tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
