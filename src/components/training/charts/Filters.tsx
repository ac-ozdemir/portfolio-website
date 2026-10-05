import type { Period } from "@/lib/training/weekly";

export type ActivityFilter = "all" | "run" | "crossfit";

interface Option<T extends string> {
  value: T;
  label: string;
}

export const PERIOD_OPTIONS: Option<Period>[] = [
  { value: "12w", label: "12 weeks" },
  { value: "6m", label: "6 months" },
  { value: "all", label: "All" },
];

export const ACTIVITY_OPTIONS: Option<ActivityFilter>[] = [
  { value: "all", label: "All" },
  { value: "run", label: "Running" },
  { value: "crossfit", label: "CrossFit" },
];

function Segmented<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-muted">{legend}</legend>
      <div className="mt-2 inline-flex rounded-md border border-border p-0.5">
        {options.map((option) => (
          <label
            key={option.value}
            className="min-w-11 cursor-pointer rounded px-3 py-1.5 text-center text-sm pointer-coarse:py-3 text-foreground/80 transition-colors hover:text-accent has-checked:bg-accent/10 has-checked:font-medium has-checked:text-accent has-focus-visible:outline-2 has-focus-visible:outline-accent"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function Filters({
  period,
  activity,
  onPeriodChange,
  onActivityChange,
}: {
  period: Period;
  activity: ActivityFilter;
  onPeriodChange: (period: Period) => void;
  onActivityChange: (activity: ActivityFilter) => void;
}) {
  return (
    <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
      <Segmented
        name="period"
        legend="Period"
        options={PERIOD_OPTIONS}
        value={period}
        onChange={onPeriodChange}
      />
      <Segmented
        name="activity"
        legend="Activity"
        options={ACTIVITY_OPTIONS}
        value={activity}
        onChange={onActivityChange}
      />
      <p className="max-w-xs pb-1.5 text-sm text-muted">
        The activity filter applies to weekly load and heart rate.
      </p>
    </div>
  );
}
