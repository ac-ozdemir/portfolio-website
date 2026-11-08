// Case study copy. The source repo is private: no repo links, setup steps,
// code excerpts, Worker address, resource ids or real health values here.

export const INTRO =
  "A single-user, read-only bridge that gives Claude my own Garmin sleep, HRV, wellness and activity data through the official Personal API. It syncs twice a day, keeps the full history, sits behind OAuth, and costs nothing to run.";

export const PROBLEM = [
  "I train for running and CrossFit with a coach I built as a Claude Project. It plans my weeks and is meant to adjust them to how well I’ve recovered. Sleep, HRV and Body Battery are the best signals for that, but they live in Garmin, and Claude had no way to read them.",
  "So every morning I took a screenshot of my sleep screen and pasted it in. It was manual and easy to skip. The coach only ever saw one night at a time, with no trends and no history, so it couldn’t plan on recovery.",
  "I wanted the coach to read the data itself: every night, with the full history, without me in the loop.",
];

export const ARCHITECTURE =
  "One Cloudflare Worker has two jobs. On a schedule, it pulls data from Garmin and writes it to D1. On request, it is the remote MCP server that claude.ai connects to as a custom connector. A local script loaded the history into the same database.";

export const MCP_TOOLS = [
  "get_sleep",
  "get_daily_wellness",
  "list_activities",
  "get_activity",
  "get_sync_status",
  "refresh_activity",
];

export const TABLES: { name: string; description: string }[] = [
  {
    name: "sleep_nights",
    description:
      "One row per night, keyed by calendar_date, the day I wake up.",
  },
  {
    name: "hrv_nights",
    description: "Overnight HRV, its 7-day average and status, by calendar_date.",
  },
  {
    name: "daily_wellness",
    description:
      "Resting heart rate, Body Battery, stress and steps, by calendar_date.",
  },
  {
    name: "activities",
    description:
      "One row per activity_id. Heart-rate zones, splits and exercise sets are kept alongside as JSON.",
  },
  {
    name: "sync_runs",
    description:
      "One row per run, recorded as cron, backfill, manual or on_demand, with its dates, row counts and any error.",
  },
];

export const DATA_MODEL_NOTES = [
  "Sleep, HRV and wellness are separate tables because each comes from a separate Garmin service. If one service changes, one table and one mapper change. A LEFT JOIN on calendar_date combines them when Claude asks, so a night with no HRV still comes back, with HRV as null.",
];

export const DATA_FLOW: { title: string; text: string }[] = [
  {
    title: "Scheduled sync.",
    text: "At 08:30 and 22:30 the Worker pulls the last 3 days and upserts them. The overlap catches late watch syncs and edited activities, and re-running a day never creates duplicates.",
  },
  {
    title: "History.",
    text: "A local script loaded about 4 years, more than 1,300 nights, through the same fetching and mapping code as the Worker. I checked the result against the Garmin app and a log I had kept by hand.",
  },
  {
    title: "Questions.",
    text: "The tools read from D1. If Claude asks about a missing day within the last 7, the server fetches it from Garmin at that moment and stores it. If Garmin doesn’t have it yet, the answer says so and gives the reason.",
  },
];

export const SQL_TECHNIQUES = [
  "Idempotent upserts with INSERT … ON CONFLICT DO UPDATE",
  "LEFT JOINs across the three date-keyed tables",
  "Schema changes as versioned migration files",
  "Indexes for activity time ranges and login-failure lookups",
  "Date-range filters with BETWEEN and substr on ISO dates",
  "AUTOINCREMENT on the sync log, so ids are never reused after deletes",
];

export const DECISIONS: { title: string; text: string }[] = [
  {
    title: "Measured the rate limit.",
    text: "Garmin doesn’t document one. I measured about 100 requests a minute, sized the sync to stay well under it, and made the client wait as long as Retry-After says.",
  },
  {
    title: "JSON summaries instead of FIT files.",
    text: "Decoding one run’s FIT file takes 50–70 ms of CPU, and the free tier allows 10 ms. The JSON summaries already carry averages, heart-rate zones, splits and sets. Per-second streams are the trade-off I accepted.",
  },
  {
    title: "History import outside the Worker.",
    text: "Four years across several endpoints is far beyond the 50 subrequests a free-tier Worker gets per run. A script on my Mac has no such limit and reuses the Worker’s code, so both paths map data the same way.",
  },
  {
    title: "Null, never an invented zero.",
    text: "Garmin leaves out fields it doesn’t have. A made-up 0 would read as “zero REM sleep” to the coach and change its advice, so missing values stay null.",
  },
  {
    title: "Garmin’s values kept apart from mine.",
    text: "Anything the server derives sits under a field named computed. Claude and I can always tell a Garmin measurement from my own arithmetic.",
  },
  {
    title: "My own store, not a Garmin call per question.",
    text: "Long-range trends don’t depend on Garmin’s query windows, answers are fast, and questions don’t spend the rate limit. On-demand fetches cover only recent days and have a 10-minute cooldown.",
  },
  {
    title: "D1, not KV, for counters.",
    text: "Login failures and client registrations have to be counted correctly at the moment of the check. KV is eventually consistent, so a burst of attempts could slip past a limit. KV still holds OAuth session data, where that doesn’t matter.",
  },
  {
    title: "Brute-force lockout on the consent page.",
    text: "The address of a connector is effectively public, and this is health data. Wrong passwords trigger per-IP and global lockouts, IPs are stored only as keyed hashes, and a lockout never disconnects an existing session.",
  },
];

/**
 * The "AI & LLM Tooling" group in Skills is generated from this list, and each
 * entry renders on the case study at its own anchor. A new skill therefore
 * cannot be listed without its evidence: add it here, with the proof in `text`.
 */
export const AI_SKILLS: { id: string; label: string; text: string }[] = [
  {
    id: "mcp-server-development",
    label: "MCP Server Development",
    text: "A remote MCP server built on the MCP SDK, with six tools, connected to claude.ai as a custom connector and running in production for my own daily use.",
  },
  {
    id: "tool-design-for-llms",
    label: "Tool Design for LLMs",
    text: "Tool descriptions tell the model when to use each tool and what the computed field means. Missing values stay null, and a notice field names the missing days and the reason, so the model reports a gap instead of reading it as an empty value.",
  },
  {
    id: "oauth-for-ai-connectors",
    label: "OAuth 2.1 for AI Connectors",
    text: "The connector uses OAuth 2.1 with PKCE and dynamic client registration, plus an owner password on the consent page. The connector address alone never exposes data, and tokens are stored hashed.",
  },
  {
    id: "ai-assisted-development",
    label: "AI-Assisted Development (Claude Code)",
    text: "I built this with Claude Code. My part was the architecture, based on limits I had measured first, reviewing the changes, and checking the imported data by hand against a log I had kept myself.",
  },
  {
    id: "claude-projects-automation",
    label: "Claude Projects & Scheduled Tasks",
    text: "The data feeds my training-coach Claude Project and its scheduled tasks, which read sleep, recovery and training data through the connector without a manual step.",
  },
];

export const RESULT = [
  "The morning screenshot is gone. The coach reads last night’s sleep, HRV and Body Battery itself, looks back over weeks or years when it needs to, and plans the next sessions on that.",
];

export const RESULT_STATS: { value: string; label: string }[] = [
  { value: "1,300+", label: "nights of history" },
  { value: "2×", label: "synced every day" },
  { value: "6", label: "MCP tools" },
  { value: "$0", label: "monthly cost, on Cloudflare’s free tier" },
];
