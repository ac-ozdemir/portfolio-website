import Link from "next/link";
import type { SVGProps } from "react";

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

function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...IconProps(props)}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
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

function ActivityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...IconProps(props)}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function ServerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...IconProps(props)}>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <line x1="7" y1="7.5" x2="7.01" y2="7.5" />
      <line x1="7" y1="16.5" x2="7.01" y2="16.5" />
    </svg>
  );
}

function MessageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...IconProps(props)}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

const projects: {
  title: string;
  description: string;
  tags: string[];
  Icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
  href?: string;
  linkLabel?: string;
}[] = [
  {
    title: "Training Performance Dashboard",
    description:
      "A live dashboard of my own training data. A nightly Google Cloud pipeline turns Strava activities into training load, fitness and VDOT in BigQuery.",
    tags: ["Python", "BigQuery", "Google Cloud", "Next.js"],
    Icon: ActivityIcon,
    href: "/projects/training-performance-dashboard",
    linkLabel: "Live dashboard and case study",
  },
  {
    title: "Garmin → Claude Health Data Bridge",
    description:
      "My own MCP server on Cloudflare that gives my Claude training coach secure access to my Garmin sleep, recovery and training data, synced twice a day with the full history.",
    tags: ["Cloudflare Workers", "D1 (SQLite)", "MCP", "OAuth 2.1"],
    Icon: ServerIcon,
    href: "/projects/garmin-mcp",
    linkLabel: "How it works",
  },
  {
    title: "AI Agents & Workflows",
    description:
      "Two personal AI systems I designed and use daily on Claude: a coach for my running and CrossFit training, and an assistant that runs my task management. Each has its own skill, connected tools and rules.",
    tags: ["Claude", "Skills", "Connectors", "Workflow design"],
    Icon: MessageIcon,
    href: "/projects/ai-agents-workflows",
    linkLabel: "How they’re set up",
  },
  {
    title: "Real-Time Operational Performance Dashboard",
    description:
      "Consolidated real-time data from 130+ machines into a single Power BI dashboard, improving stakeholder visibility by 25% — independently recognized as a company-wide best-practice example.",
    tags: ["Power BI", "SQL", "ETL"],
    Icon: BarChartIcon,
  },
  {
    title: "RFID-Based Shelf-Life Material Tracking",
    description:
      "Built a preventive asset-tracking system with RFID and Node-RED, cutting material loss incidents by 20% by moving tracking from reactive to proactive.",
    tags: ["Node-RED", "MQTT", "SQL"],
    Icon: WorkflowIcon,
  },
  {
    title: "Root-Cause Analysis on a Rising Cost Metric",
    description:
      "Used SQL-driven analysis to isolate the drivers behind a rising cost trend, enabling targeted process changes that delivered a 10% reduction.",
    tags: ["SQL", "Root-Cause Analysis"],
    Icon: SearchIcon,
  },
  {
    title: "This Portfolio",
    description:
      "Designed and built this site end-to-end with Next.js, deployed on Vercel.",
    tags: ["Next.js", "TypeScript"],
    Icon: CodeIcon,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-sm font-medium tracking-wide text-accent uppercase">
        Projects
      </h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map(({ title, description, tags, Icon, href, linkLabel }) => (
          <article
            key={title}
            className="relative flex flex-col rounded-lg border border-border p-6 transition-[transform,border-color] hover:-translate-y-0.5 hover:border-accent has-[a:focus-visible]:border-accent has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-accent"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
              <Icon />
            </span>
            <h3 className="mt-4 font-semibold">
              {href ? (
                <Link
                  href={href}
                  className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none"
                >
                  {title}
                </Link>
              ) : (
                title
              )}
            </h3>
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
            {href && linkLabel && (
              <p
                className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-accent"
                aria-hidden="true"
              >
                {linkLabel}
                <svg {...IconProps({ className: "h-4 w-4" })}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
