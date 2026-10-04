"use client";

import { CartesianGrid, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";

import { formatDay, formatOneDecimal, formatTick } from "@/lib/training/format";
import type { VdotPoint } from "@/lib/training/types";

import ChartFrame from "./ChartFrame";
import ChartTooltip from "./ChartTooltip";
import { COLORS, chartMargin, gridProps, xAxisProps, yAxisProps } from "./chartStyle";

interface Plotted extends VdotPoint {
  time: number;
}

const DAY_MS = 86_400_000;
const PADDING_MS = 30 * DAY_MS;

/** First day of each quarter between two times, for evenly spaced date ticks. */
function quarterTicks(from: number, to: number): number[] {
  const start = new Date(from);
  let year = start.getUTCFullYear();
  let month = Math.ceil(start.getUTCMonth() / 3) * 3;
  const ticks: number[] = [];
  for (;;) {
    if (month >= 12) {
      year += 1;
      month -= 12;
    }
    const tick = Date.UTC(year, month, 1);
    if (tick > to) return ticks;
    if (tick >= from) ticks.push(tick);
    month += 3;
  }
}

// Races are filled, intervals are rings: shape repeats the colour encoding.
function RaceDot({ cx, cy }: { cx?: number; cy?: number }) {
  return <circle cx={cx} cy={cy} r={5} fill={COLORS.run} stroke={COLORS.surface} strokeWidth={2} />;
}

function IntervalDot({ cx, cy }: { cx?: number; cy?: number }) {
  return <circle cx={cx} cy={cy} r={4.5} fill={COLORS.surface} stroke={COLORS.crossfit} strokeWidth={2} />;
}

const describe = (point: VdotPoint) =>
  point.source === "race" ? (point.label ?? "Race") : "Interval session";

export default function VdotChart({ points }: { points: VdotPoint[] }) {
  const plotted: Plotted[] = points
    .filter((point) => point.vdot != null)
    .map((point) => ({ ...point, time: Date.parse(`${point.date}T00:00:00Z`) }));
  const races = plotted.filter((point) => point.source === "race");
  const intervals = plotted.filter((point) => point.source === "interval");

  const times = plotted.map((point) => point.time);
  const domain: [number, number] = [
    Math.min(...times) - PADDING_MS,
    Math.max(...times) + PADDING_MS,
  ];

  const summary = plotted
    .map((point) => `${describe(point)}, ${formatDay(point.date)}: VDOT ${formatOneDecimal(point.vdot!)}`)
    .join(". ");

  return (
    <ChartFrame
      title="VDOT history"
      note="Running fitness estimated from races and qualifying interval sessions. Shows all history; not affected by the filters."
      legend={[
        { label: "Race", color: COLORS.run, shape: "dot" },
        { label: "Interval session", color: COLORS.crossfit, shape: "ring" },
      ]}
      summary={summary}
      empty={plotted.length ? undefined : "No races or qualifying interval sessions yet."}
    >
      <ScatterChart responsive margin={{ ...chartMargin, right: 16 }} style={{ width: "100%", height: 220 }}>
        <CartesianGrid {...gridProps} />
        <XAxis
          {...xAxisProps}
          dataKey="time"
          type="number"
          scale="time"
          domain={domain}
          ticks={plotted.length ? quarterTicks(...domain) : undefined}
          tickFormatter={(time: number) => formatTick(new Date(time).toISOString().slice(0, 10), true)}
        />
        <YAxis {...yAxisProps} dataKey="vdot" type="number" domain={["dataMin - 2", "dataMax + 2"]} allowDecimals={false} />
        <Tooltip
          cursor={false}
          isAnimationActive={false}
          content={({ active, payload }) => {
            const point = payload?.[0]?.payload as Plotted | undefined;
            if (!active || !point || point.vdot == null) return null;
            return (
              <ChartTooltip
                title={describe(point)}
                rows={[
                  { label: "Date", value: formatDay(point.date) },
                  {
                    label: "VDOT",
                    value: formatOneDecimal(point.vdot),
                    color: point.source === "race" ? COLORS.run : COLORS.crossfit,
                  },
                ]}
              />
            );
          }}
        />
        <Scatter name="Race" data={races} shape={RaceDot} isAnimationActive={false} />
        <Scatter name="Interval session" data={intervals} shape={IntervalDot} isAnimationActive={false} />
      </ScatterChart>
    </ChartFrame>
  );
}
