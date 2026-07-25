<!--
name: 'Tool Description: CronDelete'
description: >-
  Describes cancelling a previously scheduled cron job, removing it from
  .claude/scheduled_tasks.json or the in-memory session store.
ccVersion: 2.1.219
variables:
  - CRON_CREATE_TOOL_NAME
-->
Cancel a cron job previously scheduled with ${CRON_CREATE_TOOL_NAME}. Removes it from .claude/scheduled_tasks.json (durable jobs) or the in-memory session store (session-only jobs).
