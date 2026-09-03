---
name: Shah Kar Portfolio
description: A warm, technical "engineer's notebook" portfolio for a full-stack developer job hunt
colors:
  signal: "#2F6F4E"
  signal-bright: "#3C8C63"
  wire: "#B8402E"
  wire-bright: "#D4573D"
  ochre: "#AD8323"
  neutral-bg: "#F7F5F0"
  neutral-bg-subtle: "#EDEAE2"
  neutral-surface: "#FFFDF9"
  neutral-text: "#26221D"
  neutral-heading: "#17140F"
  neutral-text-muted: "#726A5E"
  neutral-border: "rgba(23, 20, 15, 0.12)"
typography:
  display:
    fontFamily: "Fraunces, 'Iowan Old Style', Georgia, serif"
    fontSize: "clamp(2.75rem, 5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Fraunces, 'Iowan Old Style', Georgia, serif"
    fontSize: "clamp(2rem, 3.5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Fraunces, 'Iowan Old Style', Georgia, serif"
    fontSize: "clamp(1.375rem, 2.5vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(1rem, 1.5vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.12em"
rounded:
  sm: "0.25rem"
  md: "0.5rem"
  lg: "0.625rem"
  xl: "0.875rem"
  full: "9999px"
spacing:
  1: "0.25rem"
  2: "0.5rem"
  3: "0.75rem"
  4: "1rem"
  5: "1.25rem"
  6: "1.5rem"
  8: "2rem"
  10: "2.5rem"
  12: "3rem"
  16: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.neutral-surface}"
    rounded: "{rounded.full}"
    padding: "0.75rem 1.75rem"
  button-primary-hover:
    backgroundColor: "{colors.signal-bright}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.signal}"
    rounded: "{rounded.full}"
    padding: "0.75rem 1.75rem"
  card:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.lg}"
    padding: "1.25rem 1.5rem"
---

# Design System: Shah Kar Portfolio

## Overview

**Creative North Star: "The Engineer's Notebook"**

This is a technical spec written by hand on warm paper, not a rendered dashboard. The palette's own token names — `signal`, `wire`, `ochre` — read like circuit-diagram annotations, and the surface language follows through: corner-bracket frames around portraits like crop marks on a print, mono status dots that echo a build log, numbered eyebrow labels (`0N · SECTION`) like page headers in a lab notebook, and bordered "manifest" panels that present information the way a spec sheet lists fields. The feel is precise, warm, and quietly confident — technical credibility without coldness, expressed through a warm ink-on-paper neutral scale rather than clinical grays.

Content leads. The system stays out of the way of the actual evidence (real project screenshots, real stack, real contact details) and never performs enthusiasm it hasn't earned — no gradient hero sweeps, no stock-illustration flourishes, no motion for its own sake.

**Key Characteristics:**
- Warm ink/paper neutral scale (`#F7F5F0` → `#17140F`) instead of cool grays or pure black/white.
- A restrained three-accent palette — signal green, wire rust, ochre gold — used by role, not decoration.
- Fraunces serif for display type only; Inter for body; JetBrains Mono for every label, status, and data point.
- A recurring corner-bracket motif (signal top-left, wire bottom-right) tying photos and the active nav node together.
- Flat surfaces at rest; depth is something that happens in response to interaction, not a resting state.

## Colors

A warm neutral scale carries the page; three named accents are assigned strict roles rather than spread decoratively.

### Primary
- **Signal Green** (`#2F6F4E`, bright variant `#3C8C63`): the one interactive color. Primary buttons, links, active nav state, focus rings, the top-left half of every corner bracket, the dominant eyebrow/label accent. In dark mode it brightens to `#4FBE87` to keep the same visual weight against a darker ground.

### Secondary
- **Rust Wire** (`#B8402E`, bright variant `#D4573D`): the counterpart accent. Used for the bottom-right half of corner brackets and as the second stop in the signal→wire duotone gradient. It never carries a primary action alone.

### Tertiary
- **Muted Ochre** (`#AD8323`): the detail accent — warning/status states, occasional tertiary tags. Used the most sparingly of the three.

### Neutral
- **Paper** (`#F7F5F0`): default page background (light theme).
- **Paper Surface** (`#FFFDF9`): cards, panels, and raised surfaces (light theme) — a half-step warmer than the page background so surfaces read as "placed on" the page.
- **Ink** (`#17140F`): heading text (light theme) and the page background in dark theme.
- **Ink Text** (`#26221D`): body text (light theme).
- **Faded Ink** (`#726A5E`): muted/secondary text, timestamps, meta lines.
- Borders and dividers are never solid neutral — always `rgba(23, 20, 15, …)` in light / `rgba(247, 245, 240, …)` in dark, so they read as ink bleeding into paper rather than a hard rule.

