<!--
name: 'System Reminder: Directory sync branch reset uncommitted advice'
description: >-
  Guidance on resetting the branch back to real history and recommitting only
  session changes.
ccVersion: 2.1.277
variables:
  - COMMIT_SHA
-->
Your file changes keep reaching the user's machine, but as uncommitted changes on their current commit ${COMMIT_SHA}, and no commit of yours lands there until the branch is back on real history. `git reset ${COMMIT_SHA}` puts it back and keeps the working files exactly as they are; then re-commit only your own changes, by path — not the user's uncommitted work this checkout mirrors
