---
context_for: responsibility
id: own-sim
title: Own & maintain the simulator
seat: simulation-lead
status: draft
updated: 2026-06-19
---

> The base context for the sim itself. The other Simulation responsibilities (Model TBRe27, HIL) only add what's specific to them and point back here.

## What you inherit
- A working **Unity-based** simulator (`tbresim`), built by **Ben Rall** and the team last year.
- Runs on any laptop — Mac, Windows, Linux — with **no licence needed**; this is its main strength (everyone can test on their own machine).
- Output is viewed in **Foxglove**.
- Working / broken: _TO-FILL — how stable is it today; any known setup failures?_

## Where it lives
- Repo: `gitlab tbre-ai/tbresim`
- Setup / run guide: _TO-FILL — where is it (repo README? Teams?)_
- Distribution: _TO-FILL — prebuilt download or build-from-source?_

## Scope & aim
- Own the sim, train people to access and use it, and fix bugs as they come up.
- Good looks like: a new member gets it running from the docs without hand-holding and can trust the results.

## People
- **Ben Rall** — built it (architecture, setup quirks).
- **Ryan Vickery** — current owner.
- **Onboarding Lead** — the sim is a near-universal skill.

## Dependencies
- Inputs: Foxglove know-how (a universal skill).
- Outputs / feeds: Pathfinding, Perception Integration, and anyone testing the stack.

## Open questions
- Where do the setup / run docs live, and are they current?
- **Access model:** how do we give new members run/read access to learn and test, without people who don't yet know the system being able to break things (branch protection? a safe sandbox? limited permissions)?
- Versioning / releases so everyone runs the same build?
