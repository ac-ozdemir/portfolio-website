"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";

import { ExternalLinkIcon } from "./icons";
import { LOOKER_EMBED_URL, LOOKER_REPORT_URL } from "./links";

// The report is laid out at 1200 px and scales to fit the frame's width; this
// is its canvas height (Looker overlays its footer bar), so the frame never
// scrolls inside.
const REPORT_ASPECT = "aspect-[1200/1320]";

const DESKTOP_QUERY = "(min-width: 768px)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(DESKTOP_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

// Mounting the iframe only on wide screens (rather than hiding it with CSS)
// keeps phones from loading the report at all: browsers fetch hidden iframes
// eagerly, and at phone width the scaled report is too small to read.
function useIsDesktop() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

export default function LookerReport() {
  const isDesktop = useIsDesktop();

  return (
    <div>
      <div
        className={`hidden overflow-hidden rounded-lg border border-border md:block ${REPORT_ASPECT}`}
      >
        {isDesktop && (
          <iframe
            src={LOOKER_EMBED_URL}
            title="Training Performance report in Looker Studio"
            loading="lazy"
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            allowFullScreen
            className="h-full w-full"
          />
        )}
      </div>

      <Image
        src="/looker-report.jpg"
        alt="Preview of the Looker Studio report: summary cards, a fitness, fatigue and form chart, and weekly training load by activity type."
        width={1200}
        height={900}
        sizes="calc(100vw - 3rem)"
        className="rounded-lg border border-border md:hidden"
      />

      <a
        href={LOOKER_REPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-accent hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Open the report in Looker Studio
        <ExternalLinkIcon className="h-4 w-4" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}