### Named Rules
**The One Accent Rule.** Signal green is the only color that drives a primary action or an active state. Wire and ochre are always secondary — a paired bracket color, a gradient stop, a status detail — never the sole color of an interactive control.

## Typography

**Display Font:** Fraunces (with Iowan Old Style, Georgia fallback)
**Body Font:** Inter (with system sans fallback)
**Label/Mono Font:** JetBrains Mono (with Fira Code fallback)

**Character:** A serif with real editorial weight for headings against a plain, high-legibility sans for reading copy, with a monospace reserved entirely for anything that reads as data — labels, statuses, tags, timestamps. The pairing does the notebook's job: handwritten headline, typed body, stamped annotations.

### Hierarchy
- **Display** (800, `clamp(2.75rem, 5vw, 4.5rem)`, line-height 1.1): hero name/headline only.
- **Headline** (700, `clamp(2rem, 3.5vw, 3rem)`, line-height 1.3): section h1/h3-level headings.
- **Title** (600, `clamp(1.375rem, 2.5vw, 2rem)`, line-height 1.3): card and subsection headings.
- **Body** (400, `clamp(1rem, 1.5vw, 1.125rem)`, line-height 1.6): paragraph copy.
- **Label** (500, 0.75rem, letter-spacing 0.12em, uppercase): eyebrows, status pills, nav index, tags, meta lines.

### Named Rules
**The Three-Font Rule.** Fraunces never appears outside a heading; JetBrains Mono never appears in a full sentence of prose. If it's a label, status, or number, it's mono. If it's a heading, it's Fraunces. Everything else is Inter.

## Layout

A single centered container (`max-width: 1200px`, horizontal padding `clamp(1rem, 4vw, 2rem)`) holds every section; vertical rhythm between sections is `clamp(4rem, 8vw, 6rem)`. Content within a section is typically a two-column split (copy + panel, or copy + photo) that collapses to a single column under `768px`. Grid utilities exist for a 12-column layout where cards tile (Projects), gap `1.5–2rem`.

Breakpoints: `640px` (sm), `768px` (md — primary mobile boundary; nav switches from a vertical side rail to a horizontal bottom dock here), `1024px` (lg), `1280px` (xl).

## Elevation & Depth

Flat by default. Surfaces sit at rest with no shadow; depth is introduced only as a response to interaction — a card lifting on hover, a button pressing, a toggle raising off the page when focused. Two panel types are the exception: the mobile nav dock and modals use a warm-tinted glass treatment (`blur(16px)` backdrop, translucent paper background) because they float above content rather than sitting within the page flow.

### Shadow Vocabulary
- **sm** (`0 1px 3px rgba(23,20,15,0.08), 0 1px 2px rgba(23,20,15,0.08)`): barely-there separation, rarely used alone.
- **md** (`0 4px 12px rgba(23,20,15,0.08)`): default hover state for buttons, toggle, nav label.
- **lg** (`0 10px 30px rgba(23,20,15,0.08), 0 4px 10px rgba(23,20,15,0.08)`): card hover lift, glass-card hover.
- **xl** (`0 20px 60px rgba(23,20,15,0.16)`): reserved for modal-scale elevation.

Dark theme swaps the tint to true black (`rgba(0,0,0,…)`) at higher opacity so shadows still read against a dark ground.

### Named Rules
**The Flat-By-Default Rule.** Nothing carries a resting shadow except the floating glass panels (mobile nav, modals). Everything else earns its shadow through hover, focus, or active state — depth signals "you're touching this," not "this is important."

## Shapes

Corners are deliberately tight, not soft-rounded: the base scale runs `0.25rem → 0.875rem`, with a separate full-pill (`9999px`) reserved for buttons and the mobile nav dock. Photos are explicitly square-cornered — rounding them was tried and rejected — and instead framed by the signature corner-bracket motif: two small L-shaped corner marks, signal green top-left and rust wire bottom-right, sitting just outside the image edge like crop marks. The same two-color bracket, scaled down, frames the active navigation node.

Manifest-style panels (About/Skills/Contact info blocks, project cards) use a single hairline border (`1px`, `rgba(23,20,15,0.09–0.12)`) rather than a heavy stroke, keeping them feeling like a bordered spec sheet rather than a boxed widget.

### Named Rules
**The Two-Wire Bracket Rule.** A corner bracket is never a single color. The top-left corner is always signal green, the bottom-right is always rust wire — the pairing is the signature, not either color alone.

