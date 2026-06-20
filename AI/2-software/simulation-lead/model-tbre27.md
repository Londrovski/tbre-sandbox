---
context_for: responsibility
id: model-tbre27
title: Model the TBRe27 car
seat: simulation-lead
status: draft
updated: 2026-06-20
---

Make the sim actually represent the TBRe27 car — starting with the sensors in the right place.

## Delivers
- A sim that represents the TBRe27 car

## Background
- The sim **doesn't represent the TBRe27 car yet**, and **little has been done** on this so far.
- The full **general assembly and part details are available** to model from; the main job is getting the **sensors in the correct place** so it matches the car.
- The base sim itself (repo, setup, history): see **Own & maintain the simulator**.

## Scope & aim
- Make the sim represent the TBRe27 car — primarily correct sensor placement plus vehicle details.
- **What good looks like:** control tuned in sim transfers to the real car with minimal surprises.
- Where things live / future work: TBRe27 general assembly & part details — _TO-FILL location (Mech / CAD)._

## Interfaces
- **Mech Lead (Sara)** and the **main mechanical team** (several seats currently unfilled) — needs cross-team communication for part details.
- Inputs: TBRe27 assembly / part data and correct sensor positions; a car-spec change should trigger a sim update.

## Open questions
- Which parameters must match, and to what tolerance?
- Validation loop: how do we check the sim against real logged runs after a test day?
