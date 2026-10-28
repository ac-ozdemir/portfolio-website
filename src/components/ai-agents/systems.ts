// Copy approved by Ahmet (2026-10-11). Rules for this page: no personal data
// (task names, companies, people, health or training values), no invented
// numbers, no em dashes.

export const INTRO =
  "Two personal systems I designed and use daily. Neither is custom code: each is a Claude project configured with a written skill, connected tools and explicit rules about what it may do without asking. I treat them like any data workflow, with clear inputs, defined rules and decisions I can check.";

export interface AiSystem {
  id: string;
  name: string;
  purpose: string;
  setup: string;
  examples: string[];
  lessonTitle: string;
  lesson: string;
}

export const SYSTEMS: AiSystem[] = [
  {
    id: "hybrid-training-coach",
    name: "Hybrid Training Coach",
    purpose:
      "A daily coach for my running and CrossFit training. Each day it turns activity data into one decision: keep the planned session or adjust it.",
    setup:
      "I configured it as a Claude project with the Strava connector as its main data source, Todoist for follow-ups, and working documents: season plan, training zones, logs. Sleep data has no connector, so a daily screenshot fills the gap. It acts as an active coach that argues for its advice and fits the plan to the week I actually have, but it never makes medical calls or fills in missing data.",
    examples: [
      "Reads the morning’s sleep data and decides whether today’s session stands.",
      "Summarises yesterday’s training with my own effort and pain notes.",
      "Reviews the week and plans the next one day by day.",
      "Follows open injury topics in every summary.",
    ],
    lessonTitle: "A design decision",
    lesson:
      "The first version was too cautious and flagged risk constantly. I changed the default to load-ready: it pulls back only when I report a problem or the data shows a concrete signal.",
  },
  {
    id: "john-personal-assistant",
    name: "John (Personal Assistant)",
    purpose:
      "A daily assistant for my tasks, email and calendar. It keeps Todoist, my inbox and my calendar consistent, so everything I capture is filed, prioritised and followed up.",
    setup:
      "I configured it as a Claude project connected to Todoist, Gmail and Google Calendar, with a written standard for projects, labels and priorities. Its scope is deliberately narrow: it manages and plans, and when something needs real content work it writes a starting prompt for another project. It never sends an email, deletes anything or accepts an invite on its own.",
    examples: [
      "Runs my side projects as phased task lists; each work session starts by pulling the next task.",
      "Files tasks with a priority and closes them with a decision note.",
      "Tidies my inbox and summarises the emails that matter.",
      "Adds dated plans and events to my calendar.",
    ],
    lessonTitle: "A lesson",
    lesson:
      "Early on it acted on an ambiguous request and closed the wrong task. Since then the rule is simple: if a request could mean two things, it asks.",
  },
];
