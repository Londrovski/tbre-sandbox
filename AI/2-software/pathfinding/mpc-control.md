---
context_for: responsibility
id: mpc-control
title: MPC control
seat: pathfinding
order: 3
status: draft
updated: 2026-06-20
---

> The final stage: turn the reference path into actual commands for the car. This is the **closest interface
> between pathfinding and the car** — its output goes to the VCU. For the path it consumes, see **Path &
> racing line**.

## What you inherit
- **Today the system uses PID control** — simple, but **wobbly** (it overshoots the target, so the car weaves).
- **The upgrade is MPC** — specifically **MPCC (Model Predictive Contouring Control)** built on the **acados**
  library. MPC forecasts a path from the vehicle model and solves for the control inputs that follow it best;
  far smoother than PID. Wenzel's view: once MPC works well, the stack becomes mostly **maintenance &
  refinement**.
- It's prototyped in **`tbre-ai/mpc-sandbox`** (Python, default branch `master`):
  - `src/controllers/mpcc/` — the MPCC formulation: `controller.py`, `model.py`, `ocp_builder.py`,
    `stage_parameters.py`, `state.py`, `weights.py`.
  - `src/models/` — `kinematic_bicycle.py`, `dynamic_bicycle.py` (the vehicle models MPC minimises against).
  - `src/controllers/pure_pursuit.py` — a simple baseline controller for comparison.
  - `src/sim/simulator.py` — a lightweight Python sim; `src/telemetry/foxglove.py` — Foxglove output;
    `eufs-tracks/` — CSV tracks to test on.
  - **`docs/system.typ` (+ `system.pdf`)** — a **Typst technical write-up of the MPC system: read this first.**
    (Tracked as `tbreai` issue **#57**, "Create MPC plan and technical writeup".)
  - `acados` is included as a **git submodule**; set it up with `envrionment_scripts/set_acados_vars.sh`.
  - The formulation follows **Kloeser et al. 2020** (link in the repo README).
- The sandbox is deliberately **rough/experimental**; the plan is to **generate the MPC code and port it into
  the main system** — `tbre-ai/tbreai → src/control/controller/` (`controller.c`), alongside the existing
  `controller_test.c`.
- **Harry built this**; it's in his branch and reasonably documented — *"someone familiar with C and Python
  should be able to go in and tweak things."*

## The output (interface to the car)
- The control output is the **AI command** handed to the VCU: **steering angle (radians), throttle (torque),
  front/rear brake (%)** — the schema mirrored across the sim and car interfaces.
- It is sent over the **fixed ADS-DV API** (the `src/control/ddt/` interface), so the same control runs the DDT
  car and the integrated TBRe27 car. **Boundary:** MPC runs on the **Jetson = software**; the **VCU / Simulink**
  side that receives it is **Elec** (see the VCU Lead seat).

## Scope & aim
- Get MPC working well, **validate it in the sim, and tune it to the TBRe27 car**; deliver clean control output
  to the VCU.
- Good looks like: smooth, fast tracking of the racing line that transfers from sim to the real car.

## People
- **Harry** — built the acados MPC; **final-year, leaving** — capture the sandbox + writeup + branch first.
- **Szymon Fladro (spf35)** — Software Lead.
- **Shinn Gee Choo (csg45)** — **VCU Lead**, the receiving end of the control output.

## Dependencies
- **Input:** reference path (from **Path & racing line**) + vehicle state.
- **Output:** steering / throttle / brake → **VCU** (Elec) over the ADS-DV API.
- Tooling: **acados** (submodule + env script); Python; Foxglove.

## Open questions
- Porting the acados MPCC from the sandbox into `tbreai/src/control/controller/` — scope and timeline.
- Tuning to TBRe27 (needs the vehicle model — see **Model the TBRe27 car** on the Simulation seat).
- Validation route: sim first, then HIL / real car.
