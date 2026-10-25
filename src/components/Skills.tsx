import Link from "next/link";

type Skill = string | { label: string; href: string };

const groups: { label: string; note?: string; items: Skill[] }[] = [
  {
    label: "Analysis & BI",
    items: [
      "SQL",
      "Python",
      "DAX",
      "Power BI",
      "Power Query",
      "Report Builder",
      "Grafana",
      "Tableau",
    ],
  },
  {
    label: "Data & ETL",
    items: [
      "MS SQL Server",
      "PostgreSQL",
      "SQLite (Cloudflare D1)",
      "BigQuery",
      "Stored Procedures",
      "SQL Performance Tuning",
      "Scheduled Jobs",
    ],
  },
  {
    label: "Analytics Methods",
    items: [
      "KPI Design",
      "Data Modeling",
      "Root-Cause Analysis",
      "A/B Testing",
      "Statistical Analysis",
      "Trend & Variance Analysis",
    ],
  },
  {
    label: "Other",
    items: ["Docker", "Node-RED", "AI-Assisted Analytics Workflows", "Jira"],
  },
  // Rule (2026-10-25): only skills with a project to show for them; every
  // item links to that project.
  {
    label: "AI & LLM Tooling",
    note: "Each links to the project where I used it.",
    items: [
      { label: "MCP Server Development", href: "/projects/garmin-mcp" },
      {
        label: "Tool Design for LLMs",
        href: "/projects/garmin-mcp#design-decisions",
      },
      { label: "OAuth 2.1 for AI Connectors", href: "/projects/garmin-mcp" },
      {
        label: "AI-Assisted Development (Claude Code)",
        href: "/projects/training-performance-dashboard",
      },
      {
        label: "Claude Skills, Connectors & Scheduled Tasks",
        href: "/projects/ai-agents-workflows",
      },
    ],
  },
];

const chip = "rounded-full border border-deep-border px-3 py-1 text-sm";

function SkillChip({ skill }: { skill: Skill }) {
  if (typeof skill === "string") {
    return <span className={`${chip} block text-deep-foreground/90`}>{skill}</span>;
  }
  return (
    <Link
      href={skill.href}
      className={`${chip} inline-flex items-center gap-1.5 text-deep-foreground transition-colors hover:border-deep-accent hover:text-deep-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-accent`}
    >
      {skill.label}
      <span aria-hidden="true" className="text-deep-accent">
        →
      </span>
    </Link>
  );
}

const skillKey = (skill: Skill) =>
  typeof skill === "string" ? skill : skill.label;

export default function Skills() {
  return (
    <section id="skills" className="bg-deep px-6 py-24 text-deep-foreground">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-sm font-medium tracking-wide text-deep-accent uppercase">
          Skills
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {groups.map((group, i) => (
            <div
              key={group.label}
              className={`rounded-lg border border-deep-border bg-white/5 p-6 ${
                i === groups.length - 1 && groups.length % 2 !== 0
                  ? "sm:col-span-2"
                  : ""
              }`}
            >
              <p className="text-sm font-medium text-deep-muted">
                {group.label}
              </p>
              {group.note && (
                <p className="mt-1 text-xs text-deep-muted">{group.note}</p>
              )}
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={skillKey(item)}>
                    <SkillChip skill={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
