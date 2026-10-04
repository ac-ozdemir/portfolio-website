"use client";

import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

import { formatDay, formatTick } from "@/lib/training/format";
import type { WeekPoint } from "@/lib/training/weekly";

import ChartFrame from "./ChartFrame";
import ChartTooltip from "./ChartTooltip";
import type { ActivityFilter } from "./Filters";
import {
  COLORS,
  chartMargin,
  gridProps,
  lineCursor,
  showDots,
  xAxisProps,
  yAxisProps,
} from "./chartStyle";

const SERIES = {
  all: { key: "hrAll", label: "all activities", color: COLORS.total },
  run: { key: "hrRun", label: "runs", color: COLORS.run },
  crossfit: { key: "hrCrossfit", label: "CrossFit", color: COLORS.crossfit },
} as const;

export default function HeartRateChart({
  weeks,
  activity,
}: {
  weeks: WeekPoint[];
  activity: ActivityFilter;
}) {
  const { key, label, color } = SERIES[activity];
  // Heart rate is only recorded from late 2025; start the axis at the first reading.
  const firstWithValue = weeks.findIndex((week) => week[key] != null);
  const shown = firstWithValue > 0 ? weeks.slice(firstWithValue) : weeks;
  const values = shown.flatMap((week) => (week[key] == null ? [] : [week[key]]));
  const long = shown.length > 30;
  const low = Math.floor((Math.min(...values) - 2) / 5) * 5;
  const high = Math.ceil((Math.max(...values) + 2) / 5) * 5;
  const step = high - low > 40 ? 10 : 5;
  const ticks = Array.from({ length: (high - low) / step + 1 }, (_, i) => low + i * step);
  const summary = values.length
    ? `Weekly average heart rate for ${label} ranged from ${Math.round(Math.min(...values))} ` +
      `to ${Math.round(Math.max(...values))} bpm.`
    : "";

  return (
    <ChartFrame
      title="Heart rate trend"
      note={`Average heart rate per week, ${label}, weighted by duration`}
      summary={summary}
      empty={values.length ? undefined : "No heart-rate data for this activity in the selected period."}
    >
      <LineChart
        responsive
        data={shown}
        margin={chartMargin}
        style={{ width: "100%", height: 220 }}
      >
        <CartesianGrid {...gridProps} />
        <XAxis {...xAxisProps} dataKey="week" tickFormatter={(week: string) => formatTick(week, long)} />
        <YAxis {...yAxisProps} domain={[low, high]} ticks={ticks} />
        <Tooltip
          cursor={lineCursor}
          isAnimationActive={false}
          content={({ active, payload }) => {
            const week = payload?.[0]?.payload as WeekPoint | undefined;
            const value = week?.[key];
            if (!active || !week || value == null) return null;
            return (
              <ChartTooltip
                title={`Week of ${formatDay(week.week)}`}
                rows={[{ label: "Heart rate", value: `${Math.round(value)} bpm`, color }]}
              />
            );
          }}
        />
        <Line
          type="monotone"
          dataKey={key}
          name="Heart rate"
          stroke={color}
          strokeWidth={2}
          connectNulls
          dot={showDots(values.length) ? { r: 3, fill: color, strokeWidth: 0 } : false}
          activeDot={{ r: 4, stroke: COLORS.surface, strokeWidth: 2 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartFrame>
  );
}
