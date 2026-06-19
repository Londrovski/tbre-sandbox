---
context_for: responsibility
id: sim-match-tbre27
title: Develop to match TBRe27
seat: simulation-lead
status: draft
updated: 2026-06-19
---

# Context — Develop to match TBRe27

> Growing the sim so its vehicle behaviour represents the real TBRe27 car.

## What you inherit
- The current sim uses **Unity's physics**, which is **"not very accurate"** (per Wenzel).
- Direction: move to a **custom-physics** model for fidelity.
- Working / broken: _TO-FILL — what's modelled well vs poorly today?_
- Next: build the custom-physics model; define which car parameters must match.

## Where it lives
- Vehicle-parameter source of truth: _TO-FILL — Mech / Vehicle Dynamics (spreadsheet? CAD?)_
- Where parameters live inside `tbresim`: _TO-FILL_

## Scope & aim
- Scope: develop the sim's vehicle model toward the TBRe27 car.
- Good looks like: control tuned in sim transfers to the real car with minimal surprises.

## People
- **Mech Lead (Sara) / Vehicle Dynamics** — car parameters.
- **Pathfinding Lead** — main consumer; needs the fidelity for control.
- **Sensor Plate Lead** — sensor placement on the car.

## Dependencies
- Inputs: up-to-date TBRe27 parameters from Mech / VD.
- Outputs / feeds: a representative sim for Pathfinding / control development.
- A car-spec change should trigger a sim update.

## Open questions
- Which parameters must match, and to what tolerance?
- How do parameter changes get communicated and versioned?
- Validation loop: how do we check the sim against real logged runs after a test day?
- Target physics approach for the custom sim?
