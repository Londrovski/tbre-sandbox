---
context_for: responsibility
id: own-sim
title: Own & maintain the simulator
seat: simulation-lead
order: 1
status: draft
updated: 2026-06-20
---

> The base context for the sim itself — how it works today and what owning it means. The other two
> Simulation responsibilities (**Model the TBRe27 car**, **Hardware-in-the-loop**) only add what's specific
> to them and point back here.

## What it is
- A **Unity-based simulator** (`tbresim`), built by **Ben**. The current Unity iteration replaced an older sim.
- It's a **"mask layer"** — a Unity game that uses the **Unity physics engine** to drive a virtual car around
  a track. It is **not very accurate**, and it does **not** replicate the **CAN messaging** that happens on the
  real ADS-DV / DDT car. Good enough to develop and test the autonomy stack against; not a faithful vehicle model.
- **Its key strength: it runs on any laptop** — Mac, Windows or Linux — **with no licence**. Download it, run
  it, it works. This is deliberate and worth protecting: team members have very different machines, and this
  lets everyone test and develop locally. (The HIL sim gives up this property — see **Hardware-in-the-loop**.)

## How you see it and record it
- **Foxglove** is the viewer — it shows what's going on both when running the sim live and when replaying logs.
- **Run logging is MCAP** (built by **Harry**): a file format that records each run so it can be **replayed
  easily in Foxglove**. This is how runs are captured and reviewed.

## The lab Jetson (remote test access)
- There is a **Jetson plugged in permanently in the lab**. Anyone on the **uni VPN** can **log into it remotely
  and run tests on the real compute** — so members without powerful laptops can still test. Wenzel configured it
  to stay on and always be available.
- There is a **"Jetson configuration" doc** in the code's `docs/` folder (reached via **Sourcetree**) with
  connection instructions — **it contains the Jetson password**.
- Physically it behaves like a normal computer: monitor + login, then customise as needed.

## The code architecture it lives in
The sim is one interface inside the wider AI codebase, which splits in two:
- **TBRe-AI** — the main compute system: **control, perception, thread management**.
- **TBRe-RT** — the **comms layer**, where the sim / production / (future) HIL interfaces live.

Inside TBRe-RT the interfaces sit **behind the same function calls**, and **how the code is compiled** decides
which one runs:
- **Production + the ADS-DV API** — the real-car interfaces: **camera over USB, LiDAR over Ethernet, plus CAN.**
  Per Wenzel, *"it's all done, this all works."*
- **SIM** — the interface for the Unity sim.

Everything is modelled on the **fixed ADS-DV API** so the **same software runs the DDT car and the integrated
car**. (Adding HIL means adding a third set of function definitions in the same pattern — see **Hardware-in-the-loop**.)

## Scope & aim (what owning this means)
- Own the sim, **train people to access and use it**, and **fix bugs** as they come up.
- Keep the "runs on any laptop, no licence" property intact.
- Good looks like: a new member gets it running **from the docs without hand-holding** and can **trust the
  results**.

## Where it lives
- Repo: `gitlab tbre-ai/tbresim` (accessed via **Sourcetree**).
- Jetson config doc **(+ Jetson password)**: the code's **`docs/`** folder.
- Run logs: **MCAP** files, viewed in **Foxglove**.
- Setup / run guide: _TO FILL — where exactly (repo README? Teams?)._
- Distribution: _TO FILL — prebuilt download or build-from-source?_

## People
- **Ben** — built the current Unity sim; now on the new **graph-SLAM** work. **Final-year, leaving** — capture
  his setup quirks and architecture knowledge before he goes; this is the biggest continuity risk.
- **Harry** — built the **MCAP logging**; now on MPC. **Final-year, leaving.**
- **Szymon Fladro (spf35)** — Software Lead; knows the **TBRe-RT comms layer** and the sim/production interface.
- **Ryan Vickery** — current Simulation Lead / owner.
- **Wenzel Kinsky** — outgoing AI lead; set up the **lab Jetson + VPN access** and wrote the **Jetson config doc**.
- **Onboarding Lead** — running the sim is a near-universal skill, so it feeds onboarding.

## Dependencies
- Inputs: **Foxglove** know-how (a universal skill).
- Feeds: **Pathfinding**, **Perception Integration**, and anyone testing the stack.

## Open questions
- How stable is the sim today — any known setup failures?
- Where do the setup / run docs live, and are they current?
- **Access model:** how do we give new members run/read access to learn and test **without** people who don't
  yet know the system being able to break things (branch protection? a safe sandbox? limited permissions)?
- Versioning / releases so everyone runs the same build?
