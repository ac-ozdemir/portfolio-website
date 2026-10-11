import { ChevronRightIcon } from "../icons";

// Copy approved by Ahmet (2026-10-11). Thresholds mirror the Training repo's
// pipeline/metrics/workouts.py — update both together.
export default function VdotSelectionNote() {
  return (
    <details className="group mt-4 text-sm">
      <summary className="-mx-1 inline-flex cursor-pointer list-none items-center gap-1 rounded-sm px-1 py-1 text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
        <ChevronRightIcon className="h-4 w-4 group-open:rotate-90" />
        How points are chosen
      </summary>
      <p className="mt-2 max-w-[65ch] pl-5 leading-6 text-muted">
        I tag runs in Strava myself: <em>Race</em> for races I actually raced
        (not ones I paced), <em>Workout</em> for interval and tempo sessions. A
        race counts as it is. A workout counts only if its laps show the
        structure and its heart rate shows the effort: intervals need at least
        two reps of 2.5–6 minutes at ≥&nbsp;90% of my lactate-threshold heart
        rate; tempo needs at least 15 minutes in 10–40-minute blocks at
        ≥&nbsp;95%. Sessions recorded on automatic 1&nbsp;km or 1&nbsp;mile
        laps, and short reps under 2.5 minutes, are left out because they would
        overstate fitness.
      </p>
    </details>
  );
}