## Components

Buttons, cards, and inputs are precise and understated: confidence expressed through restraint (flat at rest, tight radii, mono data points) rather than visual flourish.

### Buttons
- **Shape:** full pill (`border-radius: 9999px`) for primary/ghost actions; a tighter `0.5rem` (8px) for compact in-card CTAs and admin controls.
- **Primary:** solid signal-green fill (`#2F6F4E`), `#FFFDF9` text, resting shadow `0 4px 14–18px rgba(47,111,78,0.30)`, padding `0.75rem 1.75rem`.
- **Hover / Focus:** lifts `translateY(-3px)` with a brightened shadow (`rgba(47,111,78,0.42)`) and a subtle white sheen overlay fading in; focus-visible gets a 3px signal-tinted ring.
- **Ghost:** transparent background, signal-green border and text; hover fills with the palest signal tint (`rgba(47,111,78,0.10)`).

### Chips / Tags
- **Style:** mono font, `0.72rem`, background `neutral-bg-subtle`, `1px` border, radius `0.3rem` (project tech tags); an overflow "+N more" chip uses a dashed border and faint text instead of a solid style.
- **State:** on card hover, tags recolor to signal green with a signal-tinted background and border — a single hover state does the work instead of separate selected/unselected variants.

### Cards / Containers
- **Corner Style:** `0.625rem` (project cards) to `1.25rem` (manifest info panels) depending on density; never the full 9999px pill.
- **Background:** `neutral-surface`, near-opaque (`~92%`) so background texture reads faintly through.
- **Shadow Strategy:** flat at rest; hover lifts `translateY(-6px)` with a layered shadow plus a colored ring glow (`0 0 0 1px accent-medium, 0 12px 40px accent-light`) — the ring is what makes the accent color legible at a glance.
- **Border:** hairline `1px`, `rgba(23,20,15,0.09)`, brightening to signal-tinted on hover.
- **Internal Padding:** `1.25rem 1.5rem` body, `0.85rem 1.5rem` footer.

### Inputs / Fields
- **Style:** glass treatment — translucent paper background, `16px` backdrop blur, `1px` border, radius `0.75rem`.
- **Focus:** border shifts to signal green with a `3px` signal-tinted glow ring; outline suppressed in favor of the ring.

### Navigation
- **Desktop:** a vertical "signal trace" rail fixed to the right edge — a hairline track that fills with signal green as real scroll progress (not decorative), dots for each section, the active dot enlarged and framed with the two-wire corner bracket. A mono index + label flyout (`00 · Home`, `01 · About`, …) appears on hover.
- **Mobile (`<768px`):** the rail rotates into a horizontal glass-pill dock anchored to the bottom safe area; the same fill/dot/bracket logic runs left-to-right instead of top-to-bottom.
- **Theme Toggle:** not an icon swap — a mono status pill (`● LIGHT` / `● DARK`) styled identically to the hero's "available for opportunities" status line and the project cards' status stamps, reinforcing the notebook's "everything is a status readout" language.

### Corner-Bracket Photo Frame (signature)
The portrait treatment used on the hero and About photos: a two-wire bracket (see Shapes) framing an intentionally square-cornered image, with `10px` of padding between the bracket and the photo edge. This is the system's most repeated signature element and the one from which the nav's active-node bracket is derived.

## Do's and Don'ts

### Do:
- **Do** reserve Fraunces for headings only; keep body copy in Inter and every label, status, or data point in JetBrains Mono (The Three-Font Rule).
- **Do** pair corner brackets in two colors — signal green top-left, rust wire bottom-right — never a single uniform color (The Two-Wire Bracket Rule).
- **Do** keep surfaces flat at rest and introduce shadow only as a response to hover, focus, or active state (The Flat-By-Default Rule).
- **Do** lead every major section with a numbered mono eyebrow label (`0N · SECTION`) matching the nav's index numbering.
- **Do** keep signal green as the only color driving a primary action or active state; wire and ochre stay secondary (The One Accent Rule).

### Don't:
- **Don't** round the corners of profile/portrait photos — this was tried and explicitly rejected; photos stay square-cornered with bracket framing instead.
- **Don't** use gradient-heavy hero backgrounds or a generic SaaS purple/blue gradient sweep — the only gradient in the system is the restrained signal→wire duotone, applied sparingly (gradient text, a CTA glow), never as a full-bleed background.
- **Don't** give a flat element a resting shadow; shadow is earned by interaction, not applied by default.
- **Don't** introduce a fourth accent color — the palette is deliberately limited to signal, wire, and ochre plus the warm neutral scale.
