---
context_for: responsibility
id: deliver-actuator
title: Deliver the steering actuator
seat: steering-lead
order: 1
status: draft
updated: 2026-06-22
---

The technical core — design and deliver the actuator itself: the motor, the transmission and the mechanism that drives the steering and unbolts for manual driving.

## Owns
- Motor choice and optimisation
- Transmission choice (gear or chain ratio)
- Technical design and mounting to the car (the chassis interface)

## Delivers
- A quick-release, tool-lessly removable actuator
- The steering torque demand met (17 Nm this year), with the manual rack preserved
- Size, motor, gear and layout that fit the car and the legal envelope

## What's involved
Choosing and sizing the motor and the transmission (the gear or chain ratio), then designing the mechanism that carries that drive into the steering and mounts to the car — while keeping it removable with no tools and the manual steering path unaffected. The detail changes year to year; the constant is a safe, removable actuator that hits the torque and speed the car needs and complies with the Formula Student steering rules.

## This year (context, not structure)
- Architecture: **rack-pinion-bottom drive** — drive the existing rack at the newly-found bottom pickup of its pinion shaft. The big gear stays on the car; the motor plus its gear is the removable unit.
- The driving constraint: the motor body is large (~Ø98 mm) and can't sit beside the steering column, so the gear train has to open up enough centre distance to clear it. Currently leaning toward two gears with a lightened wheel.
- Working choices: a CubeMars AK80-8 motor; a spur-or-chain transmission; dry (un-lubricated) running. **HPC Gears** were investigated and are now a Bath-approved supplier — a natural starting point, not a locked-in decision.
- Full rationale, the rejected options, and the motor/gear selection workbook are in the **Steering Lead handoff (June 2026)** and the prior **steering-scheme4 handoff**. The frozen worm-gear **GDBP technical report** is historical reference only.

## Open questions
- Centre-distance and wheel-diameter limits from the chassis CAD.
- Whether the 17 Nm figure is raw or already safety-factor-loaded (confirm with Vehicle Dynamics).
- Bottom-pickup geometry — what the adapter mates to.
