<!--
name: 'Tool Description: ScheduleWakeup (concise)'
description: >-
  Concise ScheduleWakeup description — schedule the next /loop dynamic-mode
  resume before ending the turn, or pass `stop: true` to end the loop.
ccVersion: 2.1.219
-->
Schedule when to resume work in /loop dynamic mode (always pass the `prompt` arg unless stopping). Call before ending the turn to keep the loop alive; call with `stop: true` to end the loop immediately.
