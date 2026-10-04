import Link from "next/link";

import { ArrowLeftIcon } from "./icons";

export default function TrainingHeader() {
  return (
    <header className="mx-auto max-w-5xl px-6 pt-12 md:pt-20">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 rounded-sm text-sm text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        All projects
      </Link>

      <h1 className="mt-8 text-4xl font-semibold tracking-tight text-balance md:text-6xl">
        Training Performance Dashboard
      </h1>
      <p className="mt-6 max-w-2xl text-base text-foreground/90 md:text-lg">
        A live view of my own running and CrossFit training. A cloud pipeline
        pulls my Strava activities every night, computes training load,
        fitness and VDOT, and publishes the numbers this page reads.
      </p>

    </header>
  );
}
