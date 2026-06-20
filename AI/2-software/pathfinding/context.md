---
context_for: seat
id: pathfinding
seat: Pathfinding Lead
status: draft
updated: 2026-06-20
---

The autonomy line — from "where am I?" through to the command that drives the car. It chains three stages:
**SLAM** builds a map of the cones and locates the car in it; **path planning** turns that into a line to
follow (a centre line, then a racing line); and **MPC control** turns the line into steering/throttle/brake
commands sent to the VCU. It all lives in the main compute repo (`tbre-ai/tbreai`, mostly under
`src/control/`). SLAM is the most developed part (Ben is building a new graph-SLAM); control is mid-transition
from simple PID to an acados-based MPC (Harry's work, prototyped in `tbre-ai/mpc-sandbox`). The seat is open —
it merges the old SLAM Lead + Control Lead roles, and both of those developers are leaving, so a priority is
capturing their work before they go.
