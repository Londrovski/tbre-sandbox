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
| Unfilled seats | soft **yellow** glow ("Open · recruiting") | soft **red** glow ("Open · unfilled") |
| Purpose / intro | shown | shown |
| Requirements | shown (open seats only) | **hidden** |
| Commitment (hrs/week) | shown | **hidden** |
| Responsibilities (title + summary + Owns/Delivers) | shown | shown |
| Per-responsibility **More info** box (Background/Scope/Interfaces/…) | **not shown** | shown (collapsible under each responsibility) |
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
- **`AI/5-ops/<id>/`** — Testing & Safety, Onboarding, Finance, Submissions, Recruitment.
- **`AI/6-projects/<id>/`** — the outside-the-team cards, one subfolder each: the GDBP group and the AI integration PCB FYP (the "Project groups" block), plus Website Management (the "Outside the AI team" block). All float below the chart via `group:` (see **Outside-the-team blocks**).
- **`AI/photos/`** — headshots (`<tag>.JPG`/`.png`).
- **`AI/archive/`** — parked roles, not shown on the site.
- **`assets/app.js`, `assets/app.css`** — the shared engine + styles.
- **`index.html`, `team.html`** — the two thin entry pages (repo root); **`AI/team.md`** is the overview panel.

Inside a seat folder: **`seat.md`** is the card (front-matter + purpose + Key interfaces + Requirements);
**`context.md`** (optional) is the seat-level context shown in Team view; and **each responsibility is its own
`.md` file** in the folder, discovered automatically and ordered by its own front-matter `order` (see
**Context model**).

