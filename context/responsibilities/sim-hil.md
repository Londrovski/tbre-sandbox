---
context_for: responsibility
id: sim-hil
title: Develop the HIL sim
seat: simulation-lead
status: draft
updated: 2026-06-19
---

# Context — Develop the HIL sim

> A hardware-in-the-loop sim that replicates the car's CAN messaging so the stack can be tested on real compute, as if hooked to the car.

## What you inherit
- **Not built yet.** Ryan Vickery is already investigating it.
- **FSAI have published HIL instructions** to follow.
- It replicates the **CAN bus / messaging** of the real car; you test on the **lab Jetson** with a **PCAN**, and it behaves like hooking up to the DDT car.
- Unlike the Unity sim, it **needs a licensed machine** (CarMaker / IPG) — it can't just run on any laptop.
- Next: stand up the HIL interface and get a first loop running.

## Where it lives
- FSAI HIL instructions: `github.com/FSAI` — _TO-FILL exact page / repo_
- CarMaker / IPG licence: _placeholder — login / holder not stored here; see Teams / Finance_
- Hardware: PCAN; the lab Jetson (access over the uni VPN).
- Comms: needs a HIL interface in **TBRe-RT**, mirroring the ADS-DV API like the sim / production interfaces do.

## Scope & aim
- Scope: build a HIL sim for the ADS-DV and, in time, the integrated TBRe27 car.
- Good looks like: the stack runs on the Jetson against the HIL exactly as it would against the real car.

## People
- **Ryan Vickery** — already on it.
- **Szymon** — knows the TBRe-RT comms layer.
- **FSAI / Ian Murphy** (technical director) — the HIL docs.
- CarMaker / IPG licence holder — _TO-FILL who._

## Dependencies
- Inputs: CarMaker / IPG licence, PCAN, lab Jetson access, FSAI instructions, the TBRe-RT HIL interface.
- Outputs / feeds: a high-fidelity test path for the whole stack; ties to Sensor Plate ("kept available for HIL testing") and the VCU API.
- **Cost item** → flag to Finance (CarMaker licence).

## Open questions
- Where exactly are the FSAI HIL docs?
- Licence status / cost, and which machine runs it?
- Scope of the TBRe-RT HIL interface work?
- Timeline / first milestone?
