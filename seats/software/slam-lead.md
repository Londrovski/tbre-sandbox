---
id: pathfinding
seat: Pathfinding Lead
domain: Technology – Software
owner: TBD
reports_to: software-lead
hrs: 2-3
order: 1
---

# Pathfinding Lead

Owns the autonomy line: SLAM, path / racing-line planning, and the MPC control that drives the car — from "where am I" through to the control output handed to the VCU.

## Responsibilities
- **SLAM & localisation**
  - context: gitlab tbre-ai (main TBRe-AI code)
  - owns: The SLAM pipeline
  - delivers: Reliable mapping & localisation (well-developed this year — maintain & refine)
- **Path & racing line**
  - owns: Path planning
  - delivers: A smooth centre line, then a racing line between the cones
- **MPC control**
  - context: gitlab tbre-ai/mpc-sandbox
  - owns: The MPC implementation (acados)
  - delivers: Control output to the VCU — the closest interface between pathfinding and the car
  - delivers: Control validated in sim and tuned to TBRe27

## Key interfaces
- Software Lead
- Perception Integration Lead
- Simulation Lead
- VCU Lead

## Requirements
- Comfortable with C++ / Python and some maths / geometry
- Interested in robotics, state estimation, or control / MPC
- Any year

## Notes
_Working notes — not shown on the site._
_Merged from the old SLAM Lead + Control Lead seats (June 2026 restructure)._
