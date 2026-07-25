<!--
name: 'Skill: /loop slash command'
description: >-
  Tells the /loop skill what to confirm back after scheduling — the cadence, the
  auto-expiry window, how to cancel, and that autonomous-loop instructions are
  baked in.
ccVersion: 2.1.219
variables:
  - RECURRING_EXPIRY_DAYS
  - CRON_DELETE_TOOL_NAME
-->
what's scheduled, the cron expression, the human-readable cadence, that recurring tasks auto-expire after ${RECURRING_EXPIRY_DAYS} days, and that they can cancel sooner with ${CRON_DELETE_TOOL_NAME} (include the job ID). Mention this is the autonomous default and that the autonomous-loop instructions are baked in.
