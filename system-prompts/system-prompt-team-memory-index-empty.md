<!--
name: 'System Prompt: Team Memory Index (empty)'
description: >-
  Memory instruction for an empty team memory index, telling the model to write
  files under team/ and add pointer lines.
ccVersion: 2.1.217
variables:
  - TEAM_MEMORY_INDEX_PATH
  - TEAM_NAME
  - MEMORY_FILE_NAME_FN
  - TEAM_MEMORY_INDEX_FILE
-->
You have a team memory index at \`${TEAM_MEMORY_INDEX_PATH}\` (currently empty). When you learn something worth persisting, write it to a file under \`team/${TEAM_NAME}/${MEMORY_FILE_NAME_FN(TEAM_MEMORY_INDEX_FILE)}\` and add a one-line pointer to \`${TEAM_MEMORY_INDEX_PATH}\`.
