"use client";

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

import { formatDay, formatTick } from "@/lib/training/format";
import type { WeekPoint } from "@/lib/training/weekly";

import ChartFrame, { type LegendItem } from "./ChartFrame";
import ChartTooltip from "./ChartTooltip";
import type { ActivityFilter } from "./Filters";
import { COLORS, barCursor, chartMargin, gridProps, xAxisProps, yAxisProps } from "./chartStyle";

type LoadKey = "trimpRun" | "trimpCrossfit" | "trimpOther";

const SERIES: { key: LoadKey; label: string; color: string }[] = [
  { key: "trimpRun", label: "Running", color: COLORS.run },
  { key: "trimpCrossfit", label: "CrossFit", color: COLORS.crossfit },
  { key: "trimpOther", label: "Other", color: COLORS.other },
];

const VISIBLE: Record<ActivityFilter, LoadKey[]> = {
  all: ["trimpRun", "trimpCrossfit", "trimpOther"],
  run: ["trimpRun"],
  crossfit: ["trimpCrossfit"],
};

const total = (week: WeekPoint, keys: LoadKey[]) =>
  keys.reduce((sum, key) => sum + (week[key] ?? 0), 0);

export default function WeeklyLoadChart({
  weeks,
  activity,
}: {
  weeks: WeekPoint[];
  activity: ActivityFilter;
}) {
  const series = SERIES.filter(({ key }) => VISIBLE[activity].includes(key));
  const keys = series.map(({ key }) => key);
  // Weeks before heart-rate coverage carry no load at all, not zero load.
  const data = weeks.filter((week) => week.trimpRun !== null);
  const totals = data.map((week) => total(week, keys));
  const hasLoad = totals.some((value) => value > 0);
  const long = data.length > 30;

  const peak = Math.max(...totals);
  const peakWeek = data[totals.indexOf(peak)];
  const average = totals.reduce((a, b) => a + b, 0) / (totals.length || 1);
  const summary = hasLoad
    ? `Average weekly load ${Math.round(average)} over ${data.length} weeks; ` +
      `highest ${Math.round(peak)} in the week of ${formatDay(peakWeek.week)}.`
    : "";

  const legend: LegendItem[] | undefined =
    series.length > 1
      ? series.map(({ label, color }) => ({ label, color, shape: "square" }))
      : undefined;

  return (
    <ChartFrame
      title="Weekly training load"
      note={series.length > 1 ? "TRIMP per week, stacked by activity" : `TRIMP per week, ${series[0].label.toLowerCase()} only`}
      legend={legend}
      summary={summary}
      empty={hasLoad ? undefined : "No training load for this activity in the selected period."}
    >
      <BarChart
        responsive
        data={data}
        margin={chartMargin}
        style={{ width: "100%", height: 220 }}
      >
        <CartesianGrid {...gridProps} />
        <XAxis {...xAxisProps} dataKey="week" tickFormatter={(week: string) => formatTick(week, long)} />
        <YAxis {...yAxisProps} />
        <Tooltip
          cursor={barCursor}
          isAnimationActive={false}
          content={({ active, payload }) => {
            const week = payload?.[0]?.payload as WeekPoint | undefined;
            if (!active || !week) return null;
            return (
              <ChartTooltip
                title={`Week of ${formatDay(week.week)}`}
                rows={[
                  ...series.map(({ key, label, color }) => ({
                    label,
                    value: String(Math.round(week[key] ?? 0)),
                    color,
                  })),
                  ...(series.length > 1
                    ? [{ label: "Total", value: String(Math.round(total(week, keys))) }]
                    : []),
                ]}
              />
            );
          }}
        />
        {series.map(({ key, label, color }, index) => (
          <Bar
            key={key}
            dataKey={key}
            name={label}
            stackId="load"
            fill={color}
            // A surface-coloured edge keeps a gap between stacked segments.
            stroke={COLORS.surface}
            strokeWidth={series.length > 1 ? 1 : 0}
            radius={index === series.length - 1 ? [2, 2, 0, 0] : 0}
            maxBarSize={28}
            isAnimationActive={false}
          />
        ))}
      </BarChart>
    </ChartFrame>
  );
}
