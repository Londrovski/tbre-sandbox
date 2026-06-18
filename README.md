# TBRe AI Team — role map

Interactive org chart for the TBRe AI team. **Live:** https://londrovski.github.io/tbre-sandbox/

The page is self-building: `index.html` reads every card under **`seats/`** (the whole tree, via the GitHub API)
and renders the org chart from the front-matter at the top of each file. There's no database —
**the markdown cards are the data**. Add or edit a card and it shows up automatically.

## Layout
Cards are grouped into one folder per sub-team. The folder is just for tidiness — the chart is
built from each card's `reports_to`, not its folder, so you can drop a card in any subfolder.

- **`seats/leadership/`** — Team Lead + the sub-team leads (Software, Elec, Mech, Operations).
- **`seats/software/`** — Simulation, SLAM, Control.
- **`seats/elec/`** — Perception, VCU, Loom, PCB.
- **`seats/mech/`** — Steering, EBS, Mounting.
- **`seats/ops/`** — Testing, Onboarding, Finance, Competition Docs (+ the Website spare).
- **`seats/archive/`** — parked roles, not shown on the site.
- **`seats/photos/`** — headshots (`<tag>.png`).
- **`index.html`** — the self-loading chart + detail panel.

## Add / edit a role
Create `seats/<subteam>/<id>.md`:

```markdown
---
id: my-seat
seat: My Seat
domain: Technology – Software   # or Leadership | Technology – Electrical | Technology – Mechanical | Operations | Outside AI (interface)
owner: TBD                      # name, or TBD = open seat (glows gold)
tag: ab1234                     # uni username (optional)
photo: seats/photos/ab1234.png  # optional (path is from repo root, any subfolder)
reports_to: ai-team-lead        # parent seat id; blank = top
hrs: 2-3
order: 1                         # optional; orders siblings under a lead
# group: spare                  # float outside the chart
---

# My Seat

Short purpose paragraph.

## Responsibilities
- **Title** — Description.
  - context: where to look / POC
  - owns: a repo / folder / process / outcome
  - delivers: an output

## Key interfaces
- Who this seat works with

## Requirements
- Good-fit / skills / commitment

## Notes
_Working notes — not shown on the site. Write whatever you like here._
```

Push to `main` → GitHub Pages redeploys. Each role is a *seat* (one owner, ~2-3 hrs/week);
one person can hold several. Responsibilities are portable between seats.

### What renders vs what's hidden
The site **only** renders four sections: the intro paragraph (purpose), `## Responsibilities`,
`## Key interfaces`, and `## Requirements`. **Any other heading is read but never displayed** — so
`## Notes` (and any `###` sub-headings inside it) is a safe place for working notes, brainstorming, and
context to formalise later. It lives in the markdown and in git history but never appears on the card.
Every card currently carries a `## Notes` stub for this purpose.

---

## Context for a new AI agent picking this up

If you're an AI assistant helping James (`Londrovski`, jrmat49@gmail.com) with this repo, read this first.

**What this is.** A recruitment-facing + internal "who owns what" org chart for the **TBRe AI sub-team**
(Team Bath Racing Electric — University of Bath Formula Student autonomous team). James is the incoming
AI team lead. The structure is **EOS-style** ("right people, right seats", people-first): each *seat* has
one accountable owner, a few responsibilities (~2–3 hrs/week each), and one person can hold multiple seats.
This repo is a sandbox/template intended to later be reused for the wider TBRe team.

**Three jobs the chart does:** (1) help James understand the team as he takes over; (2) advertise open
seats for recruitment (open seats = `owner: TBD`, they glow gold and show an "Apply" button); (3) act as a
map of who owns/controls what and who to contact.

**Architecture — this is the important bit.**
- The site is a **single static `index.html`** on GitHub Pages (classic deploy-from-branch, `main`, root).
- It is **self-loading**: on load it calls the GitHub git/trees API once
  (`/repos/Londrovski/tbre-sandbox/git/trees/main?recursive=1`), filters to `seats/**.md`
  (excluding `seats/archive/`), then fetches each card's raw markdown from `raw.githubusercontent.com`.
  Raw fetches do **not** count against the anonymous 60/hr API limit — only the single tree call does.
- Cards are parsed from front-matter + body in **vanilla JS**, then **deduped by `id`** (first wins).
- The chart is built from `reports_to` links, NOT folder location. `domain` sets the colour. `order`
  sorts siblings under a lead. `group: spare` floats a card unconnected at the bottom.
- The detail panel: split header (text left, photo right), purpose capped ~250 chars, responsibilities
  shown as Owns/Delivers groups, Requirements (collapsed if the seat is filled), Context + Key interfaces.
- **Only four card sections render** (purpose, Responsibilities, Key interfaces, Requirements). Any other
  heading — notably `## Notes` — is ignored by the renderer, so it's the place for hidden working notes.

**Branding.** Match teambathracingelectric.com — Poppins font, blue `#105BAB`, gold `#FFC423`, white cards,
near-black text, no green. The TBRe logo loads from the live site.

**Hard constraints when editing `index.html` (learned the hard way):**
- **Keep the JS/CSS backslash-free.** The editing pipeline mangles backslashes, so the code deliberately
  avoids them: event delegation instead of inline `onclick` where it matters, manual character parsing
  instead of `\s`-style regexes, and `String.fromCharCode(10)` instead of a `"\n"` literal. Don't introduce
  backslashes. Validate before pushing (`node --check` the extracted `<script>`).
- **The GitHub connector used in chat can create/update files but CANNOT delete or move them.** To move or
  remove files you must hand James a `git` command to run locally (he has push rights), or have him do it in
  the GitHub UI. Don't pretend a delete happened. (This is why old flat seat files were archived via local
  `git mv`, and old `roles/`/`seats.json` were moved to `seats/archive/`.)
- Photos can't be scraped from LinkedIn / the team site — James uploads headshots to `seats/photos/`
  himself (`<tag>.JPG`/`.png`). Photo paths in cards are absolute from repo root, so they resolve from any
  subfolder.

**Roster (June 2026, for reference — verify before relying on it):** Team Lead James Morris (jm3339, Mech Eng 4th,
also Operations Manager) → Software Lead Szymon Fladro (spf35), Elec Lead Panteha Asadi (pa838), Mech Lead
Sara Alkhalili (sa3257, also EBS Lead). Filled sub-seats: VCU Lead Shinn Gee Choo (csg45), Steering Lead
Brian Cheung (tyc91). Everything else is currently open (`TBD`). Website Management is the spare/outside-AI seat.

**Editable team overview.** `team.md` at the repo root is shown as the default panel (the people-first pitch +
"where we are / where we're going"). Edit it like any card.

**Possible future work (not built):** wire the "Apply" button to a real recruitment form; sync seats to
**success.co** (EOS platform; GraphQL API at https://www.success.co/graphql, Bearer key, James generates the
key); fill structure gaps (Logging/Infra owner, integration/systems sign-off, test-day safety owner).
