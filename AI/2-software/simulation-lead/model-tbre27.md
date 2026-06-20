---
context_for: responsibility
id: model-tbre27
title: Model the TBRe27 car
seat: simulation-lead
order: 2
status: draft
updated: 2026-06-20
---

> **Delta only.** For the sim itself — what it is, how it works, the repo, Foxglove/MCAP, the Jetson and the
> code architecture — see **Own & maintain the simulator**. This doc covers *only* the work to make the sim
> represent the **TBRe27** car.

## Why this matters
The team's main goal is **integrating the AI system onto the TBRe27 car for competition in summer 2027.** For
the sim to be useful for that, it has to actually behave like the TBRe27 car — so that anything tuned in sim
transfers to the real car with minimal surprises.

## What you inherit
- The sim **does not represent the TBRe27 car yet**, and **little has been done** on this so far.
- The single most important piece is **getting the sensors in the correct place** so the sim geometry matches
  the real car; beyond that, the wider vehicle details.
- The full **TBRe27 general assembly and part details exist** to model from (Mech / CAD side).
- **Current physics is a placeholder:** the sim's vehicle Rigidbody, mass and wheel-collider settings were
  carried over from the old sim and are fairly arbitrary (tbresim issue **#5**), and wheel colliders behave
  inconsistently at high speed. Making the vehicle behave like TBRe27 overlaps with that realism work.
- There's a backlog item to build a **headless, model-based sim** and pursue **Vehicle-Dynamics integration /
  a custom physics engine** (tbresim issue **#8**) — the natural home for a proper TBRe27 vehicle model.

## Scope & aim
- Make the sim represent the TBRe27 car — **primarily correct sensor placement**, plus vehicle details.
- Good looks like: control tuned in sim **transfers to the real car with minimal surprises**.

## Where it lives
- TBRe27 general assembly & part details: _TO FILL — location (Mech / CAD)._
- **Adjacent CarMaker vehicle-model assets (Vehicle-Dynamics-owned):**
  `gitlab tbre/ipg-models-and-scripts` — IPG / CarMaker car models (**TBRe24 & TBRe25**), **tyre models**,
  front/rear **kinematics**, road models and test runs; plus `gitlab tbre/half-car-model`. These are the
  CarMaker vehicle models to build on if/when the TBRe27 model is needed for HIL/CarMaker (see **Hardware-in-the-loop**).
- Base sim repo & setup: see **Own & maintain the simulator**.

## People
- **Mech Lead (Sara)** and the **main mechanical team** — for the car's geometry and part details (several mech
  seats currently unfilled).
- **Vehicle Dynamics team** — own the CarMaker car models / tyre models above.
- Needs communication across the wider team to gather part details.

## Dependencies
- Inputs: **TBRe27 assembly / part data**; **correct sensor positions**.
- A **car-spec change should trigger a sim update** — keep the model in step with the real design.

## Open questions
- Which parameters must match, and to what **tolerance**?
- **Validation loop:** how do we check the sim against **real logged runs** after a test day?
- Where exactly does the TBRe27 GA / part data live, and who is the point of contact for it?
