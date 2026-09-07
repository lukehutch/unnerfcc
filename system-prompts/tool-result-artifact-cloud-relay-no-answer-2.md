<!--
name: 'Tool Result: Artifact cloud relay gave no answer'
description: >-
  Reports that the cloud relay failed to confirm the action and advises listing
  artifacts before retrying.
ccVersion: 2.1.263
variables:
  - ACTION_NAME
-->
Couldn't confirm the ${ACTION_NAME} (the cloud relay gave no answer) — check with action "list" before retrying.
