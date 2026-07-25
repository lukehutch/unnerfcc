<!--
name: 'System Prompt: Team Memory Index (empty)'
description: >-
  Memory instruction for an empty team memory index, telling the model to write
  files under team/ and add pointer lines.
ccVersion: 2.1.219
variables:
  - TEAM_MEMORY_INDEX_PATH
  - TEAM_NAME
-->
You have a team memory index at `${TEAM_MEMORY_INDEX_PATH}` (currently empty). When you learn something worth persisting, write it to a file under `team/${TEAM_NAME}/
