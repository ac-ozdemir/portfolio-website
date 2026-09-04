import Reveal from "@/components/Reveal";

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
      "Node-RED",
    ],
  },
  {
    label: "Cloud",
    items: ["Azure Data Factory", "Azure SQL", "Snowflake", "AWS RDS"],
  },
  {
    label: "Analytics Methods",
    items: [
      "Root-Cause Analysis",
      "A/B Testing",
      "Statistical Analysis",
      "Trend & Variance Analysis",
      "KPI Design",
      "Data Modeling",
    ],
  },
  {
    label: "Other",
    items: ["Docker", "Claude Code", "AI-Assisted Analytics Workflows", "Jira"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <h2 className="text-sm font-medium tracking-wide text-accent uppercase">
          Skills
        </h2>

        <div className="mt-8 space-y-6">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="text-sm font-medium text-muted">{group.label}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-3 py-1 text-sm text-foreground/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
