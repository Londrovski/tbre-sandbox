# TBRe AI Team — role map

Interactive org chart for the TBRe AI team. **Live:** https://londrovski.github.io/tbre-sandbox/

The page is self-building: `index.html` reads every card in **`seats/`** (via the GitHub API)
and renders the org chart from the front-matter at the top of each file. There's no database —
**the markdown cards are the data**. Add or edit a card and it shows up automatically.

## Layout
- **`seats/`** — one markdown card per role (the source of truth).
- **`seats/archive/`** — parked roles, not shown on the site.
- **`seats/photos/`** — headshots (`<tag>.png`).
- **`index.html`** — the self-loading chart + detail panel.

## Add / edit a role
Create `seats/<id>.md`:

```markdown
---
id: my-seat
seat: My Seat
domain: Technology – Software   # or Leadership | Technology – Electrical | Technology – Mechanical | Operations | Outside AI (interface)
owner: TBD                      # name, or TBD = open seat (glows gold)
tag: ab1234                     # uni username (optional)
photo: seats/photos/ab1234.png  # optional
reports_to: ai-team-lead        # parent seat id; blank = top
hrs: 2-3
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
```

Push to `main` → GitHub Pages redeploys. Each role is a *seat* (one owner, ~2-3 hrs/week);
one person can hold several. Responsibilities are portable between seats.

_Note: old `roles/`, `archive/`, and `seats.json` at the repo root are superseded by `seats/` and ignored by the site._
