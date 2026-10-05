import type { ReactNode } from "react";

export interface LegendItem {
  label: string;
  color: string;
  shape: "line" | "square" | "dot" | "ring";
}

function Swatch({ color, shape }: Pick<LegendItem, "color" | "shape">) {
  if (shape === "line") {
    return <span className="h-0.5 w-4 rounded-full" style={{ background: color }} />;
  }
  if (shape === "ring") {
    return (
      <span
        className="h-2.5 w-2.5 rounded-full border-2"
        style={{ borderColor: color }}
      />
    );
  }
  return (
    <span
      className={`h-2.5 w-2.5 ${shape === "dot" ? "rounded-full" : "rounded-sm"}`}
      style={{ background: color }}
    />
  );
}

export default function ChartFrame({
  title,
  note,
  legend,
  summary,
  empty,
  children,
}: {
  title: string;
  note: string;
  legend?: LegendItem[];
  /** Plain-language reading of the chart for screen readers. */
  summary: string;
  /** Message shown instead of the chart when the filters leave no data. */
  empty?: string;
  children: ReactNode;
}) {
  return (
    <figure className="min-w-0 border-t border-border pt-5">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-0.5 max-w-[52ch] text-sm text-muted">{note}</p>
        </div>
        {legend && !empty && (
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
            {legend.map(({ label, color, shape }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Swatch color={color} shape={shape} />
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-4">
        {empty ? (
          <p className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border px-6 text-center text-sm text-muted">
            {empty}
          </p>
        ) : (
          children
        )}
      </div>
      <figcaption className="sr-only">{empty ?? summary}</figcaption>
    </figure>
  );
}
