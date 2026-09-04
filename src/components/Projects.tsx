import type { SVGProps } from "react";
import Reveal from "@/components/Reveal";

function IconProps(props: SVGProps<SVGSVGElement>) {
  return {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
    ...props,
  };
}

function BarChartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...IconProps(props)}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function WorkflowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...IconProps(props)}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  );
}

function CodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...IconProps(props)}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

const projects = [
  {
    title: "Project One",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    tags: ["Power BI", "SQL"],
    Icon: BarChartIcon,
  },
  {
    title: "Project Two",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    tags: ["Python", "ETL"],
    Icon: WorkflowIcon,
  },
  {
    title: "This Portfolio",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    tags: ["Next.js", "TypeScript"],
    Icon: CodeIcon,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <h2 className="text-sm font-medium tracking-wide text-accent uppercase">
          Projects
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {projects.map(({ title, description, tags, Icon }) => (
            <article
              key={title}
              className="rounded-lg border border-border p-6 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
                <Icon />
              </span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted">{description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
