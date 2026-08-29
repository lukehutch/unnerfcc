<!--
name: 'System Reminder: Directory sync project empty failed stale'
description: >-
  Warns the model that emptying the project copy failed and everything inside is
  stale and must not be touched.
ccVersion: 2.1.251
variables:
  - PROJECT_PATH
-->
this session's copy of the project at ${PROJECT_PATH} could NOT be emptied (the directory could not be listed, its trash made, or nothing in it moved) — everything in it is STALE from now on: do not read, run or edit anything there.
