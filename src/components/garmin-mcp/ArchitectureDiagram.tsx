import { ArrowRightIcon } from "../training/icons";

type Node = { name: string; detail: string; cloudflare?: boolean };

const garmin: Node = { name: "Garmin API", detail: "Official Personal API" };
const cron: Node = {
  name: "Cron sync",
  detail: "08:30 and 21:30",
  cloudflare: true,
};
const backfill: Node = {
  name: "Backfill script",
  detail: "Runs on my Mac",
};
const claude: Node = { name: "claude.ai", detail: "Coach Project" };
const oauth: Node = {
  name: "OAuth gate",
  detail: "Tokens kept in KV",
  cloudflare: true,
};
const mcp: Node = { name: "MCP server", detail: "6 tools", cloudflare: true };
const d1: Node = { name: "D1", detail: "SQLite database", cloudflare: true };

// Every lane ends in D1. On wide screens D1 is one tall box on the right that
// all lanes point into; on phones each lane is a vertical list ending in D1.
const lanes: { label: string; nodes: Node[] }[] = [
  { label: "Nightly sync", nodes: [garmin, cron] },
  { label: "History import, one-off", nodes: [backfill] },
  { label: "The coach asks a question", nodes: [claude, oauth, mcp] },
];

const SLOTS = 3;

const nodeBase = "rounded-md border px-3 py-2.5";
const nodeTone = (node: Node) =>
  node.cloudflare ? "border-accent/40 bg-accent/5" : "border-border bg-background";

function NodeBox({ node, className = "" }: { node: Node; className?: string }) {
  return (
    <div className={`${nodeBase} ${nodeTone(node)} ${className}`}>
      <p className="font-mono text-sm text-foreground">{node.name}</p>
      <p className="mt-0.5 text-xs text-muted">{node.detail}</p>
    </div>
  );
}

// Down arrow on phones, a line with an arrowhead on wide screens.
function Connector({ span = 1 }: { span?: number }) {
  const colSpan = span === 5 ? "md:col-span-5" : span === 3 ? "md:col-span-3" : "";
  return (
    <li aria-hidden="true" className={`flex justify-center md:items-center ${colSpan}`}>
      <ArrowRightIcon className="h-4 w-4 rotate-90 text-accent md:hidden" />
      <span className="hidden h-px flex-1 bg-accent/50 md:block" />
      <ArrowRightIcon className="-ml-2 hidden h-4 w-4 text-accent md:block" />
    </li>
  );
}

export default function ArchitectureDiagram() {
  return (
    <figure>
      <div className="flex flex-col gap-8 md:flex-row md:gap-0">
        <div className="flex-1 space-y-8 md:space-y-6">
          {lanes.map(({ label, nodes }) => (
            <div key={label}>
              <p className="text-xs font-medium tracking-wide text-muted uppercase">
                {label}
              </p>
              <ol
                aria-label={label}
                className="mt-2 flex flex-col gap-1.5 md:grid md:grid-cols-[9.5rem_1fr_9.5rem_1fr_9.5rem_1fr] md:gap-0"
              >
                {nodes.map((node, i) => {
                  const last = i === nodes.length - 1;
                  // The last connector stretches over the empty slots so
                  // every lane reaches D1.
                  const span = last ? 1 + (SLOTS - nodes.length) * 2 : 1;
                  return [
                    <li key={node.name}>
                      <NodeBox node={node} />
                    </li>,
                    <Connector key={`${node.name}-to`} span={span} />,
                  ];
                })}
                <li className="md:hidden">
                  <NodeBox node={d1} />
                </li>
              </ol>
            </div>
          ))}
        </div>

        <NodeBox
          node={d1}
          className="hidden w-36 flex-col justify-center self-stretch md:flex"
        />
      </div>

      <figcaption className="mt-6 flex items-center gap-2 text-xs text-muted">
        <span
          aria-hidden="true"
          className="h-3 w-3 rounded-sm border border-accent/40 bg-accent/5"
        />
        Runs on Cloudflare’s free tier (Workers, D1, KV)
      </figcaption>
    </figure>
  );
}
