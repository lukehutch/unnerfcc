<!--
name: 'Tool Result: Background task tracking temporarily unavailable'
description: >-
  Informs that Claude Code temporarily cannot poll a background task and will
  continue checking at longer intervals.
ccVersion: 2.1.321
variables:
  - REASON
-->
Claude Code cannot follow this task on its server at the moment: ${REASON}.
It did not cancel the task, which may still be running there or may have ended. Its outcome is not known, so do not report it as done or failed. Claude Code keeps checking, less often, while this session runs, and you will get another notification if it learns how the task ended.
