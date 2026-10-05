"use client";

import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

import { formatDay, formatPace, formatTick } from "@/lib/training/format";
import type { WeekPoint } from "@/lib/training/weekly";

import ChartFrame from "./ChartFrame";
import ChartTooltip from "./ChartTooltip";
import {
  COLORS,
  chartMargin,
  gridProps,
  lineCursor,
  showDots,
  xAxisProps,
  yAxisProps,
} from "./chartStyle";

export default function PaceChart({ weeks }: { weeks: WeekPoint[] }) {
  const paces = weeks.flatMap((week) => (week.runPace == null ? [] : [week.runPace]));
  const long = weeks.length > 30;
  // Axis on whole 30-second steps so ticks read as round paces.
  const fastest = Math.floor(Math.min(...paces) * 2) / 2;
  const slowest = Math.ceil(Math.max(...paces) * 2) / 2;
  const ticks = Array.from(
    { length: Math.round((slowest - fastest) * 2) + 1 },
    (_, index) => fastest + index / 2,
  );
  const summary = paces.length
    ? `Average weekly pace ranged from ${formatPace(Math.min(...paces))} to ` +
      `${formatPace(Math.max(...paces))} per km; the latest week with runs averaged ` +
      `${formatPace(paces[paces.length - 1])} per km.`
    : "";

  return (
    <ChartFrame
      title="Pace trend"
      note="Average pace per week, runs only. Faster is higher."
      summary={summary}
      empty={paces.length ? undefined : "No runs in the selected period."}
    >
      <LineChart
        responsive
        title="Weekly running pace. Use the arrow keys to read values week by week."
        desc={summary}
        data={weeks}
        margin={chartMargin}
        style={{ width: "100%", height: 220 }}
      >
        <CartesianGrid {...gridProps} />
        <XAxis
          {...xAxisProps}
          dataKey="week"
          tickFormatter={(week: string) => formatTick(week, long)}
        />
        <YAxis
          {...yAxisProps}
          reversed
          domain={[fastest, slowest]}
          ticks={ticks}
          tickFormatter={(value: number) => formatPace(value)}
          width={44}
        />
        <Tooltip
          cursor={lineCursor}
          isAnimationActive={false}
          content={({ active, payload }) => {
            const week = payload?.[0]?.payload as WeekPoint | undefined;
            if (!active || !week || week.runPace == null) return null;
            return (
              <ChartTooltip
                title={`Week of ${formatDay(week.week)}`}
                rows={[{ label: "Pace", value: `${formatPace(week.runPace)} /km`, color: COLORS.run }]}
              />
            );
          }}
        />
        <Line
          type="linear"
          dataKey="runPace"
          name="Pace"
          stroke={COLORS.run}
          strokeWidth={2}
          dot={{ r: showDots(paces.length) ? 3 : 2, fill: COLORS.run, strokeWidth: 0 }}
          activeDot={{ r: 4, stroke: COLORS.surface, strokeWidth: 2 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartFrame>
  );
}
