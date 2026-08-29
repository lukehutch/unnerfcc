<!--
name: 'System Prompt: Local directory stale sync stopped'
description: >-
  Warning that local files are stale following sync termination and must not be
  used for project operations.
ccVersion: 2.1.251
variables:
  - DIRECTORY_PATH
-->
: ${DIRECTORY_PATH} — STALE since file sync stopped for this session (it could not be emptied): do not read, run or edit the project there; only scratch work that needs none of the project's files belongs here.
