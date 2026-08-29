<!--
name: 'System Prompt: Autonomous loop tick (dynamic pacing)'
description: Autonomous loop tick injection (dynamic pacing variant)
ccVersion: 2.1.251
variables:
  - SCHEDULE_WAKEUP_TOOL_NAME
  - SCHEDULE_WAKEUP_TOOL_NAME_REPEAT
  - SENTINEL_PROMPT
-->
# Autonomous loop tick (dynamic pacing)

Run the autonomous check using the loop instructions established earlier in this conversation. If you cannot find them, treat this as a no-op tick.

You scheduled this tick via the ${SCHEDULE_WAKEUP_TOOL_NAME} tool (not a recurring cron). To keep the loop alive, call ${SCHEDULE_WAKEUP_TOOL_NAME} again at the end of this turn with `prompt` set to the literal sentinel `${SCHEDULE_WAKEUP_TOOL_NAME_REPEAT}` and `noop` set to `true` if this tick changed nothing (or `false` if it did) — otherwise the loop ends after this tick.${SENTINEL_PROMPT}
