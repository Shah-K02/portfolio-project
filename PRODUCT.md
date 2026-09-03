# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and hiring managers screening candidates for full-stack developer roles (React/TypeScript on the frontend; Node.js/Express, Spring Boot, and SQL/NoSQL databases on the backend). They arrive to quickly evaluate whether Shah Kar is worth a follow-up conversation — expect a short attention span typical of portfolio screening, on both desktop and mobile.

## Product Purpose

A personal portfolio for Shah Kar, a Computer Science graduate (Aston University, Birmingham UK), built to support full-time job hunting. Success is a recruiter/hiring manager quickly understanding his skill set, reviewing real project work as evidence, and reaching out (contact form, email, LinkedIn, or CV download).

## Positioning

Full-stack breadth, not a single narrow specialty: comfortable end-to-end across a React/TypeScript frontend, a Node/Express or Spring Boot backend, and relational/NoSQL databases. The project set is the proof — a trading/fintech analytics dashboard (TradeLens), e-commerce platforms, a REST API, a fitness platform — deliberately spans domains and layers of the stack rather than repeating one kind of app.

## Operating Context

- Recruiters/hiring managers browsing quickly; each section needs to land its point without requiring a deep read.
- Hero establishes identity + core stack fast; About adds credentials; Projects is the primary evidence; Skills is a scannable reference; Contact is the conversion point.
- Shah maintains the site himself through a Firebase-backed admin panel (project CRUD, CV upload) gated behind real Firebase Auth (opened via a keyboard shortcut + login modal) — content and CV updates go live without a redeploy.

## Capabilities and Constraints

- React 19 + TypeScript, Create React App, deployed on Netlify (shah-kar.netlify.app).
- Firebase (Firestore + Auth) is the live source of truth for project data and CV storage. `src/constants/projectsData.ts` is a stale/fallback seed file, not the real content — do not treat it as current.
- Contact form submits through Formspree.
- Dark/light theme toggle (`ThemeContext`); no confirmed default tied to system preference — treat as undecided rather than asserting one.
- Real project data currently includes: TradeLens (2026, MetaTrader 5 trading analytics), Portfolio Project (this site itself), Task Manager API, Personal Fitness Platform, Sports4Us, AutoMods.
- CV is a downloadable PDF (`/ShahKar-CV.pdf`), replaceable by Shah via the admin panel.

## Brand Commitments

- Name: Shah Kar. Location: Birmingham, UK.
- Contact: shahkar0215@gmail.com · github.com/Shah-K02 · linkedin.com/in/shah-kar.
- Visual identity (palette, type system, layout language) is recorded separately as design authority, not product truth — see DESIGN.md once written.

## Evidence on Hand

- Real project screenshots, descriptions, and links live in Firestore, managed through the admin panel — not in source control.
- CV PDF at `/ShahKar-CV.pdf`; profile and about photos in `/public`.
- Known gap: the "Portfolio Project" entry's long description (in Firestore) currently claims features that don't exist in the shipped site (Three.js particle backgrounds, an AI chat assistant) — flagged for correction, not yet fixed since it lives in the database rather than code. Don't treat it as evidence of real functionality.

## Product Principles

1. Real project evidence over generic claims — every section should point to something concrete (an actual project, repo, or line of code), not an assertion of general competence.
2. Full-stack breadth is the core claim — content and structure should keep demonstrating range across frontend, backend, and database work rather than narrowing to one specialty.
3. Fast to scan, easy to act on — a recruiter gets the picture quickly and has an obvious, low-friction way to reach out.
4. Self-serve maintenance — Shah updates projects and CV himself through the admin panel, without needing a redeploy or developer help.
5. Never assert what isn't true — descriptions of the site or its projects must reflect actually-implemented functionality, not aspirational or stale claims (see the known gap above).

## Accessibility & Inclusion

No specific standard (e.g. a WCAG level) has been mandated. General accessibility hygiene has been applied during development (visible focus states, alt text on images, semantic heading structure, `prefers-reduced-motion` support) but this has not been confirmed as a formal product requirement.
