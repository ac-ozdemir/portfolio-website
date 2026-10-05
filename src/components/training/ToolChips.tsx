const tools = ["Python", "Google Cloud", "BigQuery", "Next.js", "Recharts"];

export default function ToolChips() {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tools">
      {tools.map((tool) => (
        <li
          key={tool}
          className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
        >
          {tool}
        </li>
      ))}
    </ul>
  );
}
