---
context_for: responsibility
id: hil
title: Hardware-in-the-loop (HIL) sim
seat: simulation-lead
order: 3
status: draft
updated: 2026-06-20
---

Test the real software on the real Jetson in the lab by feeding it simulated car data — no car needed.

## Owns
- The lab HIL rig & sensor-plate test access

## Delivers
- A HIL sim for the ADS-DV and TBRe27 car

## Background
- **In plain English:** HIL runs the **real software on the real compute** (the Jetson) in the lab, feeding it simulated sensor and CAN data exactly as the car would. The **CAN bus** is the car's internal messaging network; a **PCAN** is the adapter that plugs a computer into it — so the rig pretends to be the car over the same wiring, letting you test as if hooked up to the ADS-DV.
- **Not built yet.** Ryan Vickery is investigating it. Unlike the Unity sim it **needs a licensed machine** (CarMaker / IPG) and more setup.
- The base sim itself: see **Own & maintain the simulator**.

## Scope & aim
- Build a HIL sim for the ADS-DV and, in time, the integrated TBRe27 car; own the lab rig and the team's sensor-plate test access (kept set up and ready).
- **What good looks like:** a permanent rig at the sensor plate that's always ready — anyone can come and run a HIL test against the real stack.
- Where things live / future work: **FSAI** have published HIL instructions to follow (`github.com/FSAI` — _TO-FILL exact link_); CarMaker / IPG licence (holder / login via Teams / Finance); needs a HIL interface in **TBRe-RT** mirroring the ADS-DV API like the sim / production interfaces do.

## Interfaces
- **Ryan Vickery** — already on it; **Szymon** — knows the TBRe-RT comms layer; **FSAI / Ian Murphy** (technical director) — the HIL docs; CarMaker / IPG licence holder — _TO-FILL who._
- Hardware: PCAN, the lab Jetson (access over the uni VPN), the sensor plate (Mech). **Cost item** → flag to Finance (CarMaker licence).

## Open questions
- Where exactly are the FSAI HIL docs (link)?
- Licence status / cost, and which machine runs it?
- Scope of the TBRe-RT HIL interface work, and the timeline?
