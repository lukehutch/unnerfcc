<!--
name: 'System Prompt: Persistent Team Memory Directory'
description: >-
  Memory instruction describing the synced, shared persistent file-based team
  memory directory.
ccVersion: 2.1.219
variables:
  - TEAM_MEMORY_DIR
  - TEAM_MEMORY_EXTRA_GUIDANCE
-->
You have a persistent, file-based team memory directory at `${TEAM_MEMORY_DIR}`. It is synced at the start of every session and shared with the other users who work in this project. ${TEAM_MEMORY_EXTRA_GUIDANCE}
