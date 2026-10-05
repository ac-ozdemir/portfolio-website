"use client";

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

import { formatDay, formatOneDecimal, formatTick } from "@/lib/training/format";
import type { WeekPoint } from "@/lib/training/weekly";

import ChartFrame from "./ChartFrame";
import ChartTooltip from "./ChartTooltip";
import {
  COLORS,
  barCursor,
  chartMargin,
  gridProps,
  xAxisProps,
  yAxisProps,
} from "./chartStyle";

export default function DistanceChart({ weeks }: { weeks: WeekPoint[] }) {
  const totalKm = weeks.reduce((sum, week) => sum + week.runKm, 0);
  const long = weeks.length > 30;
  const summary =
    `${formatOneDecimal(totalKm)} km run over ${weeks.length} weeks, ` +
    `an average of ${formatOneDecimal(totalKm / (weeks.length || 1))} km per week.`;

  return (
    <ChartFrame
      title="Weekly running distance"
      note="Kilometres per week, runs only"
      summary={summary}
      empty={totalKm > 0 ? undefined : "No runs in the selected period."}
    >
      <BarChart
        responsive
        title="Weekly running distance. Use the arrow keys to read values week by week."
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
        <YAxis {...yAxisProps} unit=" km" width={52} />
        <Tooltip
          cursor={barCursor}
          isAnimationActive={false}
          content={({ active, payload }) => {
            const week = payload?.[0]?.payload as WeekPoint | undefined;
            if (!active || !week) return null;
            return (
              <ChartTooltip
                title={`Week of ${formatDay(week.week)}`}
                rows={[{ label: "Distance", value: `${formatOneDecimal(week.runKm)} km`, color: COLORS.run }]}
              />
            );
          }}
        />
        <Bar
          dataKey="runKm"
          name="Distance"
          fill={COLORS.run}
          radius={[2, 2, 0, 0]}
          maxBarSize={28}
          isAnimationActive={false}
        />
      </BarChart>
    </ChartFrame>
  );
}
