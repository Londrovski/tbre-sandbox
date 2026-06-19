---
context_for: responsibility
id: hil
title: Hardware-in-the-loop (HIL) sim
seat: simulation-lead
status: draft
updated: 2026-06-19
---

> Delta only — for the sim itself see **Own & maintain the simulator**.

## In plain English
HIL lets you test the **real software on the real compute** (the Jetson) in the lab, by feeding it
simulated sensor and CAN data exactly as the car would. The **CAN bus** is the car's internal messaging
network; a **PCAN** is the adapter that plugs a computer into it. So instead of needing the actual car, the
rig pretends to be the car over the same wiring — letting you test as if you were hooked up to the ADS-DV.

## What you inherit
- **Not built yet.** Ryan Vickery is investigating it.
- **FSAI have published HIL instructions** to follow — _TO-FILL: paste the FSAI HIL link here._
- Unlike the Unity sim, it **needs a licensed machine** (CarMaker / IPG) and more setup.
- Aim is a **permanent lab rig at the sensor plate** that's always ready, so anyone can come and run a test.

## Where it lives
- FSAI HIL instructions: `github.com/FSAI` — _TO-FILL exact link._
- CarMaker / IPG licence: _placeholder — login / holder not stored here; see Teams / Finance._
- Hardware: PCAN; the lab Jetson (access over the uni VPN); the sensor plate.
- Comms: needs a HIL interface in **TBRe-RT**, mirroring the ADS-DV API like the sim / production interfaces do.

## Scope & aim
- Build a HIL sim for the ADS-DV and, in time, the integrated TBRe27 car.
- Own the lab rig and the team's sensor-plate test access (keep it set up and ready).
- Good looks like: anyone can come to the sensor plate and run a HIL test against the real stack.

## People
- **Ryan Vickery** — already on it.
- **Szymon** — knows the TBRe-RT comms layer.
- **FSAI / Ian Murphy** (technical director) — the HIL docs.
- CarMaker / IPG licence holder — _TO-FILL who._

## Dependencies
- Inputs: CarMaker / IPG licence, PCAN, lab Jetson, the sensor plate (Mech), the TBRe-RT HIL interface.
- **Cost item** → flag to Finance (CarMaker licence).

## Open questions
- Where exactly are the FSAI HIL docs (link)?
- Licence status / cost, and which machine runs it?
- Scope of the TBRe-RT HIL interface work, and the timeline?
