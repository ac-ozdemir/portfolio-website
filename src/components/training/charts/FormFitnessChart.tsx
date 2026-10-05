"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceDot,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { TSB_BOUNDS, TSB_ZONE_LABELS, tsbZone } from "@/lib/training/derive";
import {
  formatDay,
  formatOneDecimal,
  formatSigned,
  formatTick,
} from "@/lib/training/format";
import type { FormPoint } from "@/lib/training/weekly";

import ChartFrame from "./ChartFrame";
import ChartTooltip from "./ChartTooltip";
import {
  COLORS,
  chartMargin,
  gridProps,
  lineCursor,
  xAxisProps,
  yAxisProps,
} from "./chartStyle";

const SYNC_ID = "form-fitness";

// Room on the right for the zone labels; both panels share it so their time
// axes line up.
const margin = { ...chartMargin, right: 64 };

const ZONE_SHORT_LABELS = {
  fatigued: "Fatigued",
  optimal: "Optimal",
  neutral: "Neutral",
  fresh: "Fresh",
} as const;

// Tints stay faint: the zones are context behind the form line, not data.
const ZONES = [
  { key: "fatigued", fill: "var(--color-data-crossfit)", opacity: 0.1 },
  { key: "optimal", fill: "var(--color-data-run)", opacity: 0.1 },
  { key: "neutral", fill: "transparent", opacity: 0 },
  { key: "fresh", fill: "var(--color-data-run)", opacity: 0.04 },
] as const;

function FormTooltip({ point }: { point: FormPoint }) {
  return (
    <ChartTooltip
      title={formatDay(point.date)}
      rows={[
        ...(point.ctl != null
          ? [{ label: "Fitness", value: formatOneDecimal(point.ctl), color: COLORS.run }]
          : []),
        ...(point.atl != null
          ? [{ label: "Fatigue", value: formatOneDecimal(point.atl), color: COLORS.crossfit }]
          : []),
        ...(point.tsb != null
          ? [
              {
                label: `Form, ${TSB_ZONE_LABELS[tsbZone(point.tsb)].toLowerCase()}`,
                value: formatSigned(point.tsb),
                color: COLORS.form,
              },
            ]
          : []),
      ]}
    />
  );
}

function summarize(points: FormPoint[]): string {
  const latest = points[points.length - 1];
  const tsbValues = points.flatMap((p) => (p.tsb == null ? [] : [p.tsb]));
  if (!latest || latest.tsb == null || latest.ctl == null || latest.atl == null) {
    return "No form and fitness data for this period.";
  }
  return (
    `On ${formatDay(latest.date)} fitness was ${formatOneDecimal(latest.ctl)}, ` +
    `fatigue ${formatOneDecimal(latest.atl)} and form ${formatSigned(latest.tsb)}, ` +
    `in the ${TSB_ZONE_LABELS[tsbZone(latest.tsb)].toLowerCase()} zone. ` +
    `Over the period form ranged from ${formatSigned(Math.min(...tsbValues))} ` +
    `to ${formatSigned(Math.max(...tsbValues))}.`
  );
}

export default function FormFitnessChart({ points }: { points: FormPoint[] }) {
  const tsbValues = points.flatMap((p) => (p.tsb == null ? [] : [p.tsb]));
  const low = Math.min(-35, Math.floor(Math.min(...tsbValues) - 5));
  const high = Math.max(15, Math.ceil(Math.max(...tsbValues) + 5));
  const bounds = [low, TSB_BOUNDS.fatigued, TSB_BOUNDS.optimal, TSB_BOUNDS.fresh, high];
  const long = points.length > 200;
  const loadMax = Math.max(
    20,
    ...points.flatMap((p) => [p.ctl ?? 0, p.atl ?? 0]),
  );
  const loadTicks = Array.from(
    { length: Math.ceil(loadMax / 20) + 1 },
    (_, i) => i * 20,
  );
  const today = [...points].reverse().find((p) => p.tsb != null);
  const tickFormatter = (date: string) => formatTick(date, long);

  const tooltip = (
    <Tooltip
      cursor={lineCursor}
      isAnimationActive={false}
      content={({ active, payload }) =>
        active && payload?.[0] ? (
          <FormTooltip point={payload[0].payload as FormPoint} />
        ) : null
      }
    />
  );

  const summary = summarize(points);

  return (
    <ChartFrame
      title="Form & fitness"
      note="Fitness is training built up over about six weeks, fatigue is roughly the last week, and form is the difference: below zero means tired, above zero rested. Daily, from all training; not affected by the activity filter."
      legend={[
        { label: "Fitness (CTL)", color: COLORS.run, shape: "line" },
        { label: "Fatigue (ATL)", color: COLORS.crossfit, shape: "line" },
      ]}
      summary={summary}
      empty={points.length === 0 ? "No form and fitness data for this period." : undefined}
    >
      <LineChart
        responsive
        title="Fitness and fatigue, daily. Use the arrow keys to read values day by day."
        desc={summary}
        data={points}
        syncId={SYNC_ID}
        margin={margin}
        style={{ width: "100%", height: 220 }}
      >
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="date" hide />
        <YAxis
          {...yAxisProps}
          domain={[0, loadTicks[loadTicks.length - 1]]}
          ticks={loadTicks}
        />
        {tooltip}
        <Line
          type="monotone"
          dataKey="ctl"
          name="Fitness"
          stroke={COLORS.run}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="atl"
          name="Fatigue"
          stroke={COLORS.crossfit}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>

      <p className="mt-4 mb-1 text-xs font-medium text-muted">
        Form (TSB) · the dot marks today
      </p>
      <LineChart
        responsive
        title="Form, daily, with fatigued, optimal, neutral and fresh zones. Use the arrow keys to read values day by day."
        desc={summary}
        data={points}
        syncId={SYNC_ID}
        margin={margin}
        style={{ width: "100%", height: 180 }}
      >
        {ZONES.map((zone, index) => (
          <ReferenceArea
            key={zone.key}
            y1={bounds[index]}
            y2={bounds[index + 1]}
            fill={zone.fill}
            fillOpacity={zone.opacity}
            strokeOpacity={0}
            ifOverflow="hidden"
            label={{
              value: ZONE_SHORT_LABELS[zone.key],
              position: "right",
              fill: "var(--color-muted)",
              fontSize: 11,
            }}
          />
        ))}
        <ReferenceLine y={0} stroke="var(--color-muted)" strokeDasharray="3 3" />
        <XAxis {...xAxisProps} dataKey="date" tickFormatter={tickFormatter} />
        <YAxis
          {...yAxisProps}
          domain={[low, high]}
          // The fresh boundary (+5) sits too close to 0 to label both; the band shows it.
          ticks={[TSB_BOUNDS.fatigued, TSB_BOUNDS.optimal, 0]}
          interval={0}
          tickFormatter={(value: number) => formatSigned(value).replace(".0", "")}
        />
        {tooltip}
        <Line
          type="monotone"
          dataKey="tsb"
          name="Form"
          stroke={COLORS.form}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
        {today && (
          // Ties the chart to the Form number in the indicator band.
          <ReferenceDot
            x={today.date}
            y={today.tsb!}
            r={4}
            fill={COLORS.form}
            stroke={COLORS.surface}
            strokeWidth={2}
          />
        )}
      </LineChart>
    </ChartFrame>
  );
}
