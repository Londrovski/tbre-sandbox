---
context_for: responsibility
id: interface-with-team
title: Interface with the team
seat: steering-lead
order: 2
status: draft
updated: 2026-06-22
---

Own the steering system's relationships across the team — so it mounts cleanly, overlaps the manual steering correctly, and can actually be wired and built.

## Owns
- A defined, agreed space for the steering in the general assembly
- The technical relationships that keep the steering integrated — fit with surrounding parts, buildability, wiring (VCU & loom)

## Delivers
- A steering system fully integrated into the AI team and the wider TBRe team
- Permanent steering-angle data through a sensor — a contribution that helps the whole team, not just AI mode

## What's involved
The steering bolts into the car, shares the loom and is commanded by the control stack, so it has to be coordinated on three fronts:
- **Chassis team — mounting:** agree how and where the actuator mounts, and hold its defined space in the general assembly.
- **Vehicle Dynamics — steering overlap:** align on the steering torque and how the AI steering overlaps the manual steering.
- **AI electrical team (VCU & loom) — wiring & layout:** design so the motor closes the control loop cleanly and the wiring can be routed and built.

## This year (context, not structure)
- **VCU Lead (Shinn)** — closed-loop control and a layout that's easy to wire; pull in the **Loom Lead** on how that wiring is structured and routed.
- **Opportunity worth taking:** while we're working in the steering anyway, design in a **permanent steering-angle sensor** that stays on the car — useful to the whole team and the manual car, not just AI mode.

## Open questions
- Where the steering-angle sensor lives, and how it's protected from the driver's feet.
- The CAN command / feedback map shared with the VCU and control stack.
