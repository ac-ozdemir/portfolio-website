---
name: Ahmet Can Özdemir — Portfolio
description: Warm, precise, evidence-first portfolio of a data analyst moving into tech.
colors:
  petrol-blue: "#2c6e8e"
  warm-paper: "#faf9f6"
  warm-charcoal: "#2d2a26"
  muted-stone: "#69655f"
  linen-rule: "#e5e1d8"
  deep-petrol: "#0e3441"
  deep-mist: "#a9cbd9"
  light-petrol: "#8fc9de"
  deep-rule: "rgba(255, 255, 255, 0.15)"
typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.5
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  lead:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.56
  label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.025em"
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
rounded:
  sm: "0.25rem"
  md: "0.375rem"
  lg: "0.5rem"
  full: "9999px"
spacing:
  gutter: "1.5rem"
  card: "1.5rem"
  section: "6rem"
  hero: "8rem"
  container: "64rem"
components:
  button-outline:
    textColor: "{colors.warm-charcoal}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1rem"
  button-outline-hover:
    textColor: "{colors.petrol-blue}"
  card:
    backgroundColor: "{colors.warm-paper}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card}"
  chip:
    backgroundColor: "rgba(44, 110, 142, 0.1)"
    textColor: "{colors.petrol-blue}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.75rem"
  icon-tile:
    backgroundColor: "rgba(44, 110, 142, 0.1)"
    textColor: "{colors.petrol-blue}"
    rounded: "{rounded.md}"
    size: "2.5rem"
  nav-link:
    textColor: "{colors.warm-charcoal}"
  nav-link-hover:
    textColor: "{colors.petrol-blue}"
  stat-value:
    textColor: "{colors.petrol-blue}"
    typography: "{typography.headline}"
---

# Design System: Ahmet Can Özdemir — Portfolio

## Overview

**Creative North Star: "Warm Precision"**

A warm paper ground carries exact, measured details. The system is professional without being
corporate and personal without being casual: generous whitespace, a single petrol-blue accent used
sparingly, hairline rules instead of shadows, and type that does the hierarchy work on its own. Nothing
decorates for its own sake; every accent marks something a reviewer can act on or should notice.

Density is calm. Content sits in a single centered column (64rem) with wide vertical breathing room
between sections, so a recruiter can scan the page in under a minute. Precision shows up in the small
things — consistent radii, an exact two-pixel hover lift, focus rings on every interactive element —
rather than in effects.

**Key Characteristics:**
- Warm off-white paper background with warm charcoal text, one cool accent.
- Flat surfaces; separation by hairline borders and whitespace.
- Small uppercase petrol section labels; large semibold tight-tracked display type.
- Interaction is quiet: border and text shift to petrol, cards lift two pixels.
- One light theme only.

## Colors

A warm neutral paper palette with a single cool petrol-blue accent; an inverted deep-petrol variant
exists for one contrasting band.

