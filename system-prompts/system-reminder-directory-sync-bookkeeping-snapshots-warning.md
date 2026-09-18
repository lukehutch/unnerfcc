<!--
name: 'System Reminder: Directory sync bookkeeping snapshots warning'
description: >-
  Warns against pointing the branch at internal directory sync bookkeeping
  snapshots and details recovery steps.
ccVersion: 2.1.277
variables:
  - RESET_INSTRUCTION
-->
, by the identity it carries one of directory sync's own bookkeeping snapshots — sync keeps them under refs/claude/… (turns/…, in/…, pre/…; a parked/… ref's tip is one too, your own commits sit beneath it) — not work of yours or the user's; a reset, checkout, merge or cherry-pick onto one of those does that, and such commits are never offered to the user's machine as history. If you did not point the branch at one of sync's refs yourself — the commit arrived with history you merged from elsewhere — leave the branch as it is and tell the user; the steps that follow do not apply. ${RESET_INSTRUCTION} If the sync notice at your next turn start says the work branch is already back on the user's commit, skip the reset — only the file check still applies. Do not use those snapshots as checkpoints.
