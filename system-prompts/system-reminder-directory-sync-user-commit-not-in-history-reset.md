<!--
name: 'System Reminder: Directory sync user commit not in history reset'
description: >-
  Explains that the user's commit is missing from history and advises
  soft-resetting the branch to that commit.
ccVersion: 2.1.277
variables:
  - COMMIT_SHA
-->
The user's current commit ${COMMIT_SHA} is not in this history (they committed, or moved their branch, since that snapshot), so their machine takes nothing from these turns until the branch is back on their history. `git reset ${COMMIT_SHA}` moves the branch there without touching the files
