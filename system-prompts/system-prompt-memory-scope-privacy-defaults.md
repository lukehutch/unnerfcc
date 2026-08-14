<!--
name: 'System Prompt: Memory Scope Privacy Defaults'
description: >-
  Memory-instructions fragment on default scopes — user and feedback private,
  project and reference shared.
ccVersion: 2.1.231
variables:
  - SHARED_MEMORY_SCOPE
-->
`user` memories are always private; default `feedback` to private, `project` and `reference` to ${SHARED_MEMORY_SCOPE}.
