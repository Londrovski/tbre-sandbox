---
context_for: responsibility
id: deliver-the-ebs
title: Deliver the EBS
seat: ebs-lead
order: 1
status: draft
updated: 2026-06-22
---

The technical core — design the fail-safe emergency brake and the safety case that proves it meets the rules.

## Owns
- The fail-safe brake design — the actuation and its stored-energy source
- How the EBS ties into the car's hydraulic brake system
- The safety case and rules compliance (verifying it meets the FS requirements)

## Delivers
- A passive, fail-safe emergency brake that stops the car on power or control loss
- The required deceleration and reaction time met (>10 m/s², <200 ms this year), with manual braking always preserved
- A verified safety case the scrutineers accept

## What's involved
Designing a brake that applies itself when power or control is lost — passively, with stored mechanical energy and no active electronics in the force path — sizing it to stop the car hard enough and fast enough, keeping the manual brakes fully working alongside it, and proving all of that against the Formula Student rules in a safety case. The mechanism will change year to year; the constant is a rules-compliant fail-safe brake whose performance and failure behaviour are verified before it's trusted on the car.

## This year (context, not structure)
- Architecture: one independent circuit per axle — **canister → regulator → normally-open solenoid → spring-return actuator → master cylinder → shuttle valve** into the existing manual brake lines. Power loss opens the solenoid; stored air brakes the car. The shuttle valve means the higher of manual or EBS pressure always reaches the callipers, so manual braking is never lost.
- Verified in simulation (~11.5 m/s² mean deceleration, ~134 ms onset) but **not yet built or physically tested** — this is a first design.
- **Known open gap:** with the current front-biased brake balance, a single rear-circuit failure can't reach the "half-performance" target — shown to be physically tied to the brake bias, flagged for the scrutineers, and an alternative concept is future work.
- Full physics, the four MATLAB verification models, the FMEA and the spec (EBS-01…EBS-36 mapped to the FS rules) are in the **EBS technical report (G10, 2026, parts 4–6)**.

## Open questions
- The single-axle-failure concept — accept and declare, or redesign the bias/architecture.
- Cornering / stability under braking (this year's model is straight-line only).
- Thermal effects of rapid brake application — flagged, untested.
