<!--
name: 'Skill: prototype runtime capability note'
description: >-
  Tells the prototype skill that reading the user's live or connected data,
  acting on their behalf from the page, and handing the viewer a file to save
  are per-user runtime capabilities — load the runtime-capability skill before
  relying on one, fake only what no capability covers, and keep saying what is
  faked.
ccVersion: 2.1.231
variables:
  - ARTIFACT_RUNTIME_SKILL_NAME
-->


## When the idea needs real data or real actions

This is wired fidelity. A prototype that runs against the real thing proves far more than one against a mock. When the idea turns on the user's real data or real actions — their issues, their calendar, a doc, an API they already use — reading that live or connected data, acting on the user's behalf from the published page, or handing the viewer a file to save, is a runtime capability granted per user by the control plane and declared when you publish: load the `${ARTIFACT_RUNTIME_SKILL_NAME}` skill before relying on it, to see which capabilities this user has and how to declare the one that fits. Fake only what no available capability covers — and if none fits, stay fully static — and keep saying what is faked.
