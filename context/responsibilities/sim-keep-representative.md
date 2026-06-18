---
context_for: responsibility
id: sim-keep-representative
title: Keep it representative
seat: simulation-lead
status: draft
updated: 2026-06-18
---

# Context — Keep it representative

> Deep context for this responsibility. Hidden from the public recruitment site; intended for the team view.
> Linked from the Simulation Lead card via `doc: context/responsibilities/sim-keep-representative.md`.

## What this covers
Keeping the sim a faithful stand-in for the real car, so that work validated in sim transfers to the track.
As the car evolves toward TBRe27, the sim's vehicle model has to track those changes.

## What "representative" means here
The vehicle parameters and dynamics in the sim should match TBRe27 closely enough that the control stack
tuned in sim behaves the same on the car.
- _TO FILL — the specific parameters that must match (mass, wheelbase, tyre model, steering geometry, sensor
  placement, latency…) and acceptable tolerances._

## Where to look
- Vehicle parameters / car spec: _TO FILL — link to the source of truth (Mech / Mounting)._
- Sim model config: _TO FILL — where in tbresim the vehicle parameters live._

## Delivers
- Sim matched to the TBRe27 car

## Dependencies
- **Mounting Lead / Mechanical** — source of accurate, up-to-date car parameters.
- Changes to the car spec should trigger a sim update.

## Background / decisions
- _TO FILL — how parameter changes get communicated and versioned._
- _TO FILL — validation method (how you check the sim still matches reality after a test day)._

## Points of contact
- Mounting Lead
- Control Lead
