<!--
name: 'System Reminder: Goal check-in deferred while background work runs'
description: >-
  Opens the goal check-in reminder saying the goal is still active and its
  evaluation was deferred because background work is still running, before
  listing that work.
ccVersion: 2.1.251
variables:
  - CHECK_IN_PREFIX
  - GOAL_TEXT
  - DEFERRAL_MINUTES
-->
${CHECK_IN_PREFIX}${GOAL_TEXT}» is still active, and evaluation has been deferred for ${DEFERRAL_MINUTES} min because background work is still running:
