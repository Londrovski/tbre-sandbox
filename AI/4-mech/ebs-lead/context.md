---
context_for: seat
id: ebs-lead
seat: EBS Lead
status: draft
updated: 2026-06-22
---

The Emergency Brake System for the driverless TBRe car — the passive, fail-safe brake that stops
the car automatically the moment something goes wrong (power loss, a CAN/handshake fault, the
shutdown circuit opening, an E-stop, or the autonomous system being switched off). Formula Student
makes this safety-critical and heavily rules-driven: it must be passive (electrical power loss must
*itself* cause braking, with no active electronics in the force path), it must hit a minimum
deceleration within a fixed reaction time, manual braking must always remain available, and the
whole thing has to pass a dynamic stop test and a scrutineering safety case. The role is to deliver
that component onto the car — designed, compliant, built and tested — **whatever physical form it
takes** in a given year. The specific mechanism will evolve; the responsibility (a rules-compliant
fail-safe brake, on the car, proven) does not.

This year's starting point is a **first design, verified by simulation only — nothing built yet**.
It is a passive pneumatic system, one independent circuit per axle: a compressed-air canister →
regulator → normally-open solenoid valve (held closed while powered) → spring-return pneumatic
actuator → master cylinder → shuttle valve that ties into the existing manual brake lines (the
higher of manual-pedal or EBS pressure always wins, so manual braking is never lost). On power
loss the solenoid opens and stored air applies the brakes. The models meet the targets on paper
(~11.5 m/s² mean deceleration, ~134 ms onset) but one known gap remains (single-axle-failure
performance) and it has not been manufactured or physically tested. Full specifics, the BOM, the
verification models and the open questions live in the **EBS technical report (G10, 2026, parts
4–6)** by Sam Meakes (technical), Sara Alkhalili (components) and Shaur Ahmed (mounting) — start
there.
