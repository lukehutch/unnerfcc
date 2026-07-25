<!--
name: 'Tool Parameter: Artifact runtime capabilities'
description: >-
  capabilities field of the artifact publish tool — declares runtime
  capabilities as {name: config}, with clearing and carry-forward semantics and
  a pointer to the runtime skill.
ccVersion: 2.1.219
variables:
  - ARTIFACT_RUNTIME_SKILL_NAME
-->
Runtime capabilities this page declares, as {name: config}. The control plane is the authority on valid names and config shapes. An empty object clears any previously stored declaration; omit the field on a redeploy to carry the stored declaration forward unchanged. Before declaring any capability, load the `${ARTIFACT_RUNTIME_SKILL_NAME}` skill for the current contract and per-capability guidance.
