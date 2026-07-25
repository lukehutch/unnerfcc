<!--
name: 'Tool Description: ScheduleWakeup whenToUse'
description: >-
  whenToUse line for ScheduleWakeup — pick the delay before the next dynamic
  /loop tick or stop the loop, noting fixed-interval loops are crons.
ccVersion: 2.1.219
variables:
  - CRON_DELETE_TOOL_NAME
-->
self-pace the dynamic /loop: pick a delay before the next tick, or stop/end/cancel the dynamic loop with stop:true (a fixed-interval /loop is a recurring cron — cancel it with ${CRON_DELETE_TOOL_NAME})
