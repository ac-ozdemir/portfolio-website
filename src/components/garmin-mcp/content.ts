// Case study copy approved by Ahmet (2026-10-25). Facts follow the
// garmin-mcp repo README (github.com/ac-ozdemir/garmin-mcp).

export const REPO_URL = "https://github.com/ac-ozdemir/garmin-mcp";

export const INTRO =
  "A small server I built and run on Cloudflare that lets Claude read my Garmin sleep, recovery and training data. It syncs twice a day, keeps the full history, and sits behind OAuth so only I can connect to it.";

export const PROBLEM = [
  "I train for running and CrossFit with a coach I built on Claude. It plans my weeks and is meant to adjust them to how well I’ve recovered. Sleep, HRV and Body Battery are the best signals for that, but they live in Garmin, and Claude had no way to read them.",
  "So every morning I took a screenshot of my sleep screen and pasted it in. It was manual and easy to skip. The coach only ever saw one night at a time, with no trends and no history, so it couldn’t plan on recovery.",
  "I wanted the coach to read the data itself: every night, with the full history, without me in the loop.",
];

export const HOW_IT_WORKS =
  "A Cloudflare Worker pulls sleep, HRV, daily wellness and activities from Garmin’s official Personal API twice a day and writes them to a D1 database. A one-off script on my Mac loaded four years of history through the same code. The same Worker is also a remote MCP server: claude.ai connects to it as a custom connector, signs in through OAuth, and the coach reads the data through six tools.";

export const TOOLS = [
  "TypeScript",
  "Cloudflare Workers",
  "D1 (SQLite)",
  "KV",
  "Cron",
  "MCP",
  "OAuth 2.1",
];

export const TABLES: { name: string; description: string }[] = [
  {
    name: "sleep_nights",
    description: "One row per night, keyed by the day I wake up.",
  },
  {
    name: "hrv_nights",
    description: "Overnight HRV, its 7-day average and status.",
  },
  {
    name: "daily_wellness",
    description:
      "One row per day: resting heart rate, Body Battery, stress and steps, merged from two Garmin endpoints.",
  },
  {
    name: "activities",
    description:
      "One row per activity. Heart-rate zones, splits and exercise sets are kept alongside as JSON.",
  },
  {
    name: "sync_runs",
    description:
      "A log of every sync: what triggered it, which dates, how many rows, and any error.",
  },
];

export const DATA_MODEL_NOTES = [
  "Sleep, HRV and wellness are three tables because Garmin serves them from three separate services. If one of them changes, only one table and one mapper change. They are joined on the date when Claude asks, so a night with missing HRV still comes back, with HRV as null.",
  "Every write is an upsert on the table’s key, so re-running a sync never creates duplicates. I checked the imported history against the Garmin app and a log I had kept by hand.",
];

export const DECISIONS: { title: string; text: string }[] = [
  {
    title: "Measured the rate limit first.",
    text: "Garmin doesn’t document one. I measured about 100 requests a minute and sized the sync to stay well under it.",
  },
  {
    title: "JSON instead of FIT files.",
    text: "Decoding one run’s FIT file takes 50–70 ms of CPU; the free plan allows 10 ms. The JSON activity summaries already carry averages, heart-rate zones, splits and sets.",
  },
  {
    title: "History import outside the Worker.",
    text: "Four years is about 1,000 days across several endpoints, far beyond the 50 outbound requests a Worker gets per run on the free plan. The script on my Mac reuses the Worker’s own fetch and mapping code.",
  },
  {
    title: "Null, never zero.",
    text: "Garmin leaves out fields it doesn’t have. A made-up 0 would read as “zero REM sleep” to the coach, so missing values stay null, and each tool tells the model which days are missing and why.",
  },
  {
    title: "Nights dated by the wake-up day.",
    text: "That’s how Garmin dates them and how the question is asked: “last night” is today’s date.",
  },
  {
    title: "OAuth for health data.",
    text: "claude.ai connectors need OAuth 2.1 with PKCE and dynamic client registration. The connector URL alone is never enough to read the data, and tokens are stored hashed.",
  },
];

export const RESULT = [
  "The morning screenshot is gone. The coach reads last night’s sleep, HRV and Body Battery itself, looks back over weeks or years when it needs to, and plans the next sessions on that.",
  "If I ask “how did I sleep last night?” before the morning sync has run, the server fetches that night from Garmin on the spot and stores it.",
];

export const SQL_TECHNIQUES = [
  "Idempotent upserts with INSERT … ON CONFLICT DO UPDATE",
  "LEFT JOINs across three source tables on the date",
  "Schema changes as versioned migration files",
  "An index on activity start time, with date functions for range queries",
  "A recursive CTE to find days with no data",
  "AUTOINCREMENT on the sync log, so ids are never reused after deletes",
];
