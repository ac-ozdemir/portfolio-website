# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: recruiters and hiring managers** screening candidates for Data Analyst, BI Analyst and
  Product Analyst roles in tech, e-commerce and banking/fintech — both global (remote-first) and
  Turkish tech companies. They read in English, usually arrive from a CV or LinkedIn link, and spend a
  minute or two deciding whether the candidate is worth an interview.
- **Secondary: the site owner, Ahmet Can Özdemir**, who uses the Training Performance Dashboard page to
  follow his own training.

## Product Purpose

A personal portfolio that supports Ahmet's career move from defense/aerospace (Senior Data Analyst at
TUSAŞ) into the tech sector. It is a professional reference point shared alongside job applications:
it shows who he is, what he has built, and lets a reviewer verify it. Success means a reviewer leaves
convinced he can own data work end to end and wants to talk to him.

## Positioning

An industrial engineer turned senior data analyst who ships real, working data products — not mock-ups.
The Training Performance Dashboard runs on his own Strava data through a live, daily cloud pipeline
(Strava API → Cloud Functions → BigQuery → dashboard), so the work can be inspected rather than taken on
trust.

## Operating Context

- Visitors arrive from a CV, LinkedIn profile or job application, on desktop and mobile.
- Project pages double as case studies: what the problem was, what was built, and the evidence.
- The Training Performance Dashboard page combines a live dashboard (data refreshed nightly from a public,
  pre-aggregated JSON) with its case study on the same page. Its first job is to convince a recruiter;
  its second is to be genuinely useful to Ahmet.

## Capabilities and Constraints

- Sections: About, Experience timeline, Projects, Skills, summary stats, Contact; downloadable CV.
- Content is in English. A single light theme; no dark mode.
- Corporate projects are described in generalized terms — no confidential employer details.
- No blog and no analytics in the current scope.
- Training data published on the site: training load, distance, pace, heart rate and VDOT are
  acceptable to show publicly (confirmed by Ahmet). GPS/route data and activity names are never
  published.
- Strava data must carry "Powered by Strava" attribution (Strava API terms).
- Live at `acozdemir.com` (Vercel).

## Brand Commitments

- Name: Ahmet Can Özdemir.
- Voice: professional but warm — not cold and corporate, not casual or sloppy.
- Simplicity first: this is job-application material, not an art portfolio. Less but better.
- Career-change narrative is framed positively and forward-looking.

## Evidence on Hand

- CV: `public/cv.pdf`. Headshot and personal photos: `public/headshot.jpg`, `public/marathon-*.jpg`,
  `public/diving-*.jpg`.
- Projects: Real-Time Operational Performance Dashboard (Power BI), RFID-Based Shelf-Life Material
  Tracking (Node-RED), Root-Cause Analysis on a Rising Cost Metric (SQL), this portfolio (Next.js), and
  the Training Performance Dashboard (live data; code at
  `github.com/ac-ozdemir/training-performance-dashboard`).
- Summary stats on the site: 3.5+ years in data & analytics, 75+ dashboards and reports shipped.
- Personal facts used on the site: Istanbul Marathon 2025 in 3:30, Divemaster.
- Absent — must not be fabricated: testimonials, client logos, employer names beyond what Ahmet
  approves, performance or business-impact numbers not already on the site.

## Product Principles

1. **Evidence over claims.** Prefer something a reviewer can open, run or verify over an adjective.
2. **Respect the reviewer's minute.** The point of every page should land in the first screen.
3. **Honest framing.** Generalize confidential work instead of inflating it; state limitations of
   methods openly.
4. **Simplicity over spectacle.** Clarity and restraint carry the brand; nothing decorative competes
   with the content.

## Accessibility & Inclusion

Sufficient color contrast, alt text on images, full keyboard navigation, and respect for
`prefers-reduced-motion`.
