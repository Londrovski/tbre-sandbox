---
id: control-mpc-developer
seat: Control / MPC Developer
domain: Technology – Software
owner: TBD
reports_to: ai-team-lead
hrs: 2-3
---

# Control / MPC Developer

Owns vehicle control – turning a planned path into steering/throttle/brake commands, including Model Predictive Control.

## Responsibilities
- **Control stack** — Develop and tune the control stack (incl. MPC integration).
  - context: gitlab tbre-ai/mpc-sandbox
  - owns: Control codebase
  - delivers: A tuned control stack
- **Validate in sim** — Validate control in the Unity simulation before vehicle testing.
  - delivers: Sim-validated control
- **Vehicle tuning** — Tune for the TBRe27 vehicle dynamics (mass, tyres, geometry).
  - context: Vehicle dynamics params — TBD
  - delivers: Control tuned to TBRe27

## Key interfaces
- Simulation Developer

## Requirements
- Comfortable with control theory / MPC
- Python or C++ and some maths
- ~2-3 hrs/week
