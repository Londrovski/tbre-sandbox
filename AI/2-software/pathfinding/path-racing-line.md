---
context_for: responsibility
id: path-racing-line
title: Path & racing line
seat: pathfinding
order: 2
status: draft
updated: 2026-06-20
---

> The middle stage: turn the SLAM map into a line for the car to follow. Takes the cone map in, hands a
> reference path to **MPC control**. For the SLAM side see **SLAM & localisation** (same folder).

## What you inherit
- Path planning currently lives **with SLAM**, in **`tbre-ai/tbreai` → `src/control/slam/slam_path.c`**
  (+ `slam_path.h`), using the cone landmarks and the global map's **track zones** (`slam_global.c`).
- The **`jc_voronoi`** Voronoi library (vendored under `src/control/slam/jc_voronoi/`) is the tool for finding
  the **centre line** between the blue/yellow cone boundaries.
- Cone types are distinguished (blue / yellow / small-orange / large-orange) — large-orange marks start/finish
  and key track features, which the planner uses.

## Scope & aim
- Deliver a **smooth centre line** first (the reliable baseline), then progress to an **optimised racing line**
  between the cones.
- The path is the **reference the controller tracks**, so it must be smooth and well-conditioned for MPC.

## Where it lives
- `gitlab tbre-ai/tbreai`, `src/control/slam/slam_path.c` (with `slam_global.c` for track zones).
- The `tbre-ai/mpc-sandbox` repo bundles **EUFS track CSVs** (`eufs-tracks/`: skidpad, acceleration,
  comp_2021, not_square, …) useful for developing/validating path + control offline.

## Dependencies
- **Input:** the cone map + pose from **SLAM & localisation**.
- **Output:** a reference path → **MPC control**.

## Open questions
- The racing-line approach (curvature / time-optimal?) beyond the centre line.
- The exact hand-off format from path → controller, and how it's kept in sync with SLAM updates.
