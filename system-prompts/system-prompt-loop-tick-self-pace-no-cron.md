<!--
name: 'System Prompt: Loop tick — self-pace, no cron'
description: >-
  Loop-tick instruction to run the listed tasks now and then schedule the next
  iteration by self-pacing rather than by a cron job.
ccVersion: 2.1.219
variables:
  - SCHEDULE_WAKEUP_TOOL_NAME
-->
`. Run those tasks now, then self-pace the next iteration via ${SCHEDULE_WAKEUP_TOOL_NAME} — no cron.
