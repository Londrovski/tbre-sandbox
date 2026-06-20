---
context_for: responsibility
id: own-sim
title: Own & maintain the simulator
seat: simulation-lead
order: 1
status: draft
updated: 2026-06-20
---

Keep the sim everyone runs healthy — get people onto it and fix what breaks.

## Owns
- The simulator (tbresim)
- Member access & training
- Bug-fixing

## Delivers
- A reliable sim the whole team can run
- Documentation for members to onboard themselves to using the sim
- A team that can run and test with the sim

## Background
- A working **Unity-based** simulator (`tbresim`), built by **Ben Rall** and the team last year, living at `gitlab tbre-ai/tbresim`.
- Runs on any laptop — Mac, Windows, Linux — with **no licence needed**; this is its main strength (everyone can test on their own machine). Output is viewed in **Foxglove**.
- How stable it is today / any known setup failures: _TO-FILL._

## Scope & aim
- Own the sim, train people to access and use it, and fix bugs as they come up.
- **What good looks like:** a new member gets it running from the docs without hand-holding, and can trust the results.
- Where things live / future work: setup & run guide and distribution (prebuilt download vs build-from-source) — _TO-FILL where these live (repo README? Teams?)_; add a versioning / release scheme so everyone runs the same build.

## Interfaces
- **Ben Rall** — built it (architecture, setup quirks); **Ryan Vickery** — current owner; **Onboarding Lead** — the sim is a near-universal skill.
- Feeds Pathfinding, Perception Integration, and anyone testing the stack. Depends on Foxglove know-how (a universal skill).

## Open questions
- Where do the setup / run docs live, and are they current?
- **Access model:** how do we give new members run/read access to learn and test, without people who don't yet know the system being able to break things (branch protection? a safe sandbox? limited permissions)?
- Versioning / releases so everyone runs the same build?
