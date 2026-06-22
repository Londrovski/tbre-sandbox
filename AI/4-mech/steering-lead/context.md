---
context_for: seat
id: steering-lead
seat: Steering Lead
status: draft
updated: 2026-06-22
---

The autonomous steering actuator for the TBRe27 car — a motor-driven mechanism that turns the
car's existing steering rack on command from the AI, and that comes off with no tools so the car
drives as a normal manual car (Formula Student requires both the toolless removal and a manual
fallback with no parasitic torque). The role is as much delivery and coordination as it is design:
get a steering system designed, agreed with the rest of the team, ordered, built and tested on the
car in time.

This year's starting point: the design pivoted in June 2026. The previous column-mounted worm-gear
actuator (submitted as the GDBP technical report, now frozen) is replaced by a **rack-pinion-bottom
drive** — a second pickup was found on the bottom of the existing rack's pinion shaft, so the motor
can drive the rack from underneath through a gear train, leaving the rack and column untouched and
the manual fallback trivial. Concept is locked; the detail is open. The working hardware choices (a
CubeMars quasi-direct-drive motor, a spur-or-chain gear train, dry running) and the open questions
(centre-distance and envelope from CAD, the ~17 Nm torque figure to confirm with VD) live in the
**Steering Lead handoff (June 2026)** — start there for the specifics. The near-term milestone is a
basic, motion-capable actuator on the car for the postseason testing window.
