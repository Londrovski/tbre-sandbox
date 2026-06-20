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
- The **2025/26 TBRe simulator** (`tbresim`), a **Unity** project built by **Ben**. It's how the whole team
  makes progress between the short windows we get the real ADS-DV (DDT) car.
- It's effectively a **"mask layer"** — a Unity game using the Unity physics engine to drive a virtual car
  round a track. It is **not yet very physically accurate** (the vehicle Rigidbody / mass / wheel-collider
  settings were carried over from the old sim and are fairly arbitrary — see backlog #5) and it does **not**
  replicate the car's **CAN** messaging (that's what HIL adds).
- **Its key strength: it runs on any laptop** — Mac, Windows or Linux — **with no licence**, so everyone can
  develop and test locally. (HIL gives this up — see **Hardware-in-the-loop**.)

## How you see it and record it
- **Foxglove** is the viewer for live runs and replays. There's also an in-house Foxglove debug tool,
  **`foxdbg-rs`** (Rust), in the AI GitLab group.
- **Run logging is MCAP** (Harry's work) — records each run for easy replay in Foxglove.

## How it's built and run (real setup)
- **Engine: Unity Editor `6000.0.62f1`** (Unity 6). Install via **Unity Hub**; adding the cloned repo as a
  project prompts the right editor version + Win/Mac/Linux build support.
- **Clone:** `git clone https://gitlab.bath.ac.uk/tbre-ai/tbresim.git`, then add to Unity Hub.
- **Dependencies auto-fetch:** C# deps come via **NuGetForUnity** (on first open, click **Ignore** on the
  compile-errors popup — *not* Safe Mode — and let it restore; restart fixes it for good).
- **Comms package:** the comms library lives at `Packages/TBReSim Comms` and is **fetched automatically from
  `tbre-ai/tbresim-comms`** on load — this needs your **GitLab credentials set up** (same as cloning the sim).
- **Main scene:** `Assets/_TBReSim/Scenes/Simulation.unity`. Sim logic is under `Assets/_TBReSim/Scripts`;
  the project is organised into `Fonts/ Materials/ Models/ Prefabs/ Scenes/ Scripts/ Textures/`.
- **Conventions:** Microsoft .NET style enforced via `.editorconfig`; a custom C# script template (Create →
  C# Script, *not* MonoBehaviour Script) gives the standard regions. Match existing scripts.
- **Distribution:** it's a **Unity project you clone and run in the Editor** (or build a standalone player) —
  there is no prebuilt download.
- **Known gotchas:** only **one sim instance per machine** (ports are statically defined — including the Unity
  preview); the Editor can **freeze after editing scripts if the TBReAI server is left running** — stop the
  server and it compiles fine.

## The code architecture it lives in
- **`tbre-ai/tbreai`** — the **main compute system** (the brains: perception, SLAM, control, thread
  management). C/C++ with a .NET 9 layer; deps include **PCL, OpenCV, jsoncpp**; built with **CMake**
  (`-DCMAKE_BUILD_TYPE=Release` for production). The runtime/comms layer inside it is **TBReRT**.
- **`tbre-ai/tbresim`** (this) — the Unity sim, which talks to the compute system over the
  **`tbresim-comms`** message-queue library.
- The same interface is used whether the stack runs against the **sim** or the **production car** (modelled on
  the fixed **ADS-DV API**), so the same software runs DDT and the integrated car. HIL would add a third
  interface in the same pattern.

## Scope & aim (what owning this means)
- Own the sim, **train people to access and use it**, and **fix bugs**; keep the "any laptop, no licence"
  property.
- Work the backlog (see below). Good = a new member gets it running from the docs without hand-holding and can
  trust the results.

## Where it lives
- Repo: **`gitlab tbre-ai/tbresim`** (default branch `main`); comms in **`tbre-ai/tbresim-comms`**; debug tool
  **`tbre-ai/foxdbg-rs`**. Accessed via **Sourcetree** or any Git client.
- Setup/run guide: the repo **`README.md`** (Unity version, NuGet, scene path, conventions).
- Lab Jetson config doc **(+ Jetson password)**: in the compute repo's `docs/` folder (see below).
- Run logs: **MCAP**, viewed in **Foxglove**.

## The lab Jetson (remote test access)
- A **Jetson is plugged in permanently in the lab**; anyone on the **uni VPN** can log in and run on the real
  compute. Wenzel set it to stay on and always available; **Szymon has it registered / has the IP**.
- The **Jetson configuration doc (with the password)** is in the compute repo's `docs/` folder.

## The live backlog (tbresim — 14 open issues, all from Wenzel)
The issue tracker *is* the to-do list. Themes:
- **Comms / control:** rewrite sim comms for flexibility + multi-instance (#1); **API to launch & control the
  sim from the main system** (#7); redo the WaitAv handshake that makes runs slow (#11).
- **Fidelity:** refine physics realism (#5); fix the tilted tyre model (#4); noise settings for IMU etc. (#2).
- **Performance:** optimise the Unity pipeline, **LiDAR sim is the heavy part** (#6); a **headless / no-renderer
  model-based sim**, possibly toward VD integration / a custom physics engine (#8).
- **Tracks:** load tracks from **CSV** (#10); more **presets** — skidpad, acceleration etc. (#12).
- **Features / QoL:** re-implement reference objects/poses (#14); UI toggles (#3); awaiting-connection
  indicator (#13); research sim "missions" / auto-stop on completion (#9).

## People
- **Ben** — built the Unity sim; now on graph-SLAM. **Final-year, leaving** — capture his knowledge first.
- **Harry** — MCAP logging + MPC; **final-year, leaving.**
- **Szymon Fladro (spf35)** — Software Lead; knows the comms layer; has the lab Jetson registered.
- **Ryan Vickery** — current Simulation Lead / owner.
- **Wenzel Kinsky** — outgoing lead; set up the lab Jetson + VPN, wrote the Jetson config doc, raised the
  whole backlog.
- **Onboarding Lead** — the sim is a near-universal skill.

## Dependencies
- Inputs: Unity Hub + editor `6000.0.62f1`; GitLab credentials (for the auto-fetched comms package); Foxglove.
- Feeds: **Pathfinding**, **Perception Integration**, and anyone testing the stack.

## Open questions
- Current stability — which backlog items are actually blocking day-to-day use?
- **Access model:** how to give new members run/read access to learn and test without letting them break things
  (branch protection / sandbox / limited permissions)?
- Versioning / releases so everyone runs the same build.
