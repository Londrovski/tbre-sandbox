---
context_for: responsibility
id: hil
title: Hardware-in-the-loop (HIL) sim
seat: simulation-lead
order: 3
status: draft
updated: 2026-06-20
---

> **Delta only.** For the sim itself — the Unity sim, Foxglove/MCAP, the lab Jetson and the TBRe-RT code
> architecture — see **Own & maintain the simulator**. This doc covers *only* moving to a hardware-in-the-loop sim.

## In plain English
HIL lets you test the **real software on the real compute** (the lab **Jetson**) by feeding it **simulated
sensor and CAN data exactly as the real car would.** You **replicate a CAN bus**; a **P-CAN** is the adapter
that plugs a computer into it. So instead of needing the actual car, the rig pretends to be the car over the
same wiring — testing on the lab Jetson becomes **"exactly like hooking up to the DDT car."**

## How it differs from the Unity sim
| | Current Unity sim (see *Own & maintain the simulator*) | HIL sim |
|---|---|---|
| What it is | Unity "mask layer" / game | Real stack on the real Jetson, fed simulated CAN + sensors |
| Fidelity | Not very accurate; **no CAN** | Replicates the **CAN bus**; uses **CarMaker** in the background to sync |
| Hardware | **Any laptop, no licence** | **Licensed machine only** — needs an **IPG / CarMaker licence** |
| Extra kit | none | **P-CAN** adapter; the lab Jetson |
| Software work | exists | a new **HIL interface in TBRe-RT** |

## Status
- **Not built yet.** It is **independent work** — Wenzel: *"the HIL is separate… it could be done at any time."*
  It is not blocked by other tasks. A major but self-contained job.

## What building it requires
1. **IPG / CarMaker licence + a machine to run it on.** It can't realistically run on a normal laptop. This is
   a **cost item → flag to Finance.** (IPG / Ansys **training was already done last year** as a carryover item.)
2. A **P-CAN** adapter.
3. The **lab Jetson** — already set up and VPN-accessible (see **Own & maintain the simulator**).
4. The **HIL interface in TBRe-RT** — a new set of function definitions on the comms side, alongside the
   existing sim / production interfaces. **Szymon** knows this layer.
5. **FSAI's HIL instructions** — FSAI has **published instructions on how to build HIL** on their GitHub
   (**github.com/FSAI**), alongside the **ADS-DV documentation** and a dedicated **HIL simulator page**, which
   they keep updating.

## The end goal
A **permanent HIL rig at the sensor plate in the lab that is always ready**, so anyone can walk up and run a
test against the real stack.

## Where it lives
- FSAI docs (HIL instructions + ADS-DV docs): **github.com/FSAI** — _TO FILL: exact HIL page link._
- CarMaker / IPG licence: holder / login _TO FILL — see Teams / Finance._
- Hardware: **P-CAN**; the **lab Jetson** (over the uni VPN); the **sensor plate**.
- Comms: the **HIL interface in TBRe-RT**, mirroring the ADS-DV API like the sim / production interfaces do.

## People
- **Ryan Vickery** — Simulation Lead / owner.
- **Szymon** — knows the **TBRe-RT** comms layer (the HIL interface work).
- **FSAI / Ian Murphy** (FSAI technical director) — owns the HIL docs.
- **CarMaker / IPG licence holder** — _TO FILL who._

> **Working with FSAI/FSUK (tip from Wenzel):** email them early — they're slow and disorganised but
> responsive, and they have **lots of useful docs they don't publish**, so you have to ask.

## Dependencies
- Inputs: **CarMaker / IPG licence**, **P-CAN**, the **lab Jetson**, the **sensor plate** (Mech), and the
  **TBRe-RT HIL interface**.
- **Cost item** → flag to **Finance** (CarMaker licence).

## Open questions
- The exact **FSAI HIL doc link**.
- CarMaker / IPG **licence status, cost, and which machine** runs it — and **who holds** it.
- The **scope and timeline** of the TBRe-RT HIL interface work.
