const groups = [
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
      "BigQuery",
      "Stored Procedures",
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
    items: [
      "Docker",
      "Node-RED",
      "Claude Code",
      "AI-Assisted Analytics Workflows",
      "Jira",
    ],
  },
];

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
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-deep-border px-3 py-1 text-sm text-deep-foreground/90"
                  >
                    {item}
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
