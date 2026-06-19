---
context_for: seat
id: simulation-lead
seat: Simulation Lead
status: draft
updated: 2026-06-19
---

# Seat context — Simulation Lead

> Background for whoever holds this seat that isn't tied to a single responsibility. Each responsibility has its own context doc.

## What you inherit
- A Unity-based `tbresim` (built by Ben Rall), relied on all year because the team only has the real DDT car for a short window — the sim is how everyone makes progress between test days.
- Two directions in flight: the move to custom physics (fidelity) and the new HIL sim (Ryan).

## Where it lives
- Repo: `gitlab tbre-ai/tbresim`. Output viewed in Foxglove.

## Scope & aim
- The team's main development and test environment for the autonomy stack, on any machine and (via HIL) on real compute.

## People
- Reports to the Software Lead. Main customers: Pathfinding, Perception Integration. Depends on Mech / Vehicle Dynamics for car parameters.

## Dependencies
- Feeds the whole software stack; depends on car parameters (Mech/VD) and the TBRe-RT comms layer (for HIL).

## Open questions
- Long-term: one sim, or two (a lightweight everyone-can-run sim plus the high-fidelity HIL)?
