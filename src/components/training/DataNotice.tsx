import type { ReactNode } from "react";

import { REPO_URL } from "./ProjectLinks";
import { InfoIcon } from "./icons";

function Notice({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="status" className="mx-auto mt-10 max-w-5xl px-6">
      <div className="flex w-full gap-3 rounded-lg border border-border p-4">
        <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <div>
          <p className="font-medium">{title}</p>
          <p className="mt-1 max-w-2xl text-sm text-muted">{children}</p>
        </div>
      </div>
    </div>
  );
}

const codeLink = (
  <a
    href={REPO_URL}
    className="rounded-sm text-accent underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-accent"
  >
    on GitHub
  </a>
);

export function UnavailableNotice({ reason }: { reason: "unreachable" | "invalid" | "unsupported-version" }) {
  if (reason === "unreachable") {
    return (
      <Notice title="Live data couldn’t be loaded right now">
        This page reads a file the pipeline publishes each night, and it
        didn’t respond. The page tries again within the hour; the code is{" "}
        {codeLink} in the meantime.
      </Notice>
    );
  }
  return (
    <Notice title="The latest data export doesn’t match this page">
      The pipeline’s output changed shape, so nothing is shown rather than
      wrong numbers. The code is {codeLink} in the meantime.
    </Notice>
  );
}

export function StaleNotice({ updated, days }: { updated: string; days: number }) {
  return (
    <Notice title={`Data last updated ${days} days ago`}>
      The nightly pipeline may have missed a run. The numbers below are from{" "}
      <span className="font-mono">{updated}</span> (Istanbul time).
    </Notice>
  );
}
