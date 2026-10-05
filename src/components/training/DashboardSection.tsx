import { formatDay } from "@/lib/training/format";
import type { ChartData } from "@/lib/training/weekly";

import StravaAttribution from "./StravaAttribution";
import TrainingDashboard from "./TrainingDashboard";

export default function DashboardSection({
  chartData,
  loadSeriesStart,
}: {
  chartData: ChartData;
  loadSeriesStart: string | null;
}) {
  return (
    <section
      id="dashboard"
      aria-labelledby="dashboard-heading"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 pt-10"
    >
      <h2 id="dashboard-heading" className="sr-only">
        Dashboard
      </h2>

      <TrainingDashboard data={chartData} />

      <ul className="mt-12 max-w-2xl space-y-1 text-sm text-muted">
        {loadSeriesStart && (
          <li>
            Training load starts on {formatDay(loadSeriesStart)}, when
            heart-rate data became consistent.
          </li>
        )}
        <li>Activities recorded without heart rate count as zero load.</li>
      </ul>

      <div className="mt-8">
        <StravaAttribution />
      </div>
    </section>
  );
}
