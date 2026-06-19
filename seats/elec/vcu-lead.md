---
id: vcu-lead
seat: VCU Lead
domain: Technology – Electrical
owner: Shinn Gee Choo
tag: csg45
course: Robotics · 4th Year
photo: seats/photos/csg45.JPG
reports_to: elec-lead
hrs: 2-3
order: 2
---

# VCU Lead

Owns the Vehicle Control Unit — the embedded bridge between the AI system and the car. Anything that runs on the VCU / ECU is firmly an Elec job.

## Responsibilities
- **Own the VCU interface**
  - context: gitlab tbre-ai/vcu-interface
  - owns: The VCU interface (vcu-interface)
  - owns: Embedded control — Simulink blocks, hard limits (max steering / accel), CAN translation
  - delivers: A reliable AI-to-car interface (the ADS-DV API on the embedded side)
  - delivers: CAN messages translated to motor torque / actuator commands

## Key interfaces
- Elec Lead
- Pathfinding Lead (control output / API)
- Main Electrical department

## Requirements
- Comfortable with embedded / CAN / microcontrollers, some C/C++
- Simulink helpful
- Any year

## Notes
_Working notes — not shown on the site._
