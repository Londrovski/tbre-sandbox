---
id: simulation-lead
seat: Simulation Lead
domain: Technology – Software
owner: Ryan Vickery
reports_to: software-lead
hrs: 2-3
order: 3
---

# Simulation Lead

Owns the simulation used to develop and test the stack — the custom-physics sim and the hardware-in-the-loop (HIL) sim.

## Responsibilities
- **Build & run the sim**
  - doc: context/responsibilities/sim-build-run.md
  - context: gitlab tbre-ai/tbresim
  - context: Originally built by Ben Rall
  - owns: The simulator (tbresim)
  - owns: Sim setup & docs
  - delivers: A custom-physics sim, off Unity
  - delivers: A sim others can rely on
- **Keep it representative**
  - doc: context/responsibilities/sim-keep-representative.md
  - delivers: Sim matched to the TBRe27 car
- **Hardware-in-the-loop (HIL) sim**
  - context: FSAI HIL instructions; CarMaker / IPG; PCAN on the Jetson
  - delivers: A HIL sim so the stack can be tested against the DDT-car interface

## Key interfaces
- Software Lead
- Pathfinding Lead
- Perception Integration Lead
- Sensor Plate Lead (Mech)

## Requirements
- Comfortable with C++ / Unity or game / physics engines
- Interested in simulation & vehicle modelling
- Any year

## Notes
_Working notes — not shown on the site._
_Ryan Vickery is already looking at the HIL sim._
