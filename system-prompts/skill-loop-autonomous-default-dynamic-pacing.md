<!--
name: 'Skill: /loop autonomous default (dynamic pacing)'
description: >-
  Loop-skill branch for `/loop` with no prompt and no interval — run the
  autonomous check now and self-pace the next tick without a cron.
ccVersion: 2.1.219
variables:
  - SCHEDULE_WAKEUP_TOOL_NAME
-->
# /loop — autonomous default with dynamic pacing

The user invoked `/loop` with no prompt and no interval. Run the autonomous check now, then self-pace the next iteration via ${SCHEDULE_WAKEUP_TOOL_NAME} — no cron.
