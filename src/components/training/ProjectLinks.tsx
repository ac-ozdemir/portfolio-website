import { GitHubIcon } from "./icons";

export const REPO_URL =
  "https://github.com/ac-ozdemir/training-performance-dashboard";

const tags = ["Python", "Google Cloud", "BigQuery", "Next.js"];

const buttonClass =
  "inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function ProjectLinks() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tools">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href={REPO_URL} className={buttonClass}>
          <GitHubIcon className="h-4 w-4" />
          View the code
        </a>
        <a href="#case-study" className={buttonClass}>
          Read the case study
        </a>
      </div>
    </div>
  );
}
