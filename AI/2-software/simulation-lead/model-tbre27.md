---
context_for: responsibility
id: sim-match-tbre27
title: Model the TBRe27 car
seat: simulation-lead
status: draft
updated: 2026-06-19
---

> Delta only — for the sim itself (repo, setup, history) see **Own & maintain the simulator**.

## What you inherit
- The sim **doesn't represent the TBRe27 car yet**, and **little has been done** on this so far.
- The full **general assembly and part details are available** to model from.
- For the sim model specifically, the main thing is getting the **sensors in the correct place** so it matches the car.

## Where it lives
- TBRe27 general assembly & part details: _TO-FILL — location (Mech / CAD)._
- Base sim repo & setup: see **Own & maintain the simulator**.

## Scope & aim
- Make the sim represent the TBRe27 car — primarily correct sensor placement plus vehicle details.
- Good looks like: control tuned in sim transfers to the real car with minimal surprises.

## People
- **Mech Lead (Sara)** and the **main mechanical team** (several seats currently unfilled).
- Needs communication across the wider team for part details.

## Dependencies
- Inputs: TBRe27 assembly / part data; correct sensor positions.
- A car-spec change should trigger a sim update.

## Open questions
- Which parameters must match, and to what tolerance?
- Validation loop: how do we check the sim against real logged runs after a test day?
