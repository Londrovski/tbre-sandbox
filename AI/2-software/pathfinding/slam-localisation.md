---
context_for: responsibility
id: slam-localisation
title: SLAM & localisation
seat: pathfinding
order: 1
status: draft
updated: 2026-06-20
---

The first stage of the autonomy line — "where am I, and where are the cones?" It produces the car's pose and a map of the cones for the path planner. For the overall code layout and build, see the Software Lead notes; this is the SLAM detail.

## Owns
- The SLAM pipeline (`src/control/slam/` in `tbre-ai/tbreai`)

## Delivers
- Reliable mapping & localisation (the most mature part of the stack — maintain & refine)

## What you inherit
A reasonably well-developed SLAM pipeline, written in **C**, in `tbre-ai/tbreai` under `src/control/slam/`. The pieces:

- `slam.c` / `slam.h` — the pipeline entry.
- `slam_odom.c` — odometry (motion estimate).
- `slam_local.c` — the local map; `slam_global.c` — the global map and track-zone identification from the cone landmarks (`slam_identify_track_zones`).
- `slam_path.c` — path output (see **Path & racing line**, which lives here too).
- `slam_debug.c` — debugging; `jc_voronoi/` — a vendored Voronoi library used for track / centre-line geometry.

It takes fused cone detections (from Perception Integration) and produces the car's pose plus a map of cones / track zones for the planner. **Ben is building a new graph-SLAM implementation** — the next iteration of this. **Szymon** has also done cleanup on the SLAM code.

## Where it lives
- `tbre-ai/tbreai`, `src/control/slam/`. Built with the rest of the compute system (CMake; see the repo README). Visualised in Foxglove.
- Ben's new graph-SLAM: _TO FILL — which branch, and how far along._

## People
- **Ben** — new graph-SLAM; final-year, leaving — get his design and branch documented before he goes.
- **Szymon Fladro** (spf35) — Software Lead; did SLAM cleanup, knows the codebase.
- Historically several members (Emil, Ryan, Tariq) tried SLAM tasks but little landed.

## Dependencies
- Input: fused cone detections from **Perception Integration** (LiDAR + camera).
- Output: pose + map to **Path & racing line**.

## Open questions
- Status of the graph-SLAM rewrite — branch, completeness, and what's needed to merge it.
- Loop closure / drift handling, and how localisation is validated against real logged runs.
