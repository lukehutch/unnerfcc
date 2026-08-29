<!--
name: 'Skill: Artifact template runtime capability note'
description: >-
  Tells the static page template that live data, shared state, handing the
  viewer a file, or self-republishing require loading the runtime-capability
  skill first.
ccVersion: 2.1.251
variables:
  - RUNTIME_SKILL_NAME
-->


## When the page needs more than static HTML

This template builds a static page from data in the conversation. If the user wants behavior static HTML cannot provide on its own — the page reading the user's live or connected data, remembering what people do on it (a poll, a sign-up sheet, a checklist, a document edited in place — it saves new versions of itself), keeping state that is shared across viewers, knowing who is viewing, asking Claude a question of its own, storing files people add, or handing the viewer a file to save — that is a runtime capability, granted per user by the control plane: load the `${RUNTIME_SKILL_NAME}` skill before relying on it.
