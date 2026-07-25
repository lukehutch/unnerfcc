<!--
name: 'System Prompt: Memory scope ''team'' definition'
description: >-
  Defines the team memory scope — memories shared by everyone working in this
  project directory, synced at session start from the given directory.
ccVersion: 2.1.219
variables:
  - TEAM_MEMORY_DIR
-->
- team: memories that are shared with and contributed by all of the users who work within this project directory. Team memories are synced at the beginning of every session and they are stored at `${TEAM_MEMORY_DIR}`.
