---
context_for: seat
id: simulation-lead
seat: Simulation Lead
status: draft
updated: 2026-06-18
---

# Seat context — Simulation Lead

> Per-seat catch-all context: the background a holder of this seat needs that isn't tied to a single
> responsibility. Hidden from the public recruitment site; surfaced in the future team view.
> Each responsibility has its own doc under `context/responsibilities/`.

## Why this seat exists
The AI control stack can't be developed against the real car for most of the year — the team only has the
IMechE test vehicle for a short window. The simulator is how Control, SLAM and the wider stack keep making
progress between test days. Whoever holds this seat owns that environment.

## How it fits the team
- Sits under the **Software Lead**.
- Main customers are **Control Lead** (uses the sim to develop/tune the controller) and, over time, **SLAM**
  and perception for closed-loop testing.
- Depends on **Mounting Lead** / mechanical for accurate vehicle parameters to stay representative of TBRe27.

## History & current state
- Originally built by **Ben Rall**.
- Current sim is built in **Unity**; the direction is to move to a **custom-physics** simulator.
- Lives at **gitlab: tbre-ai/tbresim**.

## Where things live
- Repo: `gitlab tbre-ai/tbresim`
- Sim setup & docs: _TO FILL — link the README / setup notes once consolidated._

## Open questions / decisions
- _TO FILL — what's the target physics approach / engine for the custom sim?_
- _TO FILL — definition of "representative enough" for TBRe27 (which parameters must match, to what tolerance)._

## Points of contact
- Ben Rall (original author) — _TO FILL contact_
- Control Lead, Mounting Lead (see card interfaces)
