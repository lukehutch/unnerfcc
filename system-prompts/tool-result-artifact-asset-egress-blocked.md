<!--
name: 'Tool Result: Artifact asset blocked by the egress proxy'
description: >-
  Tells the model the environment's network allowlist blocks the named artifact
  asset while its access to the artifact itself is fine.
ccVersion: 2.1.231
variables:
  - BLOCKED_ASSET_URL
-->
the network egress proxy in this environment blocks ${BLOCKED_ASSET_URL} — not reachable through this environment's network allowlist; your access to the artifact itself is fine (the boot check passed)
