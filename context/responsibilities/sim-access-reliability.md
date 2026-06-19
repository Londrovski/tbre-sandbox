---
context_for: responsibility
id: sim-access-reliability
title: Access & reliability
seat: simulation-lead
status: draft
updated: 2026-06-19
---

# Context — Access & reliability

> Keeping the current sim working, and making sure everyone on the team can run it on their own machine.

## What you inherit
- A working **Unity-based** simulator (`tbresim`), originally built by **Ben Rall**.
- Runs on any laptop — Mac, Windows, Linux — with **no licence needed**; this is its main strength (everyone can test on their own machine).
- Output is viewed in **Foxglove**.
- Working / broken: _TO-FILL — how stable is it today; any known setup failures?_
- Next: keep it stable for the team as the custom-physics work (see the other responsibilities) lands.

## Where it lives
- Repo: `gitlab tbre-ai/tbresim`
- Setup / run guide: _TO-FILL — where is it (repo README? Teams?)_
- Distribution: _TO-FILL — prebuilt download or build-from-source?_

## Scope & aim
- Scope: maintain the current model; support members setting up and using the sim.
- Good looks like: a new member can get the sim running from the docs without hand-holding, and trust the results.

## People
- **Ben Rall** — original author (build, setup quirks).
- **Ryan Vickery** — current owner.
- **Onboarding Lead** — the sim is a near-universal skill for the team.

## Dependencies
- Inputs: Foxglove know-how (a universal skill).
- Outputs / feeds: Pathfinding, Perception Integration, and anyone testing the stack.

## Open questions
- Where do the setup / run docs live, and are they current?
- Common setup failures per OS?
- Is there versioning / releases so everyone runs the same build?
