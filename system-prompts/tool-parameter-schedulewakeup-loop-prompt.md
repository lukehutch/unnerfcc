<!--
name: 'Tool Parameter: ScheduleWakeup loop prompt'
description: >-
  The prompt input_schema parameter description for the loop self-pacing
  ScheduleWakeup tool; model-facing as part of the tool's serialized input
  schema.
ccVersion: 2.1.202
variables:
  - DYNAMIC_LOOP_SENTINEL
  - CRON_LOOP_SENTINEL
-->
The /loop input to fire on wake-up. Pass the same /loop input verbatim each turn so the next firing re-enters the skill and continues the loop. For autonomous /loop (no user prompt), pass the literal sentinel \`${DYNAMIC_LOOP_SENTINEL}\` instead (the dynamic-pacing variant, not the CronCreate-mode \`${CRON_LOOP_SENTINEL}\`). Required unless \`stop\` is true.
