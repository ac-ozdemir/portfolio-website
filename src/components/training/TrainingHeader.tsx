import Link from "next/link";

import { ArrowLeftIcon, GitHubIcon } from "./icons";
import { REPO_URL, outlineButtonClass } from "./links";

export default function TrainingHeader() {
  return (
    <header className="mx-auto max-w-5xl px-6 pt-12 md:pt-20">
      <Link
        href="/#projects"
        className="-my-3 inline-flex items-center gap-1.5 rounded-sm py-3 text-sm text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        All projects
      </Link>

      <h1 className="mt-8 text-4xl font-semibold tracking-tight text-balance md:text-6xl">
        Training Performance Dashboard
      </h1>
      <p className="mt-6 max-w-2xl text-base text-foreground/90 md:text-lg">
        A live view of my own running and CrossFit training, fed by a cloud
        pipeline that turns my Strava activities into training load, fitness
        and VDOT every night.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href={REPO_URL} className={outlineButtonClass}>
          <GitHubIcon className="h-4 w-4" />
          View the code
        </a>
        <a href="#how-its-built" className={outlineButtonClass}>
          How it’s built
        </a>
      </div>
    </header>
  );
}
