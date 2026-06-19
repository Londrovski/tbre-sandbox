# TBRe AI Team — role map

Interactive org chart for the TBRe AI team. **Live:** https://londrovski.github.io/tbre-sandbox/

The page is self-building: a shared engine (`assets/app.js`) reads every `seat.md` card under **`AI/`** (via the
GitHub API) and renders the org chart from the front-matter at the top of each file. There's no
database — **the markdown cards are the data**. Add or edit a card and it shows up automatically.

## Two views (one engine)
The build is **not** duplicated. One engine file does everything; two thin pages call it in different modes,
so edits happen in one place:

- **`assets/app.js`** — the whole engine. Exposes `TBRE.init(mode)` where `mode` is `'recruitment'` or `'team'`.
- **`assets/app.css`** — all styles (shared + mode-specific).
- **`index.html`** — Recruitment view. Thin: links the assets and calls `TBRE.init('recruitment')`.
- **`team.html`** — Team view. Thin: same, calls `TBRE.init('team')`.
- A tab nav in each page header switches between the two.

**What differs between modes (all in `app.js`):**

| | Recruitment (`index.html`) | Team view (`team.html`) |
|---|---|---|
| Unfilled seats | glow **gold** ("Open · recruiting") | glow **red** ("Open · unfilled") |
| Purpose / intro | shown | shown |
| Requirements | shown (open seats only) | **hidden** |
| Commitment (hrs/week) | shown | **hidden** |
| Responsibilities | shown (Owns/Delivers) | shown (Owns/Delivers) |
| Per-responsibility context | not shown | **"Context" dropdown** under each responsibility (loads its `doc:` file) |
| Seat context | short pointers shown as one "Context" box | **"Seat context" dropdown** above responsibilities (loads the seat's `context.md`) |
| Key interfaces | shown | shown |
| Apply button | shown (open seats) | not shown |

Things excluded from a mode are **hidden, not collapsed**. Context docs are **lazy-loaded** on first open
(raw fetches, which don't count against the API rate limit) and cached.

## Layout
Everything for the AI team lives under **`AI/`**. Sub-teams are **numbered folders** (ordering/tidiness only), and
**each seat is its own folder named after its `id`**, holding a `seat.md` card plus any context files for that seat
— one self-contained package per seat. The chart is still built from each card's `reports_to`, not its folder, so
the folders are organisational only.

- **`AI/1-leadership/<id>/`** — Team Lead + the sub-team leads (Software, Elec, Mech, Operations).
- **`AI/2-software/<id>/`** — Simulation, Pathfinding, Perception Integration.
- **`AI/3-elec/<id>/`** — VCU, Loom.
- **`AI/4-mech/<id>/`** — Steering, EBS, Sensor Plate.
- **`AI/5-ops/<id>/`** — Testing & Safety, Onboarding, Finance, Submissions, Recruitment (+ the Website spare).
- **`AI/6-projects/<id>/`** — final-year-project (FYP) opportunities, e.g. the AI integration PCB.
- **`AI/7-project-groups/<id>/`** — the GDBP group. (6 & 7 float below the chart via `group:`; see **Outside-the-team blocks**.)
- **`AI/photos/`** — headshots (`<tag>.JPG`/`.png`).
- **`AI/archive/`** — parked roles, not shown on the site.
- **`assets/app.js`, `assets/app.css`** — the shared engine + styles.
- **`index.html`, `team.html`** — the two thin entry pages; **`team.md`** (repo root) is the overview panel.

Inside a seat folder: **`seat.md`** is the card; **`context.md`** (optional) is the seat-level context shown in
Team view; each responsibility's deep-context doc is a plain `.md` file in the same folder, linked by a bare
`doc:` filename (see **Context model**).

## Add / edit a role
Create `AI/<n-subteam>/<id>/seat.md` (the folder name is the seat's `id`):

```markdown
---
id: my-seat
seat: My Seat
domain: Technology – Software   # or Leadership | Technology – Electrical | Technology – Mechanical | Operations | Outside AI (interface)
owner: TBD                      # name, or TBD = open seat (glows gold in recruitment, red in team view)
tag: ab1234                     # uni username (optional)
photo: AI/photos/ab1234.png     # optional (path is from repo root)
reports_to: ai-team-lead        # parent seat id; blank = top
hrs: 2-3
order: 1                         # optional; orders siblings (or members of an outside block)
# group: spare                  # float below the chart in a named block — spare | gdbp (see Outside-the-team blocks)
---

# My Seat

Short purpose paragraph.

## Responsibilities
- **Title** — Description.
  - doc: my-resp.md   # optional; deep context (Team view) — a .md file in THIS seat's folder. See Context model
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
The engine **only** reads four card sections: the intro paragraph (purpose), `## Responsibilities`,
`## Key interfaces`, and `## Requirements`. **Any other heading is read but never displayed** — so
`## Notes` (and any `###` sub-headings inside it) is a safe place for working notes. It lives in the markdown
and in git history but never appears on a card.

Within a responsibility, the parser only captures the sub-bullet keys `context:`, `owns:`, `delivers:` and
`doc:`. **Any other key is silently ignored.** `doc:` is captured but only *used* by the Team view.

### Outside-the-team blocks
A card with no `reports_to` and no `group:` is a chart **root**. A card with a `group:` instead floats below the
tree. The outside blocks are defined by the `OUTSIDE` list in `app.js` and render **side by side** (one
horizontal row, divider between them), so they don't add vertical length:

- **`group: spare`** → *"Outside the AI team"* — roles adjacent to the AI team (e.g. Website Management).
- **`group: gdbp`** → *"Project groups"* — the second-semester GDBP group and final-year-project opportunities
  (e.g. the AI integration PCB). Extend it by adding more cards with `group: gdbp`; `order:` sets left-to-right
  position within the block.

To add another outside block, add `{key, label}` to `OUTSIDE` in `app.js` and tag cards with that `group:`.

---

## Context model (per-seat context + responsibility docs)

Deep context lives **inside each seat's own folder**, next to its `seat.md`, so a seat is one self-contained
package. Two kinds:

- **`<seat-folder>/context.md`** — seat-level context (the "Seat context" dropdown). Found by convention; no field
  needed.
- **`<seat-folder>/<name>.md`** — one file per responsibility's deep context, linked from the card by a bare `doc:`
  filename.

**Linking.** A responsibility points at its context doc with a `doc:` sub-bullet — a **bare filename** resolved
inside the seat's folder:
```markdown
- **Own & maintain the simulator**
  - doc: own-sim.md
  - context: gitlab tbre-ai/tbresim
  - owns: The simulator (tbresim)
```
If a `doc:` value contains a `/` it is instead treated as a repo-root path (e.g. for a doc shared across seats).

**Where it shows.** Only in **Team view** (`team.html`): each responsibility's doc as a "Context" dropdown under it,
and `context.md` as a "Seat context" dropdown above the responsibilities. Docs are fetched lazily on first open and
cached. If a doc doesn't exist yet, the dropdown shows a "No context doc yet" note.

**Each context doc** carries light front-matter (`context_for`, `id`, `seat`, `status`, `updated`) so it's
self-describing. The engine strips the front-matter and renders the markdown body. `status: draft` + `_TO FILL_`
markers flag where real knowledge still needs adding by the seat holder / James.

**Worked example (done):** `simulation-lead` — `AI/2-software/simulation-lead/` holds `seat.md`, `context.md`, and
the responsibility docs `own-sim.md`, `model-tbre27.md`, `hil.md`, linked by bare `doc:` filenames on the card.
The remaining seats follow the same pattern (still to be filled in).

---

## Context for a new AI agent picking this up

If you're an AI assistant helping James (`Londrovski`, jrmat49@gmail.com) with this repo, read this first.

**What this is.** A recruitment-facing + internal "who owns what" org chart for the **TBRe AI sub-team**
(Team Bath Racing Electric — University of Bath Formula Student autonomous team). James is the incoming
AI team lead. The structure is **EOS-style** ("right people, right seats", people-first): each *seat* has
one accountable owner, a few responsibilities (~2–3 hrs/week each), and one person can hold multiple seats.
This repo is a sandbox/template intended to later be reused for the wider TBRe team.

**Jobs the chart does:** (1) help James understand the team as he takes over; (2) advertise open seats for
recruitment (Recruitment view); (3) act as an internal map of who owns/controls what, with the deep context
attached (Team view).

**Architecture — this is the important bit.**
- A **shared engine** (`assets/app.js`) + **two thin entry pages** (`index.html` recruitment, `team.html` team),
  on GitHub Pages (classic deploy-from-branch, `main`, root). Each page just calls `TBRE.init(mode)`. Edit the
  engine once; both views update. See **Two views (one engine)** above for the per-mode differences.
- It is **self-loading**: on load it calls the GitHub git/trees API once
  (`/repos/Londrovski/tbre-sandbox/git/trees/main?recursive=1`), filters to `AI/**/seat.md`
  (excluding `AI/archive/`), then fetches each card's raw markdown from `raw.githubusercontent.com`.
  Each seat's folder is derived by stripping `/seat.md` from its path. Raw fetches do **not** count against the
  anonymous 60/hr API limit — only the single tree call does. Context files (the seat's `context.md` and its
  responsibility docs) are fetched the same way, lazily, only in Team view.
- Cards are parsed from front-matter + body in **vanilla JS**, then **deduped by `id`** (first wins).
- The chart is built from `reports_to` links, NOT folder location. `domain` sets the colour. `order`
  sorts siblings under a lead. A `group:` floats a card into a named block below the chart (`spare`, `gdbp`;
  see **Outside-the-team blocks**) instead of the tree.
- **Only four card sections are read** (purpose, Responsibilities, Key interfaces, Requirements). Any other
  heading — notably `## Notes` — is ignored, so it's the place for hidden working notes.
- **Deep context** lives inside each seat's folder (`context.md` + per-responsibility docs; see **Context model**),
  linked from cards via a bare `doc:` filename, surfaced only in Team view.

**Branding.** Match teambathracingelectric.com — Poppins font, blue `#105BAB`, gold `#FFC423`, white cards,
near-black text. Team view uses red `#e23b3b` for unfilled seats. No green.

**Hard constraints when editing the engine (`assets/app.js`) — learned the hard way:**
- **Keep the JS/CSS backslash-free.** The chat editing pipeline mangles backslashes, so the code deliberately
  avoids them: event delegation instead of inline `onclick`, manual character parsing instead of `\s`-style
  regexes, and `String.fromCharCode(10)` instead of a newline literal. Don't introduce backslashes anywhere in
  `assets/app.js` (or inline script). Validate before pushing: `node --check assets/app.js`.
- **The GitHub connector used in chat can create/update files but CANNOT delete or move them.** To move or
  remove files (e.g. reorganising seat folders, or moving a responsibility's doc when it moves between seats),
  hand James a `git` command to run locally (he has push rights), or have him do it in the GitHub UI. Don't
  pretend a delete happened.
- Photos can't be scraped from LinkedIn / the team site — James uploads headshots to `AI/photos/` himself
  (`<tag>.JPG`/`.png`). Photo paths in cards are absolute from repo root, so they resolve from any subfolder.

**Roster (June 2026, for reference — verify before relying on it):** Team Lead James Morris (jm3339, Mech Eng 4th,
also Operations Manager) → Software Lead Szymon Fladro (spf35), Elec Lead Panteha Asadi (pa838), Mech Lead
Sara Alkhalili (sa3257, also EBS Lead). Filled sub-seats: VCU Lead Shinn Gee Choo (csg45), Steering Lead
Brian Cheung (tyc91). Everything else is currently open (`TBD`). Website Management is the spare/outside-AI seat.

**Editable team overview.** `team.md` at the repo root is shown as the default panel in both views (the
people-first pitch + "where we are / where we're going"). Edit it like any card.

**Possible future work (not built):** fill in the remaining context docs; wire the "Apply" button to a real
recruitment form; work key interfaces into the context more richly; sync seats to **success.co** (EOS platform;
GraphQL API at https://www.success.co/graphql, Bearer key, James generates the key); fill structure gaps
(Logging/Infra owner, integration/systems sign-off, test-day safety owner).
