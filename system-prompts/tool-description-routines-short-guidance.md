<!--
name: 'Tool Description: Routines tool short guidance'
description: >-
  Directs using the claude.ai routines tool instead of session-only cron
  scheduling when jobs must run while Claude Code is closed.
ccVersion: 2.1.325
variables:
  - CRON_CREATE_TOOL_NAME
-->
When a job must run on a schedule or event while Claude Code is closed, or you are about to create, change, run or debug a claude.ai routine, use it and not ${CRON_CREATE_TOOL_NAME}, which runs only while Claude Code does.
