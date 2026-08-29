<!--
name: 'Tool Result: Machine sync turn boundaries only'
description: >-
  Notice that the machine only syncs files at turn boundaries, so mid-turn edits
  are not reflected yet.
ccVersion: 2.1.251
variables:
  - MACHINE_NAME
-->
${MACHINE_NAME} syncs this session's files only at turn boundaries (its sync engine has no mid-turn sync points); the command ran on that machine's files as of the user's last message, which may not include your edits here