### Primary
- **Petrol Blue** (#2c6e8e): The only accent. Links, hover and focus states, section labels, stat
  values, icon tiles and tags (at 10% opacity as a tint behind petrol text).

### Neutral
- **Warm Paper** (#faf9f6): Page and card background.
- **Warm Charcoal** (#2d2a26): Primary text; at 80–90% opacity for nav links and secondary paragraphs.
- **Muted Stone** (#69655f): Secondary text — descriptions, metadata, captions.
- **Linen Rule** (#e5e1d8): Hairline borders on cards, nav, timeline and stat band.

### Deep variant (inverted band)
- **Deep Petrol** (#0e3441): Background of the inverted section.
- **Deep Mist** (#a9cbd9): Secondary text on Deep Petrol.
- **Light Petrol** (#8fc9de): Accent on Deep Petrol.
- **Deep Rule** (rgba(255, 255, 255, 0.15)): Borders on Deep Petrol.

### Named Rules
**The One Accent Rule.** Petrol Blue is the only accent color. It marks interaction and emphasis, never
fills large areas; tints are 10% opacity at most.

## Typography

**Body Font:** Geist (with system-ui, sans-serif)
**Mono Font:** Geist Mono (with ui-monospace) — loaded, used only for code-like detail.

**Character:** A single modern grotesque carries everything; hierarchy comes from size, weight and the
small uppercase label, not from font pairing.

### Hierarchy
- **Display** (600, 2.25rem → 3.75rem from 768px, tight tracking −0.025em): The hero name/headline only.
- **Headline** (600, 1.5rem → 1.875rem): Banner titles and large stat values (stats at 1.875rem in
  Petrol Blue).
- **Title** (600, 1rem): Card and timeline item titles.
- **Lead** (400, 1.125rem, Muted Stone or charcoal at 90%): Intro paragraphs; max ~36rem wide.
- **Body** (400, 0.875rem, Muted Stone): Card descriptions and timeline text; max ~42rem wide.
- **Label** (500, 0.875rem, +0.025em tracking, uppercase, Petrol Blue): Section labels such as
  "PROJECTS". Tags use the same weight at 0.75rem.

### Named Rules
**The Quiet Label Rule.** Sections are introduced by a small uppercase petrol label, not by a large
heading. The content below is the headline.

## Layout

A single centered container (max 64rem) with 1.5rem side gutters. Sections are separated by 6rem of
vertical space (the hero uses 8rem on desktop). Grids are simple: project cards in two columns from
640px with 1.5rem gaps; the hero splits into text and a 260px side column from 768px; stats sit in a
two-column band framed by top and bottom hairlines. The experience timeline is a left hairline with
2rem indentation and 2.5rem between entries. The navigation is a sticky top bar with a bottom hairline;
on mobile it collapses into a stacked menu.

## Elevation & Depth

Flat by default. Depth is conveyed with hairline Linen Rule borders, whitespace and the inverted
Deep Petrol band — not with shadows. The only motion-as-depth is a two-pixel lift on hoverable cards.
Photo banners use a dark gradient overlay (black, 15% → 90%) with a soft text shadow for legibility;
that treatment is reserved for photography.

### Named Rules
**The Hairline Rule.** Separation is a 1px Linen Rule border. No drop shadows on cards or panels.
**The Two-Pixel Lift Rule.** A hoverable card lifts 2px and its border turns Petrol Blue; nothing else
moves.

## Shapes

Gently rounded, never pill-heavy: small controls and icon tiles at 0.375rem, cards at 0.5rem, focus and
nav targets at 0.25rem. Fully rounded shapes are reserved for tags/chips and the timeline dots.

## Components

### Buttons (outline links)
- **Shape:** gently rounded (0.375rem).
- **Default:** 1px Linen Rule border, charcoal text, 0.875rem medium, 0.625rem × 1rem padding, optional
  16px icon.
- **Hover / Focus:** border and text turn Petrol Blue; focus shows a 2px Petrol Blue outline with 2px
  offset.

### Chips (tags)
- **Style:** Petrol Blue at 10% behind Petrol Blue text, fully rounded, 0.75rem medium, 0.25rem ×
  0.75rem padding. On photo banners: black at 30% with a white 25% border and white text.

### Cards / Containers
- **Corner Style:** 0.5rem.
- **Background:** Warm Paper (same as page).
- **Shadow Strategy:** none — see The Hairline Rule.
- **Border:** 1px Linen Rule; Petrol Blue on hover.
- **Internal Padding:** 1.5rem (0.75rem for compact link cards).

### Navigation
- Sticky top bar on Warm Paper with a bottom hairline. Name in semibold tight tracking; links 0.875rem
  in charcoal at 80%, Petrol Blue on hover, focus outline on every link. Mobile: hamburger toggles a
  stacked list under a top hairline.

### Icon Tile
- 2.5rem square (2.25rem in compact cards), 0.375rem radius, Petrol Blue at 10% behind a 20px
  Petrol Blue stroke icon (1.75 stroke, round caps).

### Stat Band
- Full-width band with top and bottom hairlines; values in 1.875rem semibold Petrol Blue, labels in
  0.875rem Muted Stone.

### Timeline
- Left 1px Linen Rule line; each entry marked by a 10px Petrol Blue dot on the line; date as a medium
  Muted Stone label above a semibold title.

## Do's and Don'ts

### Do:
- **Do** use Petrol Blue (#2c6e8e) only for interaction, labels, key numbers and tags.
- **Do** separate content with 1px Linen Rule (#e5e1d8) borders and whitespace.
- **Do** keep content inside the 64rem container with 1.5rem gutters and 6rem between sections.
- **Do** give every interactive element a visible 2px Petrol Blue focus outline.
- **Do** introduce sections with the small uppercase petrol label.

### Don't:
- **Don't** add drop shadows to cards or panels, or nest cards inside cards.
- **Don't** introduce a second accent color; the alternative teal (#0f766e) is only tried if Ahmet asks.
- **Don't** add a dark theme; the Deep Petrol band is the only inverted surface.
- **Don't** use gradients outside photo overlays.
- **Don't** animate beyond the two-pixel hover lift and color transitions.
