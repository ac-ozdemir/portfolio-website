---
version: 1
slug: "s-training-performance-dashboard-page-tsx-7de3a952"
primary_target: "src/app/projects/training-performance-dashboard/page.tsx"
related_targets: ["src/lib/training","src/components/training"]
---

# Surface: Training Performance Dashboard detail page

## Scope and mode
Route `/projects/training-performance-dashboard`. One page, three parts: Summary → Dashboard → Case study.
Summary is Persuade, the Dashboard section is Operate, the Case study is Read. Extension of the incumbent
"Warm Precision" world; no new world.

## Audience, job, proof
- Recruiter or hiring manager, 1–2 minutes, often on mobile: must see within the first screen that this is
  a live, working data product, then how it was built.
- Ahmet: follows his own form, fitness and VDOT.
- Proof: live numbers from the public `dashboard.json` (schema_version 1), refreshed nightly; architecture
  strip; GitHub repo; case study.

## Constraints
- No activity names, no GPS. "Powered by Strava" attribution on the page.
- Load series start on 2025-11-01 (HR coverage); activities without HR count as zero load — say so.
- Data unavailable → clear error state; last update older than 48 hours → visible warning.
- TSB zones (from shape, approved 2026-10-04): Fatigued < −30, Optimal −30 to −10, Neutral −10 to +5,
  Fresh > +5.
- Charts and filters are a separate step (Recharts). Data palette: petrol tones plus one warm contrast,
  to be added to DESIGN.md after a colour-blindness check.

## Direction contract
THESIS: Evidence, not a claim. The first screen shows real numbers from last night's pipeline run. It
refuses the category default: the dark cockpit dashboard full of neon gauges and mock data.

OWN-WORLD: Warm paper, linen hairlines, one petrol accent. Figures set in Geist with tabular-nums; Geist
Mono only for meta lines (last update, pipeline stage names). Data colour is petrol tones plus a single
warm contrast. No shadows, no gradients, no nested cards.

STORY: The visitor understands it is real and live, believes it is built end to end (architecture strip,
GitHub), then reads the case study or opens the code.

FIRST VIEWPORT: An "All projects" back link (no eyebrow label), page title, one-sentence lead. Directly
below, a four-cell indicator band framed by hairlines: Form (TSB) with its zone, Fitness (CTL), latest
VDOT with its source, last update in mono. Under the band the architecture strip Strava → Cloud Functions
→ BigQuery → This page, then tool chips and outline buttons (View the code, Read the case study). On
mobile the band becomes 2×2 and all four numbers sit in the first screen.

SIGNATURE: Shaded TSB zones behind the Form & Fitness chart (chart step). Motion grammar: colour
transitions and the 2px card lift only.

FORM: Pinned by Ahmet in shape (Summary → Dashboard → Case study); concept-seed not run, so no seed key.
Code-led.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
