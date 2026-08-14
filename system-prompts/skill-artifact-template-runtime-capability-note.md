<!--
name: 'Skill: Artifact template runtime capability note'
description: >-
  Tells the static page template that live data, shared state, handing the
  viewer a file, or self-republishing require loading the runtime-capability
  skill first.
ccVersion: 2.1.231
variables:
  - ARTIFACT_RUNTIME_SKILL_NAME
-->


## When the page needs more than static HTML

This template builds a static page from data in the conversation. If the user wants behavior static HTML cannot provide on its own — the page reading the user's live or connected data, keeping state that is shared across viewers, handing the viewer a file to save, or updating and republishing itself — that is a runtime capability, granted per user by the control plane: load the `${ARTIFACT_RUNTIME_SKILL_NAME}` skill before relying on it.