## Add / edit a role
Create `AI/<n-subteam>/<id>/seat.md` (the folder name is the seat's `id`):

```markdown
---
id: my-seat
seat: My Seat
domain: Technology – Software   # or Leadership | Technology – Electrical | Technology – Mechanical | Operations | Outside AI (interface)
owner: TBD                      # name, or TBD = open seat (soft yellow glow in recruitment, red in team view)
tag: ab1234                     # uni username (optional)
photo: AI/photos/ab1234.png     # optional (path is from repo root)
reports_to: ai-team-lead        # parent seat id; blank = top
hrs: 2-3
order: 1                         # optional; orders siblings (or members of an outside block)
# group: spare                  # float below the chart in a named block — spare | gdbp (see Outside-the-team blocks)
---

# My Seat

Short purpose paragraph.

## Key interfaces
- Who this seat works with

## Requirements
- Good-fit / skills / commitment

## Notes
_Working notes — not shown on the site. Write whatever you like here._
```

There is **no `## Responsibilities` section** — each responsibility is its own file in the same folder, e.g.
`AI/<n-subteam>/<id>/my-resp.md`:

```markdown
---
context_for: responsibility
id: my-resp
title: My Responsibility        # the block title (edit it here)
seat: my-seat                   # parent seat id
order: 1                        # orders the responsibilities within the seat
status: draft
updated: 2026-06-20
---

One-line summary of what's going on.

## Owns
- a repo / process / outcome
## Delivers
- an output

## Background / ## Scope & aim / ## Interfaces / ## Open questions ...
```

Push to `main` → GitHub Pages redeploys. Each role is a *seat* (one owner, ~2-3 hrs/week);
one person can hold several. Responsibilities are portable between seats (move the file).

### What renders vs what's hidden
From `seat.md` the engine reads the front-matter plus three sections: the intro paragraph (purpose),
`## Key interfaces`, and `## Requirements`. **Any other heading is read but never displayed** — so `## Notes`
(and any `###` sub-headings inside it) is a safe place for working notes.

Responsibilities are **not** in `seat.md` — they're separate files in the seat folder (see **Context model**).
**Legacy seats** that still have a `## Responsibilities` section on the card (with `owns:`/`delivers:`/`context:`/
`doc:` sub-bullets) are read the old way **only when the seat has no responsibility files**.

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

## Context model (per-responsibility docs + seat context)

Everything for a seat lives **inside its own folder**, next to `seat.md`, so a seat is one self-contained package.
The key idea: **each responsibility is its own file** — the single unit you edit — holding that responsibility's
**Owns**, **Delivers**, and all of its context as plain markdown. `seat.md` is just a thin index.

- **`<seat-folder>/<name>.md`** — one **self-contained responsibility file** (the single unit you edit). Discovered
  automatically; its front-matter sets the **title** and **order**.
- **`<seat-folder>/context.md`** — seat-level context (the "Seat context" dropdown in Team view). Found by
  convention; no field needed.

**The split.** `seat.md` carries **no responsibilities at all**. Each responsibility is its own file in the seat's
folder — **any `.md` except `seat.md` and `context.md`** is treated as one. The engine discovers them, reads their
front-matter for **title** and **order**, and renders them in `order`. So to add, retitle, reorder, or rewrite a
responsibility you only ever touch its own file (exactly like a seat card owns its `seat:` / `order:`):

```markdown
---
context_for: responsibility
id: own-sim
title: Own & maintain the simulator   # the block title — edit it here
seat: simulation-lead                 # parent seat id
order: 1                              # position within the seat
status: draft
updated: 2026-06-20
---

Keep the sim everyone runs healthy — get people onto it and fix what breaks.   <- summary, under the title

## Owns                                      <- left chip (blue)
- The simulator (tbresim)
## Delivers                                  <- right chip (gold)
- A reliable sim the whole team can run

## Background        <- what you inherit + where it lives today (heading is hidden — leads the More info box)
## Scope & aim       <- what to do; forward "where things live"; **what good looks like**
## Interfaces        <- the people + physical/system dependencies
## Open questions
```

**How it renders.** The engine pulls the intro line (summary, under the title), `## Owns` / `## Delivers` (the same
two coloured chips as everywhere else), and folds **every other section** into a collapsible **More info** box. So a
responsibility reads as: *title → summary → Owns | Delivers → More info +*. Section names under Owns/Delivers are a
convention (Background / Scope & aim / Interfaces / Open questions) — any headings work; they all land in Context.
The **`## Background` heading itself is hidden** so the More info box flows straight from its header into that content;
keep it in the file as the section marker (it's what separates the context from Delivers).
`context.md` shows as a "Seat context" dropdown. Files are fetched and cached when a seat is opened; the per-
responsibility More info box appears in **Team view** only.

**Markdown support.** Responsibility bodies, `context.md` and `team.md` are rendered by the in-house
mini-markdown engine. It handles paragraphs (**wrapped lines reflow into one paragraph** — hard-wrap freely),
`**bold**`, `` `inline code` ``, bullet lists (including wrapped continuation lines), `>` notes, headings, and
**GitHub-style tables** (a `| a | b |` header followed by a `|---|---|` separator row). HTML comments
(`<!-- … -->`) are stripped, so they never show on a card. (No support for images, nested lists or links yet.)

**Legacy form (still supported).** A seat with **no** responsibility files falls back to a `## Responsibilities`
section in `seat.md` (with `owns:`/`delivers:`/`context:`/`doc:` sub-bullets), rendered as Owns/Delivers chips.
Migrating a seat = pull each responsibility out into its own file (front-matter `title`/`order` + the body above)
and delete the `## Responsibilities` section.

**Front-matter.** A responsibility file carries `context_for`, `id`, `title`, `seat`, `order`, `status`, `updated`;
`context.md` carries `context_for`, `id`, `seat`, `status`, `updated`. The engine uses `title`/`order`, strips the
rest, and renders the body. `status: draft` + `_TO FILL_` markers flag where real knowledge still needs adding.

**All seats use this scheme.** Every seat folder holds a thin `seat.md` plus one file per responsibility (the
fullest example is `simulation-lead`, which also has a `context.md` and rich Background/Scope/Interfaces sections).
Most responsibilities were migrated from the old inline form, so their files currently carry `## Owns` / `##
Delivers` / `## Interfaces` (from the old `context:` pointers) and are ready to grow Background/Scope/Open-questions
detail. The legacy inline `## Responsibilities` path in the engine is kept only as a fallback.

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
  Each seat's folder is derived by stripping `/seat.md` from its path, and its **responsibility files** are the other
  `.md` in that folder (not `context.md`). Raw fetches do **not** count against the anonymous 60/hr API limit — only
  the single tree call does. Responsibility files + `context.md` are fetched and cached when a seat is opened.
- Cards are parsed from front-matter + body in **vanilla JS**, then **deduped by `id`** (first wins).
- The chart is built from `reports_to` links, NOT folder location. `domain` sets the colour. `order`
  sorts siblings under a lead. A `group:` floats a card into a named block below the chart (`spare`, `gdbp`;
  see **Outside-the-team blocks**) instead of the tree.
- **`seat.md` is thin:** the engine reads its front-matter + three sections (purpose, Key interfaces, Requirements).
  Any other heading — notably `## Notes` — is ignored, so it's the place for hidden working notes.
- **Responsibilities are their own files** in each seat's folder, discovered from the tree and ordered by their
  front-matter `order` (title from `title`). Each renders as summary → Owns/Delivers chips → a Team-view More info box
  (Background/Scope/Interfaces/…). `context.md` is the seat-level dropdown. See **Context model**. Legacy seats with
  no responsibility files fall back to a `## Responsibilities` section on the card.

**Branding & colours.** Poppins font, white cards, near-black text, matching teambathracingelectric.com.
Brand blue `#105BAB`, gold `#FFC423`. Each **domain** sets a card's header (the coloured top border) and its
detail-panel pill, via `--d-*` CSS vars in `:root` (`assets/app.css`):

| Domain | Colour |
|---|---|
| Leadership | blue `#105BAB` |
| Technology – Software | green `#2E9E5B` |
| Technology – Electrical | yellow `#FFC423` |
| Technology – Mechanical | blue `#105BAB` |
| Operations | orange `#E8821E` |
| Outside AI (interface) | blue `#105BAB` |

**Open (unfilled) seats** get a **soft background glow only** — no outline ring, no pulse — **yellow** in
Recruitment and **red** in Team view; the header keeps its domain colour either way. Change a domain colour by
editing its `--d-*` var; the empty-glow colours live on `.blk.open` (recruitment) and `body.mode-team .blk.open`
(team).

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
Brian Cheung (tyc91), and Simulation + Perception Integration Lead Ryan Vickery. Everything else is currently open (`TBD`). Website Management is the spare/outside-AI seat.

**Editable team overview.** `AI/team.md` is shown as the default panel in both views (the
people-first pitch + "where we are / where we're going"). Edit it like any card.

**Possible future work (not built):** fill in the remaining context docs; wire the "Apply" button to a real
recruitment form; work key interfaces into the context more richly; sync seats to **success.co** (EOS platform;
GraphQL API at https://www.success.co/graphql, Bearer key, James generates the key); fill structure gaps
(Logging/Infra owner, integration/systems sign-off, test-day safety owner).
