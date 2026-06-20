---
context_for: responsibility
id: own-sim
title: Own & maintain the simulator
seat: simulation-lead
order: 1
status: draft
updated: 2026-06-20
---

The base context for the sim itself — what it is, how it works, and what owning it means. The **Model the TBRe27 car** and **Hardware-in-the-loop** responsibilities only add what's specific to them and point back here.

## Owns
- The simulator (`tbresim`)
- Member access & training
- Bug-fixing and the issue backlog

## Delivers
- A reliable sim the whole team can run on any laptop
- A team that can run and test against the sim

## What it is
The 2025/26 TBRe simulator (`tbresim`), a **Unity** project built by Ben. It's how the whole team makes progress between the short windows we get the real ADS-DV (DDT) car. It's effectively a "mask layer" — a Unity game using the Unity physics engine to drive a virtual car round a track. It is not yet very physically accurate (the vehicle Rigidbody, mass and wheel-collider settings were carried over from the old sim — see backlog #5), and it does not replicate the car's CAN messaging (that's what HIL adds). Its key strength: it runs on any laptop — Mac, Windows or Linux — with no licence, so everyone can develop and test locally.

## How you see it and record it
Foxglove is the viewer for live runs and replays. There's also an in-house Foxglove debug tool, `foxdbg-rs` (Rust), in the AI GitLab group. Run logging is MCAP (Harry's work) — it records each run for easy replay in Foxglove.

## How it's built and run
- Engine: Unity Editor `6000.0.62f1` (Unity 6). Install via Unity Hub; adding the cloned repo as a project prompts the right editor version plus Win/Mac/Linux build support.
- Clone: `git clone https://gitlab.bath.ac.uk/tbre-ai/tbresim.git`, then add it to Unity Hub.
- Dependencies auto-fetch via NuGetForUnity. On first open, click **Ignore** on the compile-errors popup (not Safe Mode) and let it restore; a restart fixes it for good.
- The comms library lives at `Packages/TBReSim Comms` and is fetched automatically from `tbre-ai/tbresim-comms` on load — this needs your GitLab credentials set up.
- Main scene: `Assets/_TBReSim/Scenes/Simulation.unity`. Sim logic is under `Assets/_TBReSim/Scripts`.
- Conventions: Microsoft .NET style via `.editorconfig`; use the custom C# script template (Create then C# Script, not MonoBehaviour Script).
- Distribution: it's a Unity project you clone and run in the Editor (or build a standalone player) — there is no prebuilt download.
- Known gotchas: only one sim instance per machine (ports are statically defined, including the Unity preview); the Editor can freeze after editing scripts if the TBReAI server is left running — stop the server and it compiles fine.

## The code architecture it lives in
- `tbre-ai/tbreai` — the main compute system (perception, SLAM, control, thread management). C/C++ with a .NET 9 layer; deps include PCL, OpenCV, jsoncpp; built with CMake. The runtime/comms layer inside it is TBReRT.
- `tbre-ai/tbresim` (this) — the Unity sim, which talks to the compute system over the `tbresim-comms` message-queue library.
- The same interface runs the stack against the sim or the production car (modelled on the fixed ADS-DV API), so the same software runs DDT and the integrated car. HIL would add a third interface in the same pattern.

## The live backlog
The `tbresim` issue tracker (14 open, all from Wenzel) is the to-do list. Themes: rewrite sim comms for flexibility and multiple instances (#1); an API to launch and control the sim from the main system (#7); redo the WaitAv handshake that makes runs slow (#11); physics realism (#5); the tilted tyre model (#4); IMU noise settings (#2); performance, where LiDAR sim is the heavy part (#6); a headless / no-renderer model-based sim toward VD integration (#8); load tracks from CSV (#10) and more presets (#12); re-implement reference objects (#14); UI toggles (#3); an awaiting-connection indicator (#13); research sim "missions" (#9).

## People
- **Ben** — built the Unity sim; now on graph-SLAM. Final-year, leaving — capture his knowledge first.
- **Harry** — MCAP logging and MPC; final-year, leaving.
- **Szymon Fladro** (spf35) — Software Lead; knows the comms layer; has the lab Jetson registered.
- **Ryan Vickery** — current Simulation Lead / owner.
- **Onboarding Lead** — the sim is a near-universal skill.

## Open questions
- Current stability — which backlog items actually block day-to-day use?
- Access model: how to give new members run/read access to learn and test without letting them break things (branch protection, a sandbox, limited permissions)?
- Versioning / releases so everyone runs the same build.
